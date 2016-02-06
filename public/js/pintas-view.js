$(document).ready(function() {
    viewAllPintas();
})

function viewAllPintas() {
    var promise = promiseAllPintas();
    promise.success(function(data) {
        $("#pinta-list").html("");
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
            var pintaItem = document.createElement('a');
            pintaItem.href = data[i].pinta_html;
            pintaItem.innerHTML = data[i].pinta_name;
            $("#pinta-list").append(pintaItem);
            $("#pinta-list").append("<br>");
        }
    })

}

function promiseAllPintas() {
    return $.ajax({
        url: "/pintas-recent-get",
        type: "POST"
    });
}