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

    setAdminUser(){
        let dataArr = null,
            user    = {};
        if(localStorage.userLogInfo){
            dataArr = JSON.parse(localStorage.userLogInfo);
        }else{
            dataArr = []; 
        }
        user = {
            username:'admin',
            password:'000000'
        };

        dataArr.push(user);
        let jsonObj = JSON.stringify(dataArr);
        localStorage.userLogInfo = jsonObj;
        
        sessionStorage.curUser = JSON.stringify(user);
    }
}

module.exports = Tool;