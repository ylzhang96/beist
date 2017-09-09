
#coding=utf-8
#-------------------------------------------------------------------------------
# Name:        spider
# Purpose:     (http://news.iyuba.com/)
#
# Author:      WLL
#
#-------------------------------------------------------------------------------

import requests
from bs4 import BeautifulSoup
from datetime import datetime

# link_ca 是存储目录页 url 的列表
#124,125,126,127代表文章的分类
#1,2,3,4代表各类的页码数
link_ca = ['http://news.iyuba.com/essay_category/124/1.html',
           'http://news.iyuba.com/essay_category/124/2.html',
           'http://news.iyuba.com/essay_category/124/3.html',
           'http://news.iyuba.com/essay_category/124/4.html',
           'http://news.iyuba.com/essay_category/125/1.html',
           'http://news.iyuba.com/essay_category/125/2.html',
           'http://news.iyuba.com/essay_category/125/3.html',
           'http://news.iyuba.com/essay_category/125/4.html',
           'http://news.iyuba.com/essay_category/126/1.html',
           'http://news.iyuba.com/essay_category/126/2.html',
           'http://news.iyuba.com/essay_category/126/3.html',
           'http://news.iyuba.com/essay_category/126/4.html',
           'http://news.iyuba.com/essay_category/127/1.html',
           'http://news.iyuba.com/essay_category/127/2.html',
           'http://news.iyuba.com/essay_category/127/3.html',
           'http://news.iyuba.com/essay_category/127/4.html'
           ]

# link_ar列表用于存贮从目录页中得到的各文章的url
link_ar = []

# 遍历link_ca列表的url
for i in range(0,15):
    url1 = link_ca[i]
    res1 = requests.get(url1)
    res1.encoding = 'utf-8'
    soup1 = BeautifulSoup(res1.text, 'html.parser')
    # 取得目录页面 c_left2类下 <a>标签中的‘href’属性值 "essay/2017/09/03/57656.html"
    # 由于其属性值中的url信息是不完整的，所以在其之前添加‘http://news.iyuba.com/’
    for news in soup1.select('.c_left2'):
        for x1 in news.select('a')[:-7]:
            link_ar.append('http://news.iyuba.com/' + x1['href'])
print(link_ar)
print(len(link_ar))

new_data = {}   # new_data 字典用于存储爬到的信息，其中包含 { 文章标题：'title',日期：'date',字数：'count',类型：'type',存储路径：'path'}
x2 = 1          # 引入x2 变量得到不同的文章名 'x2.txt'  同时记录爬取文章的数量
str_res = ''   # 用于存放所有文章信息

# 遍历文章URL列表，得到每篇文章的相关信息
for i in range(0,len(link_ar)-1):
    url2 = link_ar[i]
    res2 = requests.get(url2)
    res2.encoding = 'utf-8'
    #print(res2.text)
    soup2 = BeautifulSoup(res2.text,'html.parser')

    # 取得文章页面 title_cn 类下 <h1>标签中的文本，得到new_data['title']
    for news in soup2.select('.title_cn'):
        new_data['title'] = news.select('h1')[0].text
        #print(new_data['title'])
        str_res = str_res + new_data['title']

    # 取得文章页面 span1 类中的文本，得到new_data['date']
    for news in soup2.select('.span1'):
        timesource = news.text
        #print(timesource)
        new_data['date'] = datetime.strptime(timesource,'时间:%Y-%m-%d')  # 将取得的日期字符串类型转化为date类型
        # print(new_data['date'])
        str_res = str_res +  ' | ' + str(new_data['date'])

    # 取得文章页面 id为wordcount 中的文本，得到new_data['count']
    for news in soup2.select('#wordcount'):
        new_data['count'] = int(news.text)        # 将字符型的数据转化为int型
        #print(new_data['count'] )
        str_res = str_res +  ' | ' + str(new_data['count'])

    # 在文章页面 box 类下，得到new_data['article']，new_data['type']，new_data['path']
    for news in soup2.select('.box'):
        new_data['article'] = []
        for x1 in news.select('.p1'):         #  取得p1 类中的文本， 文章的每一段落作为一个列表元素，存在new_data['article']中
            #print(x1.text)
            new_data['article'].append(x1.text)
        str_de = new_data['title'] + '\n' +  '\n'.join(new_data['article'])

        if x2 < 59:                      # 根据我们爬取新闻的顺序，给类别 new_data['type'] 赋值
            new_data['type'] = '职场'
        elif x2 < 118:
            new_data['type'] = '政治'
        elif x2 < 177:
            new_data['type'] = '经济'
        else:
            new_data['type'] = '文化'
        str_res = str_res + ' | ' + new_data['type']

        str_txt = str(x2)+".txt"        # 通过文章的爬取顺序赋予不同的文件名，得到每篇文章的路径 new_data['path']
        new_data['path'] = str_txt
        str_res = str_res + ' | ' + new_data['path'] + '\n'

        x2 = x2 + 1

        fout = open(str_txt, 'w')      # 将每篇文章的内容写到对应的TXT文件中
        fout.write(str_de)
        fout.close()

        print(new_data['title'] + ' | ' + str(new_data['date']) + ' | '
              + str(new_data['count']) + ' | ' + new_data['type'] + ' | /' +
              new_data['path'])

fout = open('result.txt', 'w')     # 将所有文章信息写到'result.txt'文件中
fout.write(str_res)                  # 格式为‘Job search site apologizes | 2017-08-12 00:00:00 | 163 | 职场 | 6.txt’
fout.close()



