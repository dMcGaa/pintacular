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
    
    var pintaInfo = document.createElement("div");
    pintaInfo.className = "pinta-info";
    var pintaUserName = document.createElement("a");
    pintaUserName.innerHTML = data.pinta_user;
    pintaUserName.href = "/userProfileView/"+data.pinta_user;
    pintaUserName.className = "pinta-user";
    var pintaLikeCount = document.createElement("div");
    pintaLikeCount.className = "pinta-likes";
    pintaLikeCount.innerHTML = data.pinta_likes;
    var pintaLikeButton = document.createElement("i");
    pintaLikeButton.className = "fa fa-star-o";
    pintaLikeButton.style.paddingLeft = "4px";
    pintaLikeCount.appendChild(pintaLikeButton);
    
    pintaInfo.appendChild(pintaUserName);
    pintaInfo.appendChild(pintaLikeCount);
    
    pintaItem.appendChild(pintaInfo);
    
    return pintaItem;
}