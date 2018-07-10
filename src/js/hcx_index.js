

//导入模块
const tools = require('./hcx_tools');
//引入模块
import '../less/ljh_index.less'

(function(){

    tools.setTitle();

    let [a, b, c] = [1, 2, 3];
    console.log(a)
    console.log(b)
    console.log(c)

    document.querySelector('.title').onclick = (e) => {
        e.target.textContent = 'Thr3e';
    }
})();