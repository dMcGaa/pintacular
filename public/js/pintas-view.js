$(document).ready(function() {
    viewAllPintas();
})

function viewAllPintas() {
    var promise = promiseAllPintas();
    promise.success(function(data) {
        $("#pinta-list").html("");
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
            var pintaItem = document.createElement("div");
            pintaItem.innerHTML = data[i].pinta_name;
            pintaItem.className = "pinta-item";
            
            var pintaImg = document.createElement("img");
            pintaImg.src = data[i].pinta_html;
            pintaImg.className = "pinta-img-link";
            pintaItem.appendChild(pintaImg);
            
            var pintaUser = document.createElement("a");
            pintaUser.innerHTML = "test"//data[i].pinta_user;
            pintaUser.className = "pinta-user";
            pintaItem.appendChild(pintaUser);
            
            // $("#pinta-list").append(pintaImg);
            $("#pinta-list").append(pintaItem);
            // $("#pinta-list").append("<br>");
        }
    })

}

function promiseAllPintas() {
    return $.ajax({
        url: "/pintas-recent-get",
        type: "POST"
    });
}