package savewordinfo;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.LineIterator;

public class savewordinfo {
	static int idx;
    static Connection conn = null;
    static PreparedStatement pstmt = null;   
    static int i=12516;		//单词id号，每次重新设置初始值
    
    public static void main(String args[]){    
    	File file = new File("E:/练习/beist/05六级核心 - 副本.txt");	//单词列表
    	File file2 = new File("E:/练习/beist/补充2.txt");			//单词信息存入flie2
        
        dbConnection();
        
        try {
            LineIterator lineIterator = FileUtils.lineIterator(file, "UTF-8");
            while (lineIterator.hasNext()) {
                String line = lineIterator.nextLine();
                PrintWriter out = null;
                FileWriter fw=null;
                fw = new FileWriter(file2,true);
                out = new PrintWriter(fw);
                // 行数据转换成数组
                String[] custArray = new String[]{"","","","","a"};
                //System.out.println(custArray[4].trim());
                custArray = line.split("\\|");
                if(custArray.length == 4)		//若未获取到例句信息
                {
                	String[] custArray1 = new String[]{"","","","","Not found."};
                	custArray1[0] = custArray[0];
                	custArray1[1] = custArray[1];
                	custArray1[2] = custArray[2];
                	custArray1[3] = custArray[3];
                	//System.out.println(custArray1[4].trim());
                	insertCustInfo(custArray1);
                }
                else
                	insertCustInfo(custArray);
                //Thread.sleep(10);
                for(String s: custArray) {
                	//System.out.println(s);
                	out.println(s);
                            
                }

                out.close();
                fw.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } 
    finally {
            dbDisConnection();
        }
    	
    }
    public static void insertCustInfo(String[] strArray) {         
        try {
            
          String sql = "INSERT INTO W VALUES(?,?,?,?,?,?,?)";
            //System.out.println(strArray[4].trim());
            
            pstmt = conn.prepareStatement(sql);
            idx = 1;
            pstmt.clearParameters();
            pstmt.setInt(1,i);
            i++;
            pstmt.setString(2, strArray[0].trim());
            pstmt.setString(3, strArray[1].trim());
            pstmt.setString(4, strArray[4].trim());
            pstmt.setString(5, strArray[3].trim());
            pstmt.setString(6, strArray[2].trim());
            pstmt.setString(7, "六级");		//设置单词类型
            
            pstmt.executeUpdate();           
            //System.out.println(strArray[0]);
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (pstmt != null) {
                try {
                    pstmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    
    // 连接数据库
    public static Connection dbConnection() {
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

            String url = "jdbc:sqlserver://localhost:1433;DatabaseName=beist";  
            String user = "sa";  
            String password = "admin"; 
            
            conn = DriverManager.getConnection(url, user, password);    
            System.out.println("Connection 开启！");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return conn;
    }
    
    // 关闭数据库
    public static void dbDisConnection() {
        if (conn != null) {
            try {
                conn.close();
                System.out.println("Connection 关闭！");
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

}
