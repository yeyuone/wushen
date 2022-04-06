//角色ID
const roleid = document.querySelectorAll(".role-list>.select")[0].attributes['roleid'].value;

const v = "面板1.7更新内容:\n" +
    "        1. 所有配置支持云备份\n" +
    "        2. 目前功能:复制,触发隐藏,面板隐藏,快捷发言,颜色自定义\n" +
    "        3. 修改快捷发言,可以作为后缀在聊天框对的基础上添加并发送\n";
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
            '               <input id="color' + i + '" type="text">' +
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

function upDate() {
    hidName = lSGet(roleid + "_hideTrigger") ? (lSGet(roleid + "_hideTrigger").slice(1, lSGet(roleid + "_hideTrigger").length - 1)).split(',') : [];
    panelArr = lSGet(roleid + "_textPanel") ? (lSGet(roleid + "_textPanel").slice(1, lSGet(roleid + "_textPanel").length - 1)).split(',') : [];
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
    '<div class="boardSet" style="z-index: 99999;  overflow:scroll;background-color: #bfa; position:absolute;height: 60%;margin: auto;width: 90%;bottom: 20%;left: 10%;flex-flow: column nowrap;display: flex;align-items: center;text-align: center;' +
    'border: 2px solid #0000ff;display: none">' +
    '   <div class="cancelButton" style="text-align: center;cursor: pointer; line-height: 20px; float:right;padding:20px 20px 0 0; color: black;font-size: 15px;">X</div>' +
    '   <h3>设置面板1.7 ' +
    '       <span style="font-size: 10px">by 与風</span>' +
    '   </h3>' +
    '   <h4>如果你有好的想法和建议,欢迎在仙界群@与風</h4>' +
    '   <div>' +
    '       <p style="color:darkblue;"> 消息复制功能:</p>' +
    '       <p style="color:darkblue;"> 解决app无法复制消息的问题,可复制提示内容,发言,为提高体验,减少消耗,每点一次启动:每条消息都会获得一次复制机会,简单来说:点击启动,然后点击你要复制的消息</p>' +
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
    '   <p>仅支持4位或7位16进制颜色,如:#FFFFFF 具体请百度(颜色不变说明写的有问题哦)</p>' +
    '   <div class="colorAuto" style="display: none;margin-bottom: 20%;background-color: #000000">' +
    autoColorHTML() +
    '       <div style="display: flex;justify-content: center;align-items:center;margin-top: 5px;">' +
    '           <div class="changeColorButton" style="background-color: cornflowerblue;margin:5%; border: 1px solid greenyellow;width: auto;line-height:30px;height: 30px;cursor:pointer;">确认</div>' +
    '           <div class="cancelButton" style="border: 1px solid greenyellow;margin:5%;width: auto;line-height:30px;height: 30px;background-color: deeppink;cursor:pointer; ">取消</div>' +
    '           <div class="saveColorChange" style="border: 1px solid greenyellow;margin:5%;width: auto;line-height:30px;height: 30px;background-color: deeppink;cursor:pointer; ">保存</div>' +
    '           <div class="useSevedColorChange" style="border: 1px solid greenyellow;margin:5%;width: auto;line-height:30px;height: 30px;background-color: deeppink;cursor:pointer; ">使用已保存</div>' +
    '       </div>' +
    '   </div>' +
    '</div>')
//endregion

domByClass('textHide')[0].value = lSGet(roleid + "_hideTrigger") ? lSGet(roleid + "_hideTrigger").slice(1, lSGet(roleid + "_hideTrigger").length - 1) : '橙开始,橙结束,橙目标,橙翻车'
domByClass('textPanelMianban')[0].value = lSGet(roleid + "_textPanel") ? lSGet(roleid + "_textPanel").slice(1, lSGet(roleid + "_textPanel").length - 1) : '冲冲冲!,20出1,来打架!,告辞!,下了下了,老子来了!'

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
    lSSet(roleid + "_hideTrigger", '"' + domByClass('textHide')[0].value + '"');
    lSSet(roleid + "_textPanel", '"' + domByClass('textPanelMianban')[0].value + '"');
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
        let tag = domById('color' + i).value
        if (tag != '' && tag.slice(0, 1) == '#' && (tag.length == 4 || tag.length == 7)) {
            str += '\n' + colorHtmlClass[i] + ' {\n color:' + tag + ';\n}'
        }
    }
    return str
}

//保存颜色变更到本地
domByClass('saveColorChange')[0].onclick = () => {
    lSSet(roleid + "_colorChanged", '"' + getColorInput() + '"');
}

//恢复使用上次保存的颜色
domByClass('useSevedColorChange')[0].onclick = () => {
    if (lSGet(roleid + "_colorChanged")) {
        var style = document.head.innerHTML
        var styleAddress = style.indexOf("</style>")
        document.head.innerHTML = style.slice(0, styleAddress) + lSGet(roleid + "_colorChanged").slice(1, lSGet(roleid + "_colorChanged").length - 1) + style.slice(styleAddress)
    } else {
        alert('没有记录')
    }
}

//自定义颜色确认的按钮
domByClass('changeColorButton')[0].onclick = () => {
    var style = document.head.innerHTML
    var styleAddress = style.indexOf("</style>")
    document.head.innerHTML = style.slice(0, styleAddress) + getColorInput() + style.slice(styleAddress)
    domByClass('boardSet')[0].style.display = 'none'
}


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
            list[j].addEventListener('click', function () {
            });
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


