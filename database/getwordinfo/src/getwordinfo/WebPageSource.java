package getwordinfo;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class WebPageSource {
    public static void main(String args[]){    
File search = new File("D:/study/课程（大三）/夏季学期/数据库相关信息/补充.txt");
       //*
        if(search.isFile() && search.exists()){ //判断文件是否存在
            InputStreamReader read = null;
			try {
				read = new InputStreamReader(
				new FileInputStream(search),"GBK");
			} catch (UnsupportedEncodingException e) {
				// TODO 自动生成的 catch 块
				e.printStackTrace();
			} catch (FileNotFoundException e) {
				// TODO 自动生成的 catch 块
				e.printStackTrace();
			}//考虑到编码格式
            BufferedReader bufferedReader = new BufferedReader(read);
            String lineTxt = null;
            try {
				while((lineTxt = bufferedReader.readLine()) != null){
					String word;
					if(lineTxt.indexOf(" ") != -1)
						word = lineTxt.substring(0,lineTxt.indexOf(" "));
					else
						word = lineTxt;
					SearchInformation(word.trim());
				}
			} catch (IOException e) {
				// TODO 自动生成的 catch 块
				e.printStackTrace();
			}
            try {
				read.close();
			} catch (IOException e) {
				// TODO 自动生成的 catch 块
				e.printStackTrace();
			}
        }else{
        	System.out.println("找不到指定的文件");
        }//*/
       //SearchInformation("socialism");
    }
    	
    	public static void SearchInformation(String word) {
	        URL url;
	        int responsecode;
	        HttpURLConnection urlConnection;
	        BufferedReader reader;
	        String line = null;
	        File file = new File("E:/练习/beist/补充.txt");
	        String tag1 = "<span class=\"def\">";		//英英词意
	        String tag2 = "<span class=\"phonetic\">";	//音标
	        String tag3 = "<div class=\"trans-container\">";	//词性+中文词意
	        String tag4 = "<div class=\"examples\">";	//例句
	        int flag1, flag2, flag3, flag4;		//标记是否已记录相关信息
	        String word_information;
	        String information;
	        
	        
	        
	        try{
	        	flag1 = 0;
	        	flag2 = 0;
	        	flag3 = 0;
	        	flag4 = 0;
	        	word_information = word;
	            //生成一个URL对象
	
	            url=new URL("http://dict.youdao.com/w/"+ word +"/#keyfrom=dict2.top");
	            //打开URL
	            urlConnection = (HttpURLConnection)url.openConnection();
	            //获取服务器响应代码
	            responsecode=urlConnection.getResponseCode();
	            if(responsecode==200)
	            {
	                //得到输入流，即获得了网页的内容 
	                reader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(),"UTF-8"));
	                while((line = reader.readLine())!=null)
	                {
	                	if(flag1 == 1 && flag2 == 1 && flag3 == 1 && flag4 == 1)
	                			break;
	                    System.out.println(line);
	                    if(flag1 == 0 && line.indexOf(tag1)!=-1)
	                    {
	                    	flag1 = 1;
	                    	information = getTeacherList(line);
	                    	word_information = word_information + " | " + information.substring(1,information.length()-1);
	                    	//System.out.println(word_information);
	                    }
	                    else if(flag2 == 0 && line.indexOf(tag2)!=-1)
	                    {
	                    	flag2 = 1;
	                    	information = getTeacherList(line);
	                    	word_information = word_information + " | " + information.substring(1,information.length()-1);
	                    	//System.out.println(word_information);
	                    }
	                    else if(flag3 == 0 && line.indexOf(tag3)!=-1)
	                    {
	                    	flag3 = 1;
	                    	while(line.indexOf("<li>") == -1)
	                    		line = reader.readLine();
	                    	information = getTeacherList(line);
	                    	word_information = word_information + " | " + information.substring(1,information.length()-1);
	                    }
	                    else if(flag4 == 0 && line.indexOf(tag4)!=-1)
	                    {
	                    	flag4 = 1;
	                    	while(line.indexOf("<p>") == -1)
	                    		line = reader.readLine();
	                    	information = getTeacherList(line);
	                    	word_information = word_information + " | " + information.substring(1,information.length()-1);
	                    	
	                    }
	                }
	                PrintWriter out = null;
	                FileWriter fw=null;
	                try{
	                    fw = new FileWriter(file,true);
	                    out = new PrintWriter(fw);
	                    out.println(word_information);
	                 
	                    }catch(IOException e){
	                            System.out.println(e.getMessage());
	                    }finally{
	                            out.close();
	                            fw.close();
	                    }
	            }
	            else{
	                System.out.println(word + "获取不到网页的源码，服务器响应代码为："+responsecode);
	            }
	        }
	        catch(Exception e){
	            System.out.println(word + "获取不到网页的源码,出现异常："+e);
	            
	        }
	    }


    
    	//去除读入内容中的标签内容
    public static String getTeacherList(String managers){
        String ls = "";
        Pattern pattern = Pattern.compile(">(.*)<");
        Matcher matcher = pattern.matcher(managers);
        while(matcher.find())
            ls += matcher.group();
        return ls;
    }
}


