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
    // for some reason using ES6 causes the id to come back undefined.  event => breaks it. I have no idea why, but I know that is the cause of the jQuery issue. 
    $(".delete-article").on("click", function(event) {
        //event.preventDefault();
        var id = $(this).data("id");
        console.log(id);
        $.ajax('/api/articles/' + id, {
            type: 'DELETE',
            data: id
        }).then(function(){
            window.location.href = "/";
        })
    });

        // Display comments
        $(".display-comments").on("click", function(event) {
            // event.preventDefault();
           let id = $(this).data("id");
           console.log(id);
           $.ajax('/api/articles/' + id, {
               type: 'GET',
               data: id
           }).then(function(data){
               // for some reason the comments come back as an index of 0 in the data objects
               console.log(data[0].comments[1].body);
               if(data[0].comments[0]){
                   data[0].comments.forEach(function(element){
                       console.log(element);
                       let comment = "<div class = 'card'><div class = 'card card-header'>"
                       +element.title +"</div>"+
                       "<div class = card card-body>"
                       +element.body + 
                       "<button class = 'delete-comment' data-id = " + element._id + ">X</button>" +
                       "</div></div>"
                       $("#comments-body").prepend(comment);

                   });
               } else {
                   console.log("no comments in this one");
               }
   
           }).then(function(data){
            $(".delete-comment").on("click", function(event){
                console.log("yeah");
                 // event.preventDefault();
                 let id = $(this).data("id");
                 console.log(id);
                 $.ajax('/api/comments/' + id, {
                     type: 'DELETE',
                     data: id
                 }).then(function(data){
                     window.location.href = "/";
                 });
     
            })
           })
       })



       $("#post-comment").on("click", function(event){
           event.preventDefault();
           let id = $(this).data("id");
           let title = $("#comment-title").val().trim();
           let body = $("#comment-content").val().trim();
           console.log(id);
           console.log(title);
           console.log(body);
           commentObject = {
               title: title,
               body: body
           }
           $.ajax("/api/articles/" + id, {
               type: 'POST',
               data: commentObject
           })
       });

       
});
