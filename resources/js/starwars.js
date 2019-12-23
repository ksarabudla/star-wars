$(document).ready(function() {
    $( '#infoi' ).click( function() {
        $( "#questions").toggle();
        if ($('#questions').css('display') == 'block') {
            $('#infoi').attr('class', 'infoihover');
            showLoadingDots();
            FindAnswers();
        }else{
            $('#infoi').attr('class', '');
            for(var i=1;i<=4;i++){
                $("#answer"+i).html('Loading<span class="loadingDots"></span>');
            }
        }

    });
});

var showLoadingDots = function() {
    if (!$(".loadingDots").length>0) return false;
    var showDots = setInterval(function(){
        $( ".loadingDots" ).each(function( index ) {
            $( this ).text().length >= 3 ? $( this ).text('') : $( this ).append('.');
        });
    },1000);
}

/**
 *
 * @FindAnswers for the Star war Questions
 */
function FindAnswers(){
    $.ajax({
        url: "starWarsbackend/starwarsapi.php",
        method: "POST",
        data: {findanswers: true},
        dataType : 'json',
        success: function(result) {
            console.log(result);
            if (result.errors){
                for(var i=1;i<=4;i++){
                    $("#answer"+i).html(result.errors);
                }
            }
            $("#answer1").html(result.firstAnswer);
            $("#answer2").html(result.secondAnswer);
            $("#answer3").html(result.thirdAnswer);
            $("#answer4").html(result.fourthAnswer);
        },
        error: function(xhr) {
            var error = "An error occured. API is not reachable.";
            for(var i=1;i<=4;i++){
                $("#answer"+i).html(error);
            }
        }
    });
}