//角色ID
const roleid = document.querySelectorAll(".role-list>.select")[0].attributes['roleid'].value;

const v = "面板1.8更新内容:\n" +
    "        1. 所有配置支持云备份\n" +
    "        2. 目前功能:复制,触发隐藏,面板隐藏,快捷发言,颜色自定义(支持渐变)\n" +
    "        3. 颜色自定义更新:自启动,渐变色,分享,保存\n";
//class->dom
function domByClass(cla){
    return document.getElementsByClassName(cla)
}
//id->Dom
function domById(id){
    return document.getElementById(id)
}
//localStorage ->get
function lSGet(key){
  return  localStorage.getItem(key)
}
//localStorage->set
function lSSet(key,val){
    return  localStorage.setItem(key,val)
}

//更新内容
setTimeout(function () {
    if (domByClass('channel')[0].childNodes[0]) {
        domByClass('channel')[0].childNodes[0].insertAdjacentHTML("beforeend", '<ord>' + v + '</ord>')

    } else {
        domByClass('channel')[0].insertAdjacentHTML("beforeend", '<ord>' + v + '</ord>')
    }

}, 3000)

//所需css
const styleStr = '.mianBanBegin {\n' +
    '    position: relative;\n' +
    '    bottom: 0;\n' +
    '}\n' +
    '\n' +
    '.mianBanDown {\n' +
    '    bottom: -500px;\n' +
    '    transition: bottom 1s;\n' +
    '}\n' +
    '\n' +
    '.mianBanAbs{\n' +
    '    position: absolute;\n' +
    '}\n' +
    '\n' +
    '.mianBanShow {\n' +
    '    bottom: 0px;\n' +
    '    transition: bottom 1s;\n' +
    '}\n';

//自定义颜色所需变量
const colorHtmlClass = ['NOR', 'BLK', 'BLU', 'CYN', 'RED', 'MAG', 'YEL', 'WHT', 'ORA', 'HIK', 'HIB', 'HIG', 'HIC', 'HIR', 'HIM', 'HIY', 'HIW', 'HIO', 'HIJ', 'HIZ', 'ORD'];
const colorInfo = ['#008000', '#505050', '#000080', '#008080', '#800000', '#800080', '#808000', '#C0C0C0', '#d26900',
    '#808080', '#0000FF', '#00FF00', '#00FFFF', '#FF0000', '#FF00FF', '#FFFF00', '#FFFFFF', '#FFA500', '#FFD700', '#912CEE', '#FF4500'];

//自定义color所需HTML
function autoColorHTML() {
    let arr = ''
    for (let i = 0; i < colorInfo.length; i++) {
        arr += '       <div style="display: flex;justify-content: center;align-items:center;margin-top: 5px;">' +
            '               <div style="color:' + colorInfo[i] + ';margin-right: 1%">本颜色改为:</div>' +
            '               <input id="colorOne' + i + '" style="width:20%;" type="text">' +
            '               <input id="colorTwo' + i + '" style="width:20%;" type="text">' +
            '       </div>'
    }
    return arr
}


//获取head头并修改(添加或更新css)
var style = document.head.innerHTML
var styleAddress = style.indexOf("</style>")
document.head.innerHTML = style.slice(0, styleAddress) + styleStr + style.slice(styleAddress)

var flagTiggerIsShow = true   //标识 目前状态:true精简列表  false(全部列表)

//更新数据
//隐藏触发所需
var hidName
//快捷发言所需
var panelArr

var tagColorUse
function upDate() {
    hidName = lSGet(roleid + "_hideTrigger") ? JSON.parse(lSGet(roleid + "_hideTrigger")).split(',') : [];
    panelArr = lSGet(roleid + "_textPanel") ? JSON.parse(lSGet(roleid + "_textPanel")).split(',') : [];
    tagColorUse =  lSGet(roleid + "_tagColorUse") ? JSON.parse(lSGet(roleid + "_tagColorUse")) :false;
}

upDate()


//触发隐藏  并二次绑定
domByClass("trigger")[0].onclick = () => {
    upDate()
    triggerAcitonfunc()
}


function triggerAcitonfunc() {

    let parNodes = domByClass("zdy-item")
    let changeButton = domById('wsmud_raid_left')
    changeButton.innerText = flagTiggerIsShow === true ? '精简列表' : '全部列表'
    changeButton.style.color = 'red'

    domById('wsmud_raid_left').onclick = () => {
        let a, b;
        if (flagTiggerIsShow === false) {
            a = 'none'
            b = '精简列表'
        } else {
            a = ''
            b = '全部列表'
        }
        for (let i = 0; i < parNodes.length; i++) {
            for (let j = 0; j < hidName.length; j++) {
                if (parNodes[i].childNodes[2] && parNodes[i].childNodes[2].innerText === hidName[j]) {
                    parNodes[i].style.display = a
                }
            }
        }
        if (domById('wsmud_raid_left')) {
            domById('wsmud_raid_left').innerText = b
            flagTiggerIsShow = !flagTiggerIsShow
        }
    }
    if (flagTiggerIsShow === true) {
        for (let i = 0; i < parNodes.length; i++) {
            for (let j = 0; j < hidName.length; j++) {
                if (parNodes[i].childNodes[2] && parNodes[i].childNodes[2].innerText === hidName[j]) {
                    parNodes[i].style.display = 'none'
                }
            }
        }
    }
    //为所有触发绑定点击,画面重绘
    let triggerItems = domByClass("breakText")
    for (let i = 0; i < triggerItems.length; i++) {
        triggerItems[i].onclick = () => {
            triggerAcitonfunc()
        }
    }
}


//region
//添加按钮 添加弹窗
domByClass('raidToolbar')[0].insertAdjacentHTML("beforeend", '<span style="cursor:pointer;" class="raid-item boardSetButton"><hio>设置</hio></span>')
let boardSetButton = domByClass('boardSetButton')[0]

domByClass('container')[0].insertAdjacentHTML("beforeend",
    '<div class="boardSet" style="z-index: 99999;  overflow:scroll;background-color: #bfa; position:absolute;height: 80%;margin: auto;width: 100%;bottom: 10%;left: 0%;flex-flow: column nowrap;display: flex;align-items: center;text-align: center;' +
    'border: 2px solid #0000ff;display: none">' +
    '   <div class="cancelButton" style="text-align: center;cursor: pointer; line-height: 20px; float:right;padding:20px 20px 0 0; color: black;font-size: 15px;">X</div>' +
    '   <h3>设置面板1.7 ' +
    '       <span style="font-size: 10px">by 与風</span>' +
    '   </h3>' +
    '   <h4>如果你有好的想法和建议,欢迎在仙界群@与風</h4>' +
    '   <div>' +
    '       <h4 style="color:darkblue;"> 消息复制功能:</h4>' +
    '       <p style="color:darkblue;">点击启动,然后点击你要复制的消息即可复制到粘贴板</p>' +
    '       <span class="startToCopy" style="color: red;border: 1px solid cornflowerblue;background-color: cornflowerblue;cursor:pointer; padding: 5px 10px">启动</span>' +
    '   </div>' +
    '   <div style="width:100%;margin:5% 0;border-top: 1px solid coral;"></div>' +
    '   <p>请在下面输入要隐藏的触发名称,使用英文符号","分隔</p>' +
    '   <textarea class="textHide" style="font-size:  16px;width: 50%" rows="5" ></textarea>' +
    '   <p>请在下面输入要设置的快捷发言内容,使用英文符号","分隔</p>' +
    '   <textarea class="textPanelMianban" style="font-size:  16px;width: 50%" rows="5" ></textarea>' +
    '   <div style="display: flex;justify-content:center;margin-bottom: 5%">' +
    '       <div class="readyAllButton" style="background-color: cornflowerblue; border: 1px solid greenyellow;margin-top:20px;right:20px;margin-right: 10px;width: 50px;line-height:30px;height: 30px;cursor:pointer;">确认</div>' +
    '       <div class="cancelButton" style="border: 1px solid greenyellow;margin-top:20px;right:20px;margin-right: 10px;width: 50px;line-height:30px;height: 30px;background-color: deeppink;cursor:pointer; ">取消</div>' +
    '   </div>' +
    '   <h3 class="openColorChange">颜色自定义功能(点击展开)</h3>' +
    '   <p>1. 支持RGB,16进制,英文颜色等多种格式,具体颜色值请百度(颜色不变说明写的有问题)</p>' +
    '   <p>2. 若不使用渐变:只要在第一个输入框填写颜色,若使用:分别在第一,第二个输入框填写颜色</p>' +
    '   <p class="buttonColorTag">点此 开启/关闭自启动 当前状态: <p class="buttonColorTagShow" style="color:red;">关</p> </p>' +
    '   <div class="colorAuto" style="display: none;margin-bottom: 20%;background-color: #000000">' +
    autoColorHTML() +
    '       <div style="display: flex;justify-content: center;align-items:center;margin-top: 5px;">' +
    '           <div class="changeColorButton" style="background-color: cornflowerblue;margin:2%; border: 1px solid greenyellow;width: auto;line-height:30px;height: 30px;cursor:pointer;">确认并使用</div>' +
    '           <div class="cancelButton" style="border: 1px solid greenyellow;margin:2%;width: auto;line-height:30px;height: 30px;background-color: deeppink;cursor:pointer; ">取消</div>' +
    '           <div class="saveColorChange" style="border: 1px solid greenyellow;margin:2%;width: auto;line-height:30px;height: 30px;background-color: deeppink;cursor:pointer; ">仅保存</div>' +
    '       </div>' +
    '       <div style="display: flex;justify-content: center;align-items:center;margin-top: 5px;">' +
    '           <div class="useSevedColorChange" style="border: 1px solid greenyellow;margin:2%;width: auto;line-height:30px;height: 30px;background-color: deeppink;cursor:pointer; ">使用已保存</div>' +
    '           <div class="shareColorClass" style="border: 1px solid greenyellow;margin:2%;width: auto;line-height:30px;height: 30px;background-color: deeppink;cursor:pointer; ">分享已保存</div>' +
    '           <div class="addColorClass" style="border: 1px solid greenyellow;margin:2%;width: auto;line-height:30px;height: 30px;background-color: deeppink;cursor:pointer; ">导入保存并使用</div>' +
    '       </div>' +
    '   </div>' +
    '</div>')
//endregion

domByClass('textHide')[0].value = lSGet(roleid + "_hideTrigger") ? JSON.parse( lSGet(roleid + "_hideTrigger")) : '橙开始,橙结束,橙目标,橙翻车'
domByClass('textPanelMianban')[0].value = lSGet(roleid + "_textPanel") ? JSON.parse(lSGet(roleid + "_textPanel")) : '冲冲冲!,20出1,来打架!,告辞!,下了下了,老子来了!'

boardSetButton.onclick = () => {
    domByClass('boardSet')[0].style.display = ''
}

//弹窗的js
//面板按钮取消
domByClass('cancelButton')[0].onclick = () => {
    domByClass('boardSet')[0].style.display = 'none'
}
//面板按钮取消
domByClass('cancelButton')[1].onclick = () => {
    domByClass('boardSet')[0].style.display = 'none'
}
//面板按钮取消
domByClass('cancelButton')[2].onclick = () => {
    domByClass('boardSet')[0].style.display = 'none'
}
//确定 //保存到本地 //更新现场数据
domByClass('readyAllButton')[0].onclick = () => {
    lSSet(roleid + "_hideTrigger", JSON.stringify(domByClass('textHide')[0].value));
    lSSet(roleid + "_textPanel", JSON.stringify(domByClass('textPanelMianban')[0].value));
    upDate()
    domByClass('boardSet')[0].style.display = 'none'
    //更新聊天信息现场
    addPanelHTML()
}


//面板整体

//添加面板按钮
domByClass("right-bar")[0].insertAdjacentHTML("beforeend", '<span  class="tool-item boardButton" style="opacity: 1; color: deeppink"><span class="glyphicon glyphicon-cog  tool-icon">,</span> <span cass="tool-text">面板</span> </span>');
//为按钮绑定隐藏
domByClass('br-tool')[0].onclick = () => {
    var dpy = domByClass("boardButton")[0].style
    if (dpy.display === 'none') {
        dpy.display = ''
    } else {
        dpy.display = 'none'
    }
}
//绑定事件, 点击后动画离开
domByClass("raidToolbar")[0].classList.add('mianBanBegin')
domByClass("WG_log")[0].classList.add('mianBanBegin')
domByClass("boardButton")[domByClass("boardButton").length - 1].onclick = function () {
    let WG_log = domByClass("WG_log")[0]
    let raidToolbar = domByClass("raidToolbar")[0]
    if (WG_log.classList.contains('mianBanDown')) {
        //显示
        //删除类
        raidToolbar.classList.remove('mianBanDown')
        WG_log.classList.remove('mianBanDown')

        raidToolbar.classList.add('mianBanShow')
        WG_log.classList.add('mianBanShow')
        setTimeout(function () {
            //占据空间
            WG_log.classList.remove('mianBanAbs')
            raidToolbar.classList.remove('mianBanAbs')
        }, 500)
    } else {
        //删除类
        raidToolbar.classList.remove('mianBanShow')
        WG_log.classList.remove('mianBanShow')

        raidToolbar.classList.add('mianBanDown')
        WG_log.classList.add('mianBanDown')
        setTimeout(function () {
            //消除占据空间
            raidToolbar.classList.add('mianBanAbs')
            WG_log.classList.add('mianBanAbs')
        }, 500)

    }
}

//展开颜色改变面板
domByClass('openColorChange')[0].onclick = () => {
    domByClass('colorAuto')[0].style.display = ''
}

//自定义颜色输入框获取
function getColorInput() {
    var str = ''
    for (let i = 0; i < 21; i++) {
        let tag1 = domById('colorOne' + i).value
        let tag2 = domById('colorTwo' + i).value
        if (tag1 != '') {
            if (tag2==''){
                str += '\n' + colorHtmlClass[i] + ' {color:' + tag1 + ';}'
            }else{
                str += '\n' + colorHtmlClass[i] + ' {background: linear-gradient(to right, '+tag1+', '+tag2+');-webkit-background-clip: text; color: transparent;}'
            }
        }
    }
    return str
}

//保存颜色变更到本地
domByClass('saveColorChange')[0].onclick = () => {
    lSSet(roleid + "_colorChanged", JSON.stringify(getColorInput()));
}

//恢复使用上次保存的颜色
domByClass('useSevedColorChange')[0].onclick = () => {
    onloadToColor()
}

//回复颜色使用
function onloadToColor(){
    if (lSGet(roleid + "_colorChanged")) {
        var style = document.head.innerHTML
        var styleAddress = style.indexOf("</style>")
        document.head.innerHTML = style.slice(0, styleAddress) + JSON.parse(lSGet(roleid + "_colorChanged")) + style.slice(styleAddress)
    } else {
        alert('没有自定义记录')
    }
}


//自定义颜色确认的按钮
domByClass('changeColorButton')[0].onclick = () => {
    var style = document.head.innerHTML
    var styleAddress = style.indexOf("</style>")
    document.head.innerHTML = style.slice(0, styleAddress) + getColorInput() + style.slice(styleAddress)
    domByClass('boardSet')[0].style.display = 'none'
}

//分享自定义颜色格式的按钮
domByClass("shareColorClass")[0].onclick = ()=>{
    copyAgain()
    alert("已复制到粘贴板")
}
//分享按钮二次绑定
function copyAgain(){
    copy(JSON.parse(lSGet(roleid + "_colorChanged")))
    domByClass("shareColorClass")[0].onclick = ()=>{
        copyAgain()
        alert("已复制到粘贴板")
    }
}

//导入自定义颜色 保存并使用
domByClass("addColorClass")[0].onclick = ()=>{
   let colorInfo = prompt("请输入被分享的颜色:");
   if (colorInfo==null){
       alert("取消导入")
       return
   }
    lSSet(roleid + "_colorChanged", JSON.stringify(colorInfo))
    var style = document.head.innerHTML
    var styleAddress = style.indexOf("</style>")
    document.head.innerHTML = style.slice(0, styleAddress) +colorInfo + style.slice(styleAddress)
    domByClass('boardSet')[0].style.display = 'none'
}

//自定义颜色自启动切换按钮
domByClass("buttonColorTag")[0].onclick = ()=>{
    lSSet(roleid + "_tagColorUse", JSON.stringify(!tagColorUse));
    tagColorUse  = !tagColorUse
    useOldColor()
}
//自定义颜色自启动状态切换
function useOldColor() {
    if (tagColorUse===true){
        domByClass("buttonColorTagShow")[0].innerText = "开"
        onloadToColor()
    }else {
        domByClass("buttonColorTagShow")[0].innerText = "关"
    }
}
useOldColor()

//复制函数
function copy(str) {
    var save = function (e) {
        e.clipboardData.setData('text/plain', str);//clipboardData对象
        e.preventDefault();//阻止默认行为
        //点击后失效
        e.target.onclick = null;
    };
    document.addEventListener('copy', save);
    console.log(str)
    return document.execCommand("copy");//使文档处于可编辑状态，否则无效
}

//实际事件函数
function copyList(list) {
    if (list.length > 0) {
        for (let j = 0; j < list.length; j++) {
            list[j].addEventListener('click', function () {});
            list[j].onclick = (ev) => {
                //失效前一个函数
                ev.target.onclick != null ? '' : ev.target.onclick = null
                copy(list[j].innerText)
            }
        }
    }
}


//绑点击复制事件
domByClass('startToCopy')[0].onclick = () => {
    domByClass('boardSet')[0].style.display = 'none'
    var channelList = domByClass('channel')[0].firstChild.childNodes
    var contentMessageList =
        domByClass('content-message')[0].lastChild

    contentMessageList.onclick = (ev) => {
        //失效前一个函数
        ev.target.onclick != null ? '' : ev.target.onclick = null
        copy(contentMessageList.innerText)
    }
//复制聊天记录
    copyList(channelList)
    //复制提示内容

}


//快捷发言

function addPanelHTML() {
    //清空旧HTML
    if (domByClass('panelInfo').length > 1) {
        domByClass('panelMianBan')[0].parentNode.removeChild(domByClass('panelMianBan')[0])
    }
    var mindPanelReadyHTML = ''
    for (let i = 0; i < panelArr.length; i++) {
        mindPanelReadyHTML += `<div tag= "${i}" class="panelInfo" style="color: black;cursor: pointer; margin: 10px;">${panelArr[i]}</div>`
    }
    //加入HTML
    var panelHTML = '<div class="panelMianBan" style="display: flex;width: 100% ;height: auto;background-color: #717471;' +
        'flex-wrap: wrap;align-content: flex-start;">' + mindPanelReadyHTML + '</div>'
    domByClass('chat-panel')[0].insertAdjacentHTML("beforeend", panelHTML)

    //绑定事件
    var allPanelHTML = domByClass('panelInfo')

    for (let i = 0; i < allPanelHTML.length; i++) {
        allPanelHTML[i].onclick = () => {
            domByClass('sender-box')[0].value = domByClass('sender-box')[0].value + '' + allPanelHTML[allPanelHTML[i].attributes.tag.value].innerHTML;
            sendPanel()
        }
    }
}

addPanelHTML()


//点击发送按键
function sendPanel() {
    domByClass('sender-btn')[0].click()
}


