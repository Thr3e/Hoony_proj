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
}

module.exports = Tool;