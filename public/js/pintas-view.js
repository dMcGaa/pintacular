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
            
            var pintaImg = document.createElement("img");
            pintaImg.src = data[i].pinta_html;
            pintaImg.className = "pinta-img-link";
            
            $("#pinta-list").append(pintaImg);
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