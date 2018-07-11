import '../less/hcx_normalize.less';
import '../less/hcx_common.less';
import '../less/hcx_pages.less'

const loader = require('./hcx_loadhtml');
$(function(){
    loader.loadCommon();
    $('.add-cart').click((e) => {
        let _this = e.currentTarget;
        let goodData = {};
        goodData.image = $(_this).parent().siblings("a").find("img").attr('src');
        goodData.title = $(_this).siblings('.good-name').text();
        goodData.price = $(_this).siblings('.good-price').text();
        goodData.count = 1;
        if (sessionStorage.curUser) {
            let curName = JSON.parse(sessionStorage['curUser']).username;
            let localCart = [];
            let hasData = false;
            if(localStorage.userCart) {
                localCart = JSON.parse(localStorage.userCart);
            }
            $.each(localCart, (idx, val) => {
                if (val.username === curName){
                    val['goodlist'].push(goodData);
                    hasData = true;
                }
            })
            if(!hasData){
                localCart.push({
                    username:curName,
                    goodlist:[goodData]
                });
            }

            localCart.goodlist = arrNoRepeat(localCart.goodlist);
            localStorage.userCart = JSON.stringify(localCart);
        } else{
            let tmpCart = {username:"tmpUser", goodlist:[]};
            if (sessionStorage.tmpCart) tmpCart = JSON.parse(sessionStorage.tmpCart)

            tmpCart['goodlist'].push(goodData);

            tmpCart.goodlist = arrNoRepeat(tmpCart.goodlist);

            sessionStorage.tmpCart = JSON.stringify(tmpCart);
        }
        alert('成功加入购物车')
    })
});

function arrNoRepeat(arr){
    let tmpObj = {},
        newArr = [],
        index  = 1;
    $.each(arr, (idx, val) => {
        if(!tmpObj[val.title]){
            tmpObj[val.title] = index;
            newArr.push(val);
            index += 1;
        }else{
            newArr[tmpObj[val.title] - 1].count += 1;
        }
    })

    return newArr;
}