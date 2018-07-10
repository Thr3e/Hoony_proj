

//导入模块
const tools = require('./tools');
const loader = require('./hcx_loadhtml');
//引入模块
import '../less/hcx_normalize.less'
import '../less/hcx_common.less'
import '../less/index.less'

(function(){
    loader.loadCommon();
})();