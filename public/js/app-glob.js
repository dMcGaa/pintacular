$(document).ready(function() {
    var user = checkCookie();
    if (user !==""){
        $("#header-user").html(user);
        $("#header-user").css("display", "block");
        $("#header-logout").css("display", "block");
        $("#header-login").css("display", "none");
        $("#header-signup").css("display", "none");
    }
    $("#header-logout").click(function(){
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; //previous date will cause cookie to delete
        // window.location.href = "index"; //simulate a link click  
    })
    
})

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        return user;
        // alert("Welcome again " + user);
    }
    else{
        return "";
    }
}