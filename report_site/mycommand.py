from .import sql as sq
#import sql as sq
class command :
            
    def getBomMother():#获取所有Bom表数据
        conn = sq.conn()
        sql = "SELECT  ROW_NUMBER() over (order by FBOMNumber ) as 行号,FBrNo,FInterID,FBOMNumber,FImpMode,FUseStatus,\
        FVersion,FParentID,FItemID,FQty,FYield,\
        FCheckID,FCheckDate,FOperatorID,FEnterTime,FStatus,\
        FCancellation,FTranType,FRoutingID,FBomType,FCustID,\
        FCustItemID,FAccessories,FNote,FUnitID,FAUXQTY,\
        FCheckerID,FAudDate,FEcnInterID,FBeenChecked,FForbid,\
        FAuxPropID,FPDMImportDate,FBOMSkip,FClassTypeID,FUserID,\
        FUseDate,FPrintCount,\
        FBOMNumber as BOM编码,\
        (select FNumber from t_icitem where FItemID =m.FItemID )as '物料代码',\
        (select FName from t_icitem where FItemID =m.FItemID )as '物料名称',\
        (select FModel from t_icitem where FItemID =m.FItemID )as '规格型号',\
        (select ( select t.FName from t_SubMessage t where t.FInterID = FErpClsID) t from t_icitem where FItemID =m.FItemID )as '物料属性',\
        (select (select t.FName  from t_MeasureUnit t where  t.fitemid = FProductUnitID) from t_icitem where FItemID =m.FItemID )as '单位',\
        (select FQty from t_icitem where FItemID =m.FItemID )as '数量',\
        FYield as '成品率',\
        Fstatus as '状态',\
        (case  when FAudDate IS NULL then '未审核' else '已审核' end) as 审核,\
        FAudDate as '审核日期',\
        Fversion as '版本',\
        '' as '图号',\
        '' as '工艺路线代码',\
        '' as '工艺路线名称',\
        (select r.Fname  from t_user r where r.FUserID = m.FCheckID) as '建立人员',\
        FCheckdate as '新建日期',\
        FNote as '备注',\
        FHeadSelfZ0138 as 锥入度,\
        FHeadSelfZ0139 as 颜色外观,\
               replace(replace(replace( FHeadSelfZ0137,'\
',''),'\r\n',''),'\t','') as 调样目的,\
        FHeadSelfZ0146 as 产品应用,\
        FHeadSelfZ0136 as 基础油粘度\
        FROM ICBOM m order by m.FBOMNumber"
        #print(sql)
        cursor = conn.cursor() #创建游标
        cursor.execute(sql)
        rows = cursor.fetchone()
        #print(type(rows))
        list = []
        while rows:
            list.append(rows)
            rows = cursor.fetchone()
        conn.close()
        return list
        
    def getBomMotherByBomNo(whereis):#根据Bom编码查询对应的数据
        conn = sq.conn()
        sql = "select FInterID,\
        (select FNumber from t_icitem where FItemID =m.FItemID )as '物料代码',\
        (select FName from t_icitem where FItemID =m.FItemID )as '物料名称',\
        (select FModel from t_icitem where FItemID =m.FItemID )as '规格型号',\
        (select ( select t.FName from t_SubMessage t where t.FInterID = FErpClsID) t from t_icitem where FItemID =m.FItemID )as '物料属性',\
        (select (select t.FName  from t_MeasureUnit t where  t.fitemid = FProductUnitID) from t_icitem where FItemID =m.FItemID )as '单位',\
        (select FQty from t_icitem where FItemID =m.FItemID )as '数量',\
        FYield as '成品率',\
        Fstatus as '状态',\
        (case  when FAudDate IS NULL then '未审核' else '已审核' end) as 审核,\
        FAudDate as '审核日期',\
        Fversion as '版本',\
        '' as '图号',\
        '' as '工艺路线代码',\
        '' as '工艺路线名称',\
        (select r.Fname  from t_user r where r.FUserID = m.FCheckID) as '建立人员',\
        FCheckdate as '新建日期',\
        FNote as '备注',\
        FBOMNumber as 'BOM编码',\
                    FHeadSelfZ0138 as 锥入度,\
        FHeadSelfZ0139 as 颜色外观,\
               replace(replace(replace( FHeadSelfZ0137,'\
',''),'\r\n',''),'\t','') as 调样目的,\
        FHeadSelfZ0146 as 产品应用,\
        FHeadSelfZ0136 as 基础油粘度\
         FROM ICBOM m  where FBOMNumber in ("+str(whereis)+") order by m.FBOMNumber"
        #print(sql)
        cursor = conn.cursor() #创建游标
        cursor.execute(sql)
        rows = cursor.fetchone()
        list = []
        while rows:
            list.append(rows)
            rows = cursor.fetchone()
        conn.close()
        return list
    
    def getBomCild(FInterID):
        conn = sq.conn()
        sql = "SELECT  \
                FInterID,\
                FEntryID,\
                FItemID,FAuxQty,\
                FQty,FScrap,FOperSN,FOperID,FMachinePos,\
                FNote,FMaterielType,FMarshalType,FPercent,FBeginDay,\
                FEndDay,FOffSetDay,FBackFlush,FStockID,FSPID,\
                FSupply,FUnitID,FAuxPropID,FPDMImportDate,FPositionNo,\
                FItemSize,FItemSuite,FNote1,FNote2,FNote3,\
                FHasChar,FDetailID,FEntryKey,FCostPercentage ,\
                FItemID as '内码',\
                FEntryID as '顺序号',\
                (select FNumber from t_icitem where FItemID =m.FItemID )as '物料代码',\
                (select FName from t_icitem where FItemID =m.FItemID )as '物料名称',\
                (select FModel from t_icitem where FItemID =m.FItemID )as '规格型号',\
                '' as '辅助属性',\
                (select ( select t.FName from t_SubMessage t where t.FInterID = FErpClsID) t from t_icitem where FItemID =m.FItemID )as '物料属性',\
                '' as '子项类型',\
                '' as '配置属性',\
                FQTY as '基本用量',\
                (select (select t.FName  from t_MeasureUnit t where  t.fitemid = FProductUnitID) from t_icitem where FItemID =m.FItemID )as '单位',\
                FQTY as '用量',\
                FPercent as '计划百分比',\
                FScrap as '损耗率',\
                FPositionNo as '位置号',\
                FBeginDay as '生效日期',\
                FEndDay as '失效日期',\
                FEntrySelfZ0142 as '录入数量',\
                FEntrySelfZ0143 as '比例',\
                (select f_106 from t_ICItemCustom where fitemid = m.fitemid)   as 颜色外观\
                FROM ICBOMChild m where FInterID = '"+str(FInterID)+"'" +"order by FEntryID "
        cursor = conn.cursor() #创建游标
        print(sql)
        cursor.execute(sql)
        rows = cursor.fetchone()
        list = []
        while rows:
            list.append(rows)
            rows = cursor.fetchone()
        conn.close()
        return list
    def getBomMotherbyFItemid(Fitemid,count):
        conn = sq.conn()
        sql = "select * from (select FBOMNumber,\
        (select FNumber from t_icitem where FItemID =m.FItemID )as '物料代码',\
        (select FName from t_icitem where FItemID =m.FItemID )as '物料名称',\
        (select FModel from t_icitem where FItemID =m.FItemID )as '规格型号',\
        (select ( select t.FName from t_SubMessage t where t.FInterID = FErpClsID) t from t_icitem where FItemID =m.FItemID )as '物料属性',\
        (select (select t.FName  from t_MeasureUnit t where  t.fitemid = FProductUnitID) from t_icitem where FItemID =m.FItemID )as '单位',\
        (select FQty from t_icitem where FItemID =m.FItemID )as '数量',\
        FYield as '成品率',\
        Fstatus as '状态',\
        (case  when FAudDate IS NULL then '未审核' else '已审核' end) as 审核,\
        FAudDate as '审核日期',\
        Fversion as '版本',\
        '' as '图号',\
        '' as '工艺路线代码',\
        '' as '工艺路线名称',\
        (select r.Fname  from t_user r where r.FUserID = m.FCheckID) as '建立人员',\
        FCheckdate as '新建日期',\
        FNote as '备注',\
            FInterID,\
        FBOMNumber as 'BOM编码',\
                    FHeadSelfZ0138 as 锥入度,\
        FHeadSelfZ0139 as 颜色外观,\
               replace(replace(replace( FHeadSelfZ0137,'\
',''),'\r\n',''),'\t','') as 调样目的,\
        FHeadSelfZ0146 as 产品应用,\
        FHeadSelfZ0136 as 基础油粘度\
         FROM ICBOM m) dd where dd.FInterID \
        in(        select finterid from ICBOMChild d where d.FItemID in (-itemid) and FInterID = FInterID\
        group by finterid having COUNT(FInterID)>= -count ) \
        "
        sql = sql.replace('-itemid',Fitemid)
        sql = sql.replace('-count',count)
        print("子单获取BOM母单")
        print(sql)
        cursor = conn.cursor() #创建游标
        cursor.execute(sql)
        rows = cursor.fetchone()
        list = []
        while rows:
            list.append(rows)
            rows = cursor.fetchone()
        conn.close()
        return list
    def getBomChildbyName(itemname,times):
        conn = sq.conn()
        sql = "select * from (select FBOMNumber,\
        (select FNumber from t_icitem where FItemID =m.FItemID )as '物料代码',\
        (select FName from t_icitem where FItemID =m.FItemID )as '物料名称',\
        (select FModel from t_icitem where FItemID =m.FItemID )as '规格型号',\
        (select ( select t.FName from t_SubMessage t where t.FInterID = FErpClsID) t from t_icitem where FItemID =m.FItemID )as '物料属性',\
        (select (select t.FName  from t_MeasureUnit t where  t.fitemid = FProductUnitID) from t_icitem where FItemID =m.FItemID )as '单位',\
        (select FQty from t_icitem where FItemID =m.FItemID )as '数量',\
        FYield as '成品率',\
        Fstatus as '状态',\
        (case  when FAudDate IS NULL then '未审核' else '已审核' end) as 审核,\
        FAudDate as '审核日期',\
        Fversion as '版本',\
        '' as '图号',\
        '' as '工艺路线代码',\
        '' as '工艺路线名称',\
        (select r.Fname  from t_user r where r.FUserID = m.FCheckID) as '建立人员',\
        FCheckdate as '新建日期',\
        FNote as '备注',\
            FInterID,\
        FBOMNumber as 'BOM编码',\
                    FHeadSelfZ0138 as 锥入度,\
        FHeadSelfZ0139 as 颜色外观,\
               replace(replace(replace( FHeadSelfZ0137,'\
',''),'\r\n',''),'\t','') as 调样目的,\
        FHeadSelfZ0146 as 产品应用,\
        FHeadSelfZ0136 as 基础油粘度\
         FROM ICBOM m) dd where dd.FInterID \
        in (select aaa.内码 from (\
select * from (SELECT (select m.FName from t_item m where m.FItemID = d.FItemID )as 物料名称 ,d.FInterID as 内码\
 from ICBOMChild d )as a   where a.物料名称 like -itemname\
group by a.内码,a.物料名称\
) as aaa\
 group by aaa.内码 having count(aaa.内码) >= -counts\
 )"
        sql = sql.replace('-itemname',itemname)
        sql = sql.replace('-counts',times)
        print("获取所有子单")
        print(sql)
        cursor = conn.cursor() #创建游标
        cursor.execute(sql)
        rows = cursor.fetchone()
        list = []
        while rows:
            list.append(rows)
            rows = cursor.fetchone()
        conn.close()
        return list
    def toJsonSource(list):
        l = []
        floor1 = 0
        strs = "["
        for i in list:
            strs = strs +"{"
            floor2 = 0
            for j in i:
                if floor2 == len(list[floor1])-1:
                    a = "\""+str(floor2)+"\""
                    strs = strs +a+":\""+ str(j) +"\""
                else:
                    a = "\""+str(floor2)+"\""
                    strs = strs + a +":\""+ str(j) +"\","
                floor2 = floor2 + 1
            if floor1 == len(list)-1:
                strs = strs + "}"
            else:
                strs = strs + "},"
            floor1 = floor1 + 1
        strs = strs + "]"
        return strs
    
    
if __name__ == '__main__':
    list = command.getBomMotherByBomNo('BOM000009')
    num =[1,8,11,27]
    list1 =[]
    
    for l in list:
        list2 =[]
        for n in num:
            list2.append(l[n])
        list1.append(list2)
    print(list[0][1])
    list = command.getBomCild(list[0][1])
    print(command.toJsonSource(list))
