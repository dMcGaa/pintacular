$(document).ready(function() {
    $( "#img-url" ).change(function() {
        var imgUrl = $("#img-url").val();
        if(imgUrl == ""){
            $("#img-preview").attr("src", "/images/placeholder-400x400.png");
        }
        else{
            $("#img-preview").attr("src", $("#img-url").val());
        }
        // $('#img-preview').fadeOut(400,function(){
        //     $(this).fadeIn(400);
        // });
    });
    $( "#img-preview" ).load(function() {
        // alert("Dimensions: " + this.width + " " + this.height);
    });
})