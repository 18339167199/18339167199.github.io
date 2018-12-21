var account = document.getElementsByClassName("account_content")[0];
var accountTip = document.getElementsByClassName("account_tip");

var passwrod = document.getElementsByClassName("passwrod_content")[0];
var passwrodTip = document.getElementsByClassName("passwrod_tip");

account.onfocus = function(){
    if(account.value != "请输入账号"){
        return;
    }else{
        this.style.color = "white";
        this.value = "";
    }
}

account.onblur = function (){
    if(account.value){
        return;
    }else{
        this.style.color = "black";
        this.value = "请输入账号";
    }
}