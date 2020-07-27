var iv = CryptoJS.enc.Utf8.parse('535f40094e50d555');
var key = CryptoJS.enc.Utf8.parse("7894651784ASDJKH");
const data = {
    hostname: location.hostname,
}

if (location.hostname == "admin-dntg.f5yx.com" && getQueryString('ext')) data.ext = getQueryString('ext');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {


    sendResponse(data);
    // console.log(request);
    // console.log(request.msg.code);
    switch (request.msg.code) {
        case 0:
            alert("加载成功...");
            checkHref(request.msg.data);
            break;
        case 2:
            alert("加载成功...");
            let username = request.msg.data.username.value;
            let pwd = Decrypt(request.msg.data.pwd.value);
            let a = dialog(username, request.msg.data.pwd.value);
            $("body").append(a);
            document.querySelectorAll(".el-dialog__copyT")[0].onclick = function () {

                // Copy(document.querySelectorAll(".el-dialog__span0")[0].innerHTML);
                Copy(username);
                notify('账号已经复制到粘贴板',1000);
            }
            document.querySelectorAll(".el-dialog__copyT")[1].onclick = function () {

                // Copy(document.querySelectorAll(".el-dialog__span1")[0].innerHTML)
                Copy(pwd);
                notify('密码已经复制到粘贴板',1000);
            }

            document.querySelector(".el-dialog__headerbtnT").onclick = function () {
                document.querySelector(".el-dialogT").style.opacity = 0;
                document.querySelector(".el-dialogT").style.visibility = "hidden";
            }
            break;
        case 10:
            // 非官网警告
            alert(request.msg.message);
            break;
        case "toLogin":
            // 登录警告
            alert("请先登录");
            window.open("http://omkf.fire2333.com/");
            break;
        case "once":
            break;
    }
})


function checkHref(data) {
    const username = data.username;
    const pwd = data.pwd;
    pwd.value = Decrypt(pwd.value);
    switch (username.attr) {
        case "id":
            document.querySelector("#" + username.attrValue).value = username.value;
            break;
        case "name":
            document.querySelector("input[name='" + username.attrValue + "']").value = username.value;
            break;
        case "placeholder":
            document.querySelector("input[placeholder='" + username.attrValue + "']").value = username.value;
            break;
    }
    switch (pwd.attr) {
        case "id":
            document.querySelector("#" + pwd.attrValue).value = pwd.value;
            break;
        case "name":
            document.querySelector("input[name='" + pwd.attrValue + "']").value = pwd.value;
            break;
        case "placeholder":
            document.querySelector("input[placeholder='" + pwd.attrValue + "']").value = pwd.value;
            break;
    }
}


function Decrypt(word) {
    var decrypt = CryptoJS.AES.decrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

function getQueryString(a) {
    var reg = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i"),
        r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

function dialog(usr, pwd) {
    var a = `
    <div role="dialog" aria-modal="true" aria-label="提示" class="el-dialogT" style="margin-top: 15vh;">
        <div class="el-dialog__headerT">
            <span class="el-dialog__titleT">提示</span>
            <button type="button" aria-label="Close" class="el-dialog__headerbtnT">
                <i class="el-dialog__closeT el-icon el-icon-closeT"></i>
            </button>
        </div>
        <div class="el-dialog__bodyT">
            <div>
                <span class="el-dialog__span0">${usr}</span>
                <button class="el-dialog__copyT">复制</button>
            </div>
            <div class="el-dialog__spanT">
                <span class="el-dialog__span1">${pwd}</span>
                <button class="el-dialog__copyT">复制</button>
            </div>
        </div>
    </div>
    `
    return a;
}

function Copy(value) {
    var textarea = document.createElement('textarea');
    textarea.value = value;
    var div = document.createElement('div');
    div.appendChild(textarea);
    div.style.position = 'absolute';
    div.style.left = '-10000px';
    div.style.top = '-10000px';
    document.getElementsByTagName('body')[0].appendChild(div);
    textarea.select();
    document.execCommand('Copy');
    document.getElementsByTagName('body')[0].removeChild(div);
}

function notify(str, timeout) {
    let boxId = new Date().getTime();
    let divElement = '<div class=\"custom-prompt-box\" data-box-id="' + boxId + '"></div>';
    $('body').append(divElement);

    let customPromptBoxEl = $(".custom-prompt-box[data-box-id|='" + boxId + "']");
    customPromptBoxEl.html(str);
    customPromptBoxEl.fadeIn();
    setTimeout(function () {
        customPromptBoxEl.fadeOut(500, function () {
            customPromptBoxEl.remove();
        });
    }, timeout)
}