$(document).ready(function() {
    
    $("#1").on('click', function() {
        transfer("1");
    });

    $("#2").on('click', function() {
        transfer("2");
    });

    $("#3").on('click', function() {
        transfer("3");
    });

    $("#4").on('click', function() {
        transfer("4");
    });

    $("#5").on('click', function() {
        transfer("5");
    });
});
function transfer(x) {   
    var pathname = window.location.pathname;
        $.ajax({
            url: 'http://127.0.0.1:8080' + pathname,
            crossDomain: 'true',
            data: JSON.stringify({
                rate: x,
            }),
            type: 'POST',
            success: function(response) {
                console.log("rated");

            },
            error: function(err) {


            }
        })
}