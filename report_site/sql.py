#!usr/bin/python
# -*-coding: utf-8 -*-
import pymssql #引入pymssql模块


def conn():
    try:
        #connect = pymssql.connect('192.168.1.220', 'sa', 'Fang85558048', 'AIS20200308203304') #服务器名,账户,密码,数据库名
        connect = pymssql.connect(server = "TZH\MSSQLSERVER14", user ='sa', password='Fang85558048', database = 'AIS20200428115630',port='61307',as_dict= True) #服务器名,账户,密码,数据库名
        if connect:
            print("连接成功!")
    except Exception as e:
        print("连接失败" + str(e))
       
        return None
    return connect


if __name__ == '__main__':
    conn = conn()