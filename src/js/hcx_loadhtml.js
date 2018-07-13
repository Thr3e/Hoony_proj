
const Tool = require('./hcx_tools');

function loadCommon(){
    let tool     = new Tool(),
        loginStr = '',
        curUser  = {},
        cartData = tool.getCurCartData(),
        emptyCart= true;
    if (sessionStorage.curUser) {
        curUser = JSON.parse(sessionStorage.curUser);
        loginStr = `<a href="#" class="login-btn" data-status="loged">
                        ${curUser.username}, 你好!</a>`
    }else{
        loginStr = `<a href="#" class="login-btn" data-status="login"></a>`
    }

    if(cartData.length !== 0) emptyCart = false;

    let headerStr = `
    <div class="wrap1200">
            <div class="banner-title">
                <div class="contact-us"><a href="#"></a></div>
                <div class="title-logo">
                    <a href="#"></a>
                    <form action="javascript:;" name="citySelector">
                        <select class="selector">
                            <option value="0">成都地区</option>
                            <option value="1">北京地区</option>
                            <option value="2">上海地区</option>
                            <option value="3">深圳地区</option>
                            <option value="4">其他地区</option>
                        </select>
                    </form>
                </div>
                <div class="carts-login">
                    ${loginStr}
                    <i class="partition"></i>
                    <a href="#" class="carts ${emptyCart? 'empty':'not-empty'}"></a>
                </div>
            </div>
        </div>
        <div class="banner-list">
            <div class="wrap1200 clearFix">
                <div class="menu-list fl">
                    <ul class="mainlist">
                        <li class="list-item">
                            <a class="list-title" id="sofas">
                                沙发&nbsp;SOFAS
                            </a>
                            <ul class="sublist">
                                <li><a href="#" class="col_1">单人位</a></li>
                                <li><a href="#" class="col_1">双人位</a></li>
                                <li><a href="#" class="col_1">三人位</a></li>
                                <li><a href="#" class="col_1">休闲沙发</a></li>
                                <li><a href="#" class="col_1">转角沙发</a></li>
                            </ul>
                        </li>
                        <li class="list-item">
                            <a class="list-title" id="tables">
                                桌椅&nbsp;TABLES/CHAIR
                            </a>
                            <ul class="sublist">
                                <li><a href="#" class="col_2">餐桌</a><a href="#" class="col_2">餐椅</a></li>
                                <li><a href="#" class="col_2">书桌</a><a href="#" class="col_2">凳子</a></li>
                                <li><a href="#" class="col_2">电脑桌</a><a href="#" class="col_2">休闲椅</a></li>
                                <li><a href="#" class="col_2">梳妆台</a><a href="#" class="col_2">户外椅</a></li>
                                <li><a href="#" class="col_1">其他</a></li>
                            </ul>
                        </li>
                        <li class="list-item">
                            <a class="list-title" id="beds">
                                床&nbsp;BEDS
                            </a>
                            <ul class="sublist">
                                <li><a href="#" class="col_1">1.8米</a></li>
                                <li><a href="#" class="col_1">1.5米</a></li>
                                <li><a href="#" class="col_1">其他</a></li>
                            </ul>
                        </li>
                        <li class="list-item">
                            <a class="list-title" id="storage">
                                柜&nbsp;STORAGE
                            </a>
                            <ul class="sublist">
                                <li><a href="#" class="col_2">书柜</a><a href="#" class="col_2">储物柜</a></li>
                                <li><a href="#" class="col_2">衣柜</a><a href="#" class="col_2">电视柜</a></li>
                                <li><a href="#" class="col_2">鞋柜</a><a href="#" class="col_2">床头柜</a></li>
                                <li><a href="#" class="col_1">其他</a></li>
                            </ul>
                        </li>
                        <li class="list-item">
                            <a class="list-title" id="more">
                                更多&nbsp;MORE
                            </a>
                            <ul class="sublist">
                                <li><a href="#" class="col_1">组合产品</a></li>
                                <li><a href="#" class="col_1">日用家居</a></li>
                                <li><a href="#" class="col_1">家居饰品</a></li>
                                <li><a href="#" class="col_1">其他</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="search-bar fr">
                    <input type="text" class="search-ipt" placeholder="搜索">
                    <i class="search-icon"></i>
                </div>
            </div>
        </div>`;
        let footerStr = `
        <div class="foot-title">
            <div class="wrap1200">
                <p>生活要过得朴素而有味道，但不用过得奢华。</p>
            </div>
        </div>
        <div class="wrap1200">
            <div class="slogen wrap720">
                <div>
                    <i class="icon">环保</i>
                    <span>无甲醛&nbsp;大自然</span>
                </div>
                <div>
                    <i class="icon">低价</i>
                    <span>低于购买价6折</span>
                </div>
                <div>
                    <i class="icon">安全</i>
                    <span>专业清洗消毒处理</span>
                </div>
                <div>
                    <i class="icon">省心</i>
                    <span>专业物流配送安装</span>
                </div>
                <div>
                    <i class="icon">快捷</i>
                    <span>24小时内发货</span>
                </div>
            </div>
            <div class="info-list">
                <div class="li">
                    <p class="info-title">关于我们</p>
                    <div class="info-links">
                        <p>
                            <a href="#">关于户里</a>
                            <a href="#">注册协议</a>
                        </p>
                        <p>
                            <a href="#">业务合作</a>
                            <a href="#">免责声明</a>
                        </p>
                        <p>
                            <a href="#">加入户里</a>
                            <a href="#">隐私保护</a>
                        </p>
                    </div>
                </div>
                <div class="li">
                    <p class="info-title">流程指南</p>
                    <div class="info-links">
                        <p>  
                            <a href="#">购买家具</a>
                            <a href="#">出售家具</a>
                        </p>  
                        <p>
                            <a href="#">支付方式</a>
                            <a href="#">配送安装</a>
                        </p>
                        <p>
                            <a href="#">售后保障</a>
                        </p>
                    </div>
                </div>
                <div class="li">
                    <p class="info-title">会员中心</p>
                    <div class="info-links">
                        <p>
                            <a href="#">会员计划</a>
                        </p>
                        <p>
                            <a href="#">积分规则</a>
                        </p>
                        <p>
                            <a href="#">投诉建议</a>
                        </p>
                    </div>
                </div>
                <div class="li">
                    <p class="info-title">联系客服</p>
                    <div class="info-links">
                        <p>电话：</p>
                        <p>028-12345678</p>
                        <p>邮箱：</p>
                        <p>hello@hulihome.com</p>
                    </div>
                </div>
                <div class="li social-info">
                    <p class="social-title">
                        <i class="weibo-i social-icon"></i>
                        新浪微博@户里网
                    </p>
                    <i class="weibo-q qrcode"></i>
                </div>   
                <div class="li social-info">
                    <p class="social-title">
                        <i class="wechat-i social-icon"></i>
                        关注微信“户里网”
                    </p>
                    <i class="wechat-q qrcode"></i>
                </div>   
            </div>
            <div class="copyright wrap720">
                <p>蜀ICP备15028224号&nbsp;&nbsp;成都户里科技有限公司</p>
            </div>
        </div>`;
        $('#header').html(headerStr);
        $('#footer').html(footerStr);


        require('Router');
}

exports.loadCommon = loadCommon;