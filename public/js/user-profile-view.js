$(document).ready(function() {
    console.log("hello world " + foundPintas.length);
    // addPostsToDom(foundPintas);
    var $grid = $('.grid').masonry({
      columnWidth: 4,
    //   itemSelector: '.grid-item'
    });
    
    for(var i = 0; i<foundPintas.length; i++)
    {
        var elems = [getItemElement(foundPintas[i])];
        var $elems = $( elems );
        $grid.append( $elems ).masonry( 'appended', $elems );
    }
    
})

function addPostsToDom(data) {
    $("#pinta-listUL").html("");
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

function getItemElement(data) {
    var pintaItem = document.createElement('div');
    pintaItem.className = 'grid-item ';
    pintaItem.innerHTML = data.pinta_name;
    
    var pintaImg = document.createElement("img");
    pintaImg.src = data.pinta_html;
    pintaImg.className = "pinta-img-link";
    pintaItem.appendChild(pintaImg);
    
    return pintaItem;
}