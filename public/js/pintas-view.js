$(document).ready(function() {
    viewAllPintas();
})

function viewAllPintas() {
    var $grid = $('.grid').masonry({
      columnWidth: 168,
      itemSelector: '.grid-item'
    });
    var promise = promiseAllPintas();
    promise.success(function(data) {
        $("#pinta-list").html("");
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
            var pintaItem = document.createElement("div");
            pintaItem.innerHTML = data[i].pinta_name;
            // pintaItem.className = "pinta-item";
            pintaItem.className = "grid-item";
            
            var pintaImg = document.createElement("img");
            pintaImg.src = data[i].pinta_html;
            pintaImg.className = "pinta-img-link";
            
            var imgDimension = pintaImg.width / pintaImg.height;
            console.log(pintaImg.width + " " + pintaImg.height);
            console.log("test: " + imgDimension);
            
            switch(true){
                case (imgDimension > 0) && (imgDimension <= 0.60):
                    console.log("test: One");
                    pintaItem.className = "";
                    pintaItem.className = "grid-item grid-item--height4";
                    pintaImg.className = "pinta-img-link pinta-img-link--3";
                    break;
                case (imgDimension > 0.60) && (imgDimension <= 0.73):
                    pintaItem.className = "";
                    pintaItem.className = "grid-item grid-item--height3";
                    pintaImg.className = "pinta-img-link pinta-img-link--2";
                    break;
                case (imgDimension > 0.73) && (imgDimension < 1):
                    pintaItem.className = "";
                    pintaItem.className = "grid-item grid-item--height2";
                    pintaImg.className = "pinta-img-link pinta-img-link--1";
                    break;
                case (imgDimension >= 1):
                    pintaItem.className = "";
                    pintaItem.className = "grid-item";
                    pintaImg.className = "pinta-img-link";
                    break;
                default:
                    pintaItem.className = "";
                    pintaItem.className = "grid-item";
                    pintaImg.className = "pinta-img-link";
                    break;
                
            }
            pintaItem.appendChild(pintaImg);
            
            var pintaInfo = document.createElement("div");
            pintaInfo.className = "pinta-info";
            var pintaUserName = document.createElement("a");
            pintaUserName.className = "pinta-user";
            var pintaLikeCount = document.createElement("div");
            pintaLikeCount.className = "pinta-likes";
            pintaLikeCount.innerHTML = data[i].pinta_likes;
            var pintaLikeButton = document.createElement("i");
            pintaLikeButton.className = "fa fa-star-o";
            pintaLikeButton.style.paddingLeft = "4px";
            pintaLikeCount.appendChild(pintaLikeButton);
            
            pintaUserName.innerHTML = "Test" //data[i].pinta_user;
            pintaInfo.appendChild(pintaUserName);
            pintaInfo.appendChild(pintaLikeCount);
            
            pintaItem.appendChild(pintaInfo);
            
            $(".grid").append(pintaItem);
            var $elems = pintaItem;
            $grid.append( $elems ).masonry( 'appended', $elems );
        }
    })

}

function promiseAllPintas() {
    return $.ajax({
        url: "/pintas-recent-get",
        type: "POST"
    });
}
