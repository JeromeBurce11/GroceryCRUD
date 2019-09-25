$(document).ready(function () {
    $("button").click(function () {
        var rate = $(this).text();
        $.ajax({
            url: "/rate",
            data: { rate: rate, city: $('title').text() },
            success: function (data) {
                $('#ratings').text(data)
            },
            error: function (e) {

            }
        })
    });


});
