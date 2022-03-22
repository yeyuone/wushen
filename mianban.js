
var styleStr = '.mianBanBegin {\n' +
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
    '}\n'




//获取
var style = document.head.innerHTML
var styleAddress = style.indexOf("</style>")
document.head.innerHTML = style.slice(0,styleAddress)+styleStr+style.slice(styleAddress)




var flagTiggerIsShow = true   //标识 目前状态:true精简列表  false(全部列表)
var hidName = localStorage.getItem("hideTrigger") ? localStorage.getItem("hideTrigger").split(',') : [];

document.getElementsByClassName("trigger")[0].onclick = () => {
    hidName = localStorage.getItem("hideTrigger") ? localStorage.getItem("hideTrigger").split(',') : [];
    let parNodes = document.getElementsByClassName("zdy-item")
    let changeButton = document.getElementById('wsmud_raid_left')
    changeButton.innerText = '全部列表'
    changeButton.style.color = 'red'
    changeButton.onclick = () => {
        if (flagTiggerIsShow ===false) {
            for (let i = 0; i < parNodes.length; i++) {
                for (let j = 0; j < hidName.length; j++) {
                    if (parNodes[i].childNodes[2] && parNodes[i].childNodes[2].innerText == hidName[j]) {
                        parNodes[i].style.display = 'none'
                    }
                }
            }
            if (changeButton) {
                changeButton.innerText = '精简列表'
                flagTiggerIsShow = true
            }
        } else {
            for (let i = 0; i < parNodes.length; i++) {
                for (let j = 0; j < hidName.length; j++) {
                    if (parNodes[i].childNodes[2] && parNodes[i].childNodes[2].innerText == hidName[j]) {
                        parNodes[i].style.display = ''
                    }
                }
            }
            if (changeButton) {
                changeButton.innerText = '全部列表'
                flagTiggerIsShow = false
            }
        }
    }
    if (flagTiggerIsShow===true) {
        for (let i = 0; i < parNodes.length; i++) {
            for (let j = 0; j < hidName.length; j++) {
                if (parNodes[i].childNodes[2] && parNodes[i].childNodes[2].innerText == hidName[j]) {
                    parNodes[i].style.display = 'none'
                }
            }
        }
        if (changeButton) {
            changeButton.innerText = '精简列表'
        }
    }
    //为所有触发绑定点击,画面重绘
    let triggerItems  = document.getElementsByClassName("breakText")
    for (let i=0;i<triggerItems.length;i++){
        triggerItems[i].onclick = ()=>{
            triggerAcitonfunc()
        }
    }
}



//二次绑定
function triggerAcitonfunc(){

    let parNodes = document.getElementsByClassName("zdy-item")
    let changeButton = document.getElementById('wsmud_raid_left')
    changeButton.innerText = flagTiggerIsShow === true?'精简列表':'全部列表'
    changeButton.style.color = 'red'

    document.getElementById('wsmud_raid_left').onclick = () => {
        if (flagTiggerIsShow ===false) {
            for (let i = 0; i < parNodes.length; i++) {
                for (let j = 0; j < hidName.length; j++) {
                    if (parNodes[i].childNodes[2] && parNodes[i].childNodes[2].innerText == hidName[j]) {
                        parNodes[i].style.display = 'none'
                    }
                }
            }
            if (document.getElementById('wsmud_raid_left')) {
                document.getElementById('wsmud_raid_left').innerText = '精简列表'
                flagTiggerIsShow = true
            }
        } else {
            for (let i = 0; i < parNodes.length; i++) {
                for (let j = 0; j < hidName.length; j++) {
                    if (parNodes[i].childNodes[2] && parNodes[i].childNodes[2].innerText == hidName[j]) {
                        parNodes[i].style.display = ''
                    }
                }
            }
            if (document.getElementById('wsmud_raid_left')) {
                document.getElementById('wsmud_raid_left').innerText = '全部列表'
                flagTiggerIsShow = false
            }
        }
    }
    if (flagTiggerIsShow===true) {
        for (let i = 0; i < parNodes.length; i++) {
            for (let j = 0; j < hidName.length; j++) {
                if (parNodes[i].childNodes[2] && parNodes[i].childNodes[2].innerText == hidName[j]) {
                    parNodes[i].style.display = 'none'
                }
            }
        }
    }
    //为所有触发绑定点击,画面重绘
    let triggerItems  = document.getElementsByClassName("breakText")
    for (let i=0;i<triggerItems.length;i++){
        triggerItems[i].onclick = ()=>{
            triggerAcitonfunc()
        }
    }
}










//添加按钮 添加弹窗
document.getElementsByClassName('raidToolbar')[0].insertAdjacentHTML("beforeend", '<span class="raid-item boardSetButton"><hio>设置</hio></span>')
let boardSetButton = document.getElementsByClassName('boardSetButton')[0]

document.getElementsByClassName('container')[0].insertAdjacentHTML("beforeend",
    '<div class="boardSet" style="z-index: 99999; position:absolute;height: 50%;margin: auto;width: 80%;background-color: white;bottom: 20%;left: 10%;flex-flow: column nowrap;display: flex;align-items: center;text-align: center;' +
    'border: 2px solid blue;display: none">' +
    ' <h3>设置面板1.1 <span style="font-size: 10px">by 与風</span></h3>' +
    '<p>请在下面输入要隐藏的触发名称,使用英文符号","分隔</p>' +
    '<textarea class="textHide" style="font-size:  16px;width: 50%" rows="5" ></textarea>' +
    '<div style="display: flex;justify-content:center;"><div class="readyAllButton" style="border: 1px solid greenyellow;margin-top:20px;right:20px;margin-right: 10px;width: 50px;line-height:30px;height: 30px;">确认</div>' +
    '<div class="cancelButton" style="border: 1px solid greenyellow;margin-top:20px;right:20px;margin-right: 10px;width: 50px;line-height:30px;height: 30px;">取消</div></div></div>')

document.getElementsByClassName('textHide')[0].value = localStorage.getItem("hideTrigger") ? localStorage.getItem("hideTrigger") : '橙开始,橙结束,橙目标,橙翻车'

boardSetButton.onclick = () => {
    document.getElementsByClassName('boardSet')[0].style.display = ''
}

//弹窗的js
//取消
document.getElementsByClassName('cancelButton')[0].onclick = () => {
    document.getElementsByClassName('boardSet')[0].style.display = 'none'
}
//确定 //保存到本地
document.getElementsByClassName('readyAllButton')[0].onclick = () => {
    localStorage.setItem("hideTrigger", document.getElementsByClassName('textHide')[0].value);
    document.getElementsByClassName('boardSet')[0].style.display = 'none'
}




//面板整体

//添加面板按钮
document.getElementsByClassName("right-bar")[0].insertAdjacentHTML("beforeend", '<span  class="tool-item boardButton" style="opacity: 1; color: deeppink"><span class="glyphicon glyphicon-cog  tool-icon">,</span> <span cass="tool-text">面板</span> </span>');
//为按钮绑定隐藏
document.getElementsByClassName('br-tool')[0].onclick = ()=>{
    var dpy = document.getElementsByClassName("boardButton")[0].style
    if(dpy.display=='none'){
        dpy.display = ''
    }else {
        dpy.display = 'none'
    }
}
//绑定事件, 点击后动画离开
document.getElementsByClassName("raidToolbar")[0].classList.add('mianBanBegin')
document.getElementsByClassName("WG_log")[0].classList.add('mianBanBegin')
document.getElementsByClassName("boardButton")[document.getElementsByClassName("boardButton").length - 1].onclick = function () {
 let WG_log =    document.getElementsByClassName("WG_log")[0]
    let raidToolbar = document.getElementsByClassName("raidToolbar")[0]
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


