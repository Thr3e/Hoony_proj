

//导入模块
const filename = require('../../build/filename.config')
const tools = require('./' + filename.config.toolsJs);
//引入模块
import '../less/hcx_normalize.less'
import '../less/hcx_common.less'
import '../less/index.less'

(function(){

    let [a, b, c] = [1, 2, 3];
    console.log(a)
    console.log(b)
    console.log(c)
})();