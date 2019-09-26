$(document).ready(function () {
    $("button").click(function () {
        console.log( $('title').text())
        var rate = $(this).text();
        $.ajax({
            url: "/rate",
            data: { rate: rate, city: $('title').text() },
            success: function (data) {
                $('#ratings').text(data)
            },
        })
    });


});
