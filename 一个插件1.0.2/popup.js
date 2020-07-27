var btn = document.querySelector("#btn");

var loading = document.querySelector(".loader-03");
var loadingText = document.querySelector("span");


btn.addEventListener("click", function () {
    loading.style.display = "inline-block";
    loadingText.innerHTML = "加载中...";
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        let data = {
            msg: {
                code: "once"
            }
        }
        chrome.tabs.sendMessage(tabs[0].id, data, res => {
            if (res) {
                getUser(res);
            }
        })
    })
})

function getUser(res) {
    $.ajax({
        url: "http://omkf.fire2333.com/jumpSystem/account",
        data: res,
        type: 'get',
        dataType: 'json',
        success: function (result) {
            // console.log('result', result);
            // console.log(result);
            emitter(result);

        },
        fail: function (err) {
            let res = {};
            emitter(err);
        },
        complete(content) {
            // console.log(content);
            if (content.responseText.indexOf("DOCTYPE") > 0) {
                let res = {};
                res.code = "toLogin";
                emitter(res);
            }
        }
    });
}

function emitter(msg) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        let message = {
            msg: msg,
        }
        chrome.tabs.sendMessage(tabs[0].id, message, res => {
        })
    })
}
