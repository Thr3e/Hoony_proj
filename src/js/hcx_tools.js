function Tool() {}
function setTitle() {
    document.querySelector("#title").textContent = "hello,webpack";
}

//导出模块
exports.setTitle = setTitle;