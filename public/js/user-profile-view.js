$(document).ready(function() {
    console.log("hello world " + foundPintas.length);
    addPostsToDom(foundPintas);
    // for(var i = 0; i<foundPintas.length; i++)
    // {
    //     console.log(foundPintas[i]);
    // }
})

function addPostsToDom(data) {
    $("#pinta-list").html("");
    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        var pintaItem = document.createElement("li");
        var pintaName = document.createElement("a");
        pintaName.innerHTML = data[i].pinta_name;
        pintaName.href = data[i].pinta_html;
        
        pintaItem.appendChild(pintaName);
        
        $("#pinta-list").append(pintaItem);
    }
}
