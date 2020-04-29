from django.shortcuts import render
from django.http import JsonResponse
import json
from .mycommand import command
# Create your views here.
tmp_path = r'templates'
iddata = []
def index(request):
    #print("这是一个request"+str(request.path))
    return render(request,"index.html")

def getBomData(request):
    print("获取全部母单")
    list = command.getBomMother()
    # yields = 38
    # yeildcount = 17
    num =['BOM编码','新建日期','物料名称','规格型号','锥入度','颜色外观','产品应用','调样目的','基础油粘度']
    # for i in range(yeildcount):
    #     num.append(yields)
    #     yields = yields + 1
    #mycommand中 getBomMother需要显示的字段
    list1 =[]
    for l in list:
        list2 =[]
        for n in num:
            list2.append(l[n])
        list1.append(list2)
    ##js = json.dumps(command.toJsonSource(list1))
    js = command.toJsonSource(list1)
    #print(js)
    
    context = js
    return JsonResponse(context,safe = False)
def ChildBomPost(request):
    iddata.clear()
    value = request.POST["id"]
    id = command.getBomMotherByBomNo("'"+value+"'")
    if 1 != len(id) or 0 == len(id):
        print("读取BOM表："+str(value)+"时出现多个数据。或者BOM编码不存在")
        return None
    print("获取对应子物料")
    list = command.getBomCild(id[0]['FInterID'])#id[0][0]指的是 第一条行 里 对应的FInterID
    num =['内码','物料名称','规格型号','比例','录入数量','颜色外观']
    # i = 33
    # for j in range(17):
    #     num.append(i)
    #     i = i + 1
    #num =[2,3,11,27,30,5]   #mycommand中 getBomChild 需要显示的字段
    list1 =[]
    for l in list:
        list2 =[]
        for n in num:
            list2.append(l[n])
        list1.append(list2)
    js = command.toJsonSource(list1)
    context = js
    print(context)
    return JsonResponse(context,safe = False)
def ChildtoBomMotherData(request):
    print("从子物料开始获取母表")
    value = request.POST.get('id')#FItemid
    if value == "CLEAN":
        print("清空已选数据")
        iddata.clear()
        context = '{"status":"200"}'
        return JsonResponse(context,safe = False)

    if value not in iddata:
        iddata.append(value)
    print("获取成功")
    print(value)
    s = ""
    _i = 0
    for itm in iddata:
        if _i < len(iddata)-1:
            s = s + '\''+ itm +'\','
        elif _i == len(iddata)-1:
            s = s + '\''+ itm +'\''
        _i = _i + 1
    #print(s)
    list = command.getBomMotherbyFItemid(s,str(_i))
    #print("I have an apple:")
    #print(list)
    if  len(list) == 0:
        print("读取物料编号："+str(value)+"时不存在相应BOM")
        return None
    # yields = 0
    # yeildcount = 17
    num =['BOM编码','新建日期','物料名称','规格型号','锥入度','颜色外观','产品应用','调样目的','基础油粘度']
    
    # for i in range(yeildcount):
    #     num.append(yields)
    #     yields = yields + 1
        #mycommand中 getBomChild 需要显示的字段
    list1 =[]
    for l in list:
        list2 =[]
        for n in num:
            list2.append(l[n])
        list1.append(list2)
    js = command.toJsonSource(list1)
    context = js
    #print(context)
    return JsonResponse(context,safe = False)

def BomDataSmall(request):
    list = command.getBomMother()
    # yields = 38
    # yeildcount = 3
    num =['BOM编码','规格型号','锥入度','颜色外观']
    # for i in range(yeildcount):
    #     num.append(yields)
    #     yields = yields + 1
    list1 =[]
    for l in list:
        list2 =[]
        for n in num:
            list2.append(l[n])
        list1.append(list2)
    js = command.toJsonSource(list1)

    
    context = js
    return JsonResponse(context,safe = False)
def getOneMotherBom(request):
    print("获取一个母单")
    value = request.POST["id"]
    var = command.getBomMotherByBomNo("'"+value+"'")
    # yields = 1
    # yeildcount = 16
    num =['BOM编码','新建日期','物料名称','规格型号','锥入度','颜色外观','产品应用','调样目的','基础油粘度']
    # for i in range(yeildcount):
    #     num.append(yields)
    #     yields = yields + 1
    #mycommand中 getBomMother需要显示的字段
    list1 =[]
    for l in var:
        list2 =[]
        # list2.append(l[18])
        for n in num:
            list2.append(l[n])
        list1.append(list2)

    if 1 != len(list1) or 0 == len(list1):
        print("读取BOM表："+str(value)+"时出现多个数据。或者BOM编码不存在")
        return None
    js = command.toJsonSource(list1)
    context = js
    print(context)
    return JsonResponse(context,safe = False)