$( document ).ready(function() {
    rect = "<div id = rect> </div>"
    rect = $("#content").append(rect)

    rect.mouseover(function(){
        rect.remove()
    })


});
