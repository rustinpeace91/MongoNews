$(document).ready(function(){

    $("#submit").on("click", event =>{
        event.preventDefault();

        //grab the character stats from the form
        let name = $("#char-name").val().trim();
        let parry = $("#char-parry").val().trim();
        let toughness = $("#char-toughness").val().trim();
        let skills = $("#char-skills").val().trim();
        let weapons = $("#char-weapons").val().trim();
        let other = $("#char-other").val().trim();

        // puts the stats in an object
        const charObject = {
            name: name,
            parry: parry,
            toughness: toughness,
            skills: skills,
            weapons: weapons,
            other: other
        }
        $.ajax('/api/characters', {
            type: 'POST',
            data: charObject
        }).then(
            function() {
                //empties the form and reloads the page
              alert("created new character");
              $("#char-name").val("");
              $("#char-parry").val("");
              $("#char-toughness").val("");
              $("#char-skills").val("");
              $("#char-weapons").val("");
              $("#char-other").val("");
              
              location.reload();
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
