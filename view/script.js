$(document).ready(function () {



    retrieveAll();
    var id;
    $("#formni").hide();
    $("#formUpdate").hide();
    $("#createbtn").click(function () {
        $("#formni").show();
        $("#tableni").hide();
    })
    $("#addItems").click(function () {
        $("#formni").hide();
        $("#tableni").show();
    })
    $("#cancelbtn").click(function () {
        $("#formni").hide();
        $("#tableni").show();
    })
    $("#updateItems").click(function () {
        $("#tableni").hide();
        $("#formUpdate").show();
    })

    $('#addItems').prop('disabled', 'disabled');
    $('#Author').prop('disabled', 'disabled');
    $('#Quantity').prop('disabled', 'disabled');

    $('input').on("keyup", function () {
        // e.preventDefault();
        if ($('#item').val() <= 0) {
            $('#Author').prop('disabled', 'disabled');
            $('#Quantity').prop('disabled', 'disabled');
            $('#Priority').prop('disabled', 'disabled');
        } else {
            $('#Author').prop('disabled', false);
        }
        if ($('#Author').val() <= 0) {
            $('#Quantity').prop('disabled', 'disabled');
            $('#Priority').prop('disabled', 'disabled');
        } else {
            $('#Quantity').prop('disabled', false);
        }


        if ($('#item').val() <= 0 || $('#Quantity').val() <= 0 || $('#Priority').val() <= 0) {
            $('#addItems').prop('disabled', 'disabled');
        } else {
            $('#addItems').prop('disabled', false);
        }
    })

    $('input').val(" ");


    //addRowFunction
    function addRow(data) {
        $('tbody').append("<tr id=" + result[i]._id + "  ><td>" + result[i].item + "</td><td>" + result[i].Author + "</td><td>" + result[i].Quantity + "</td><td><button  data-toggle='modal' data-target='#myModalupdate' class='btn btn-outline-info' DataId=" + result[i]._id + ">Update</button><button class='btn btn-outline-danger ' id='deleteBtn'>Delete</button></td></tr>" + "<br>")
    }


    function retrieveAll() {
        $.ajax({
            url: '/item/retrieve/all',
            type: 'get',
            success: function (result) {
                var item = result
                for (var i = 0; i < item.length; ++i) {
                    $('tbody').append("<tr id=" + item[i]._id + "><td id=" + item[i]._id + 'o' + ">" + item[i].item + "</td><td id=" + item[i]._id + 'b' + ">" + item[i].Author + "</td><td id=" + item[i]._id + 'a' + ">" + item[i].Quantity + "</td><td><button  id='updateBtn' data-toggle='modal' data-target='#myModalupdate' class='btn btn-outline-info'  DataId=" + item[i]._id + " >Update</button><button class='btn btn-outline-danger ' id='deleteBtn'>Delete</button></td></tr><br>");


                }
            }
        })
    }

    //retrieve specific item
    function retrieveOneItem(DataId) {
        $.ajax({
            url: '/item/retrieve/' + DataId + '',
            type: 'get',
            success: function (result) {
                console.log(result)
                $('#updateitem').val(result.item)
                $('#updateAuthor').val(result.Author)
                $('#updateQuantity').val(result.Quantity)
            },
            error: function (e) {
                console.error(e)
            }
        })
    }




    $("#addItems").on('click', function () {
        $.ajax({
            url: 'item/create',
            type: "PUT",
            data: { item: $('#item').val(), Author: $('#Author').val(), Quantity: $('#Quantity').val() },
            success: function (result) {
                $('tbody').empty();
                retrieveAll();
                swal("Successfully added!", "You clicked the button!", "success");
                $('input').val('');
                // window.location.reload();
            },
            error: function (e) {
                console.log(e);
            }
        })
    })


    $(document).on('click', '#updateBtn', function (e) {
        e.preventDefault(e);
        $("#tableni").hide();
        $("#myModalupdate").show();
        // $("#myModalupdate").attr("hidden", false);
        id = $(this).attr("DataId");

        // alert(id)

        retrieveOneItem($(this).attr("DataId") + "")
    })

    $(document).on('click', '#updateItems', function (e) {
        e.preventDefault(e);
        $("#formUpdate").hide();

    })

    $("#updateItems").click(function () {
        var newId = id;
        $.ajax({
            url: '/item/update/' + newId,
            type: "PUT",
            data: { id: newId, item: $('#updateitem').val(), Author: $('#updateAuthor').val(), Quantity: $('#updateQuantity').val(), Priority: $('#updatePriority').val() },
            success: function (result) {

                $("#" + result._id + 'o').html(result.item);
                $("#" + result._id + 'b').html(result.Author);
                $("#" + result._id + 'a').html(result.Quantity);

                $("#tableni").show();
            },
            error: function (e) {
                console.error(e)
            }

        })
    })
    $(document).on('click', "#deleteBtn", (function () {
        // console.log("1")
        var id = $(this).closest("tr").attr("id")
        $.ajax({
            url: '/item/delete',
            type: 'Delete',
            dataType: 'JSON',
            data: { id: id },
            error: function (err) {
                // alert(err)
                console.log(err)
            },
            success: function (result) {
                console.log(result)
                swal("Successfully deleted!", "You clicked the button!", "success");
                $('#' + id).remove();
            }
        })
    }))

})