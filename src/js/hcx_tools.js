import {THRTipTag} from '../plugin/js/THRTiptag'

class Tool {

    constructor(){};

    getCurCartData(){
        let curCart = [];
        if (sessionStorage.curUser) {
            let curUser = JSON.parse(sessionStorage.curUser),
                cartList = [];
            if(localStorage.userCart){
                cartList = JSON.parse(localStorage.userCart);
                $.each(cartList, (idx, val) => {
                    if(val.username === curUser.username){
                        curCart = val.goodlist;
                    }
                })
            }
        }else{
            if(sessionStorage.tmpCart)
            curCart = JSON.parse(sessionStorage.tmpCart).goodlist;
        }
        return curCart;
    }

    setCurCartData(data){
        if (sessionStorage.curUser) {
            let curUser = JSON.parse(sessionStorage.curUser)
            if(localStorage.userCart){
                let cartList = JSON.parse(localStorage.userCart);
                $.each(cartList, (idx, val) => {
                    if(val.username === curUser.username){
                        val.goodlist = data;
                    }
                })
                localStorage.userCart = JSON.stringify(cartList);
            }
        }else{
            if(sessionStorage.tmpCart){
                let tmpCart = JSON.parse(sessionStorage.tmpCart);
                tmpCart.goodlist = data;
                sessionStorage.tmpCart = JSON.stringify(tmpCart);

            }
        }
    }

    setAdminUser(){
        let dataArr = null,
            user    = {},
            hasAdmin = false;
        if(localStorage.userLogInfo){
            dataArr = JSON.parse(localStorage.userLogInfo);
        }else{
            dataArr = []; 
        }
        $.each(dataArr, (idx, val) => {
            if(val.username === 'admin') hasAdmin = true;
        })
        if(!hasAdmin){
            user = {
                username:'admin',
                password:'000000'
            };
    
            dataArr.push(user);
            let jsonObj = JSON.stringify(dataArr);
            localStorage.userLogInfo = jsonObj;
        }
    }

    addCart(data) {
        $('.add-cart').click((e) => {
            let _this = e.currentTarget;
            let goodData = data || {
                image : $(_this).parent().siblings("a").find("img").attr('src'),
                title : $(_this).siblings('.good-name').text(),
                price : $(_this).siblings('.good-price').text(),
                count : 1
            }
            if (data)  goodData.count = parseInt(data.el.val());
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
                        val['goodlist'] = this.arrNoRepeat(val['goodlist']);
                        hasData = true;
                    }
                })
                if(!hasData){
                    localCart.push({
                        username:curName,
                        goodlist:[goodData]
                    });
                }
    
                localStorage.userCart = JSON.stringify(localCart);
            } else{
                let tmpCart = {username:"tmpUser", goodlist:[]};
                if (sessionStorage.tmpCart) tmpCart = JSON.parse(sessionStorage.tmpCart)
    
                tmpCart['goodlist'].push(goodData);
    
                tmpCart.goodlist = this.arrNoRepeat(tmpCart.goodlist);
    
                sessionStorage.tmpCart = JSON.stringify(tmpCart);
            }
            
            new THRTipTag({
                title:'温馨提示',
                alertType:'correct',
                message:"成功加入购物车",
                autoClose:500
            })
        })
    }

    arrNoRepeat(arr){
        let tmpObj = {},
            newArr = [],
            index  = 1;
        $.each(arr, (idx, val) => {
            if(!tmpObj[val.title]){
                tmpObj[val.title] = index;
                newArr.push(val);
                index += 1;
            }else{
                newArr[tmpObj[val.title] - 1].count += val.count;
            }
        })
        return newArr;
    }
}

module.exports = Tool;