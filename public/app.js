$(document).ready(function(){

    $("#save-article").on("click", event =>{
        //event.preventDefault();

        //grab the article stats 
        let title = $("#title").text().trim();
        let link= $("#link").attr("href");
        let summary= $("#summary").text().trim();


        // puts the stats in an object
        const articleObject= {
            title: title,
            link: link,
            summary: summary
        }

        console.log(articleObject);
        $.ajax('/api/articles', {
            type: 'POST',
            data: articleObject
        }).then(
            function() {
                alert("article saved");
            }
          );
    })

    // Back button 
    $("#goback").on("click", event => {
        event.preventDefault();
        window.location.href = "/";
    })

    // form button 
    $("#go-to-form").on("click", event => {
        event.preventDefault();
        window.location.href = "/form";
    })

    // deletes a character
    $(".delete-char").on("click", function(event) {
        event.preventDefault();
        var id = $(this).data("id");
        console.log(id);
        $.ajax('/api/characters/' + id, {
            type: 'DELETE',
            data: id
        }).then(function(){
            window.location.href = "/";
        })
    });
});
