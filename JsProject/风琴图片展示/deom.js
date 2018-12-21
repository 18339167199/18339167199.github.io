$(function(){
    $("li").mouseover(function(){
        $(this).stop(true).animate({width:"533px"},1000).siblings().stop(true).animate({width:"100px"},1000);
    })
})