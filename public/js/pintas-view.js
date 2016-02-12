$(document).ready(function() {
    viewAllPintas();
})

function viewAllPintas($grid) {
    var $grid = $('.grid').masonry({
      columnWidth: 4,
    //   itemSelector: '.grid-item'
    });
    var promise = promiseAllPintas();
    promise.success(function(data) {
        for(var i = 0; i<data.length; i++)
        {
            getItemElement(data[i], function(elem){
                var elems = [elem];
                var $elems = $( elems );
                $grid.append( $elems ).masonry( 'appended', $elems );
                
            })
        }
    })

}

function promiseAllPintas() {
    return $.ajax({
        url: "/pintas-recent-get",
        type: "POST"
    });
}

function getItemElement(data, callback) {
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
    
    pintaImg.onload = function(){
        callback(pintaItem);
    }
}