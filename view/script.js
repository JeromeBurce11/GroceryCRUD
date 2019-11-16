$(document).ready(function () {
    $('#notavai').hide();
    //  retrieveAll();
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
        location.reload();
    })
    
    $("#cancelbtn").click(function () {
        $("#formni").hide();
        $("#tableni").show();
    })
    $("#updateItems").click(function () {
        $("#tableni").hide();
        $("#formUpdate").show();
    })
    $('#notavai').hide();
    function search() {
        $("#searchNisya").on("keyup", function () {
            var value = $(this).val();
            if (value == "") {
                $('#notavai').hide();
            }
            $("tbody tr").each(function () {
                $row = $(this);
                var id = $row.find("td").text()
                if (id.indexOf(value) !== 0) {
                    $('thead').hide();

                    $row.hide();
                }
                else {
                    $('thead').show();
                    $row.show();
                }
            });
        });

    }

    retrieveAll();
    search();
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

    $('input').val("");



    //addRowFunction
    function addRow(data) {
        $('tbody').append("<tr id=" + result[i]._id + "  ><td>" + result[i].item + "</td><td>" + result[i].Author + "</td><td>" + result[i].Quantity + "</td><td><button  data-toggle='modal' data-target='#myModalupdate' class='btn btn-outline-info' DataId=" + result[i]._id + ">Update</button><button class='btn btn-outline-danger ' id='deleteBtn'>Delete</button></td></tr>" + "<br>")
    }

    var data = []
    function retrieveAll() {
        $.ajax({
            url: '/item/retrieve/all',
            type: 'get',
            success: function (result) {
                var item = result

                data = item
                for (var i = 0; i < item.length; ++i) {
                    $('tbody').append("<tr id=" + item[i].item + "><td id=" + item[i]._id + 'o' + ">" + item[i].item + "</td><td id=" + item[i]._id + 'b' + ">" + item[i].Author + "</td><td id=" + item[i]._id + 'a' + ">" + item[i].Quantity + "</td><td><button class='btn btn-outline-info ' id='borrowBtn' data-toggle=modal data-target='#myModalborrow' type='button' DataId=" + item[i]._id + ">Borrow </button><button  id='updateBtn' data-toggle='modal' data-target='#myModalupdate' class='btn btn-outline-info'  DataId=" + item[i]._id + " >Update</button><button class='btn btn-outline-danger ' DataId=" + item[i]._id + " id='deleteBtn'>Delete</button></td></tr><br>");
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
                $('#updateitem').val(result.item)
                $('#updateAuthor').val(result.Author)
                $('#updateQuantity').val(result.Quantity)
            },
            error: function (e) {
                console.error(e)
            }
        })
    }
    function retrieveOneItemInTheBorrowModal(DataId) {
        $.ajax({
            url: '/item/retrieve/' + DataId + '',
            type: 'get',
            success: function (result) {
                $('#itemborrowed').val(result.item)
                $('#availableitem').val((result.Quantity).toString())
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
        id = $(this).attr("DataId");
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
    // items show in the modal of the borrower template 

    $(document).on('click', '#borrowBtn', function (e) {
        e.preventDefault(e);
        $("#tableni").hide();
        id = $(this).attr("DataId");
        retrieveOneItemInTheBorrowModal($(this).attr("DataId") + "")
       
    })
    $("#BorrowItems").click(function () {
        $("#myModalborrow").hide();
        var newId = id;
        $.ajax({
            url: '/item/update/' + newId,
            type: "PUT",
            data: { id: newId,  borrowQuantity: $('#noofbooks').val() },
            success: function (result) {
                console.log(result)
                var newQuantity = result.Quantity-borrowQuantity;
                console.log(newQuantity)
                $("#" + result._id + 'a').html(newQuantity);
                $("#tableni").show();
            },
            error: function (e) {
                console.error(e)
            }

        })
    })

    //ajax for delete button
    $(document).on('click', "#deleteBtn", (function () {
        var id = $(this).attr("Dataid")
        $.ajax({
            url: '/item/delete',
            type: 'Delete',
            dataType: 'JSON',
            data: { id: id },

            success: function (result) {
                console.log(result)
                swal("Successfully deleted!", "You clicked the button!", "success");
                $('#' + id).remove();
                $('tbody').empty();
                retrieveAll();
            },
            error: function (err) {
                // alert(err)
                console.log(err)
            },
        })
    }))

    // searching in the search bar
    $("#btnsearch").on('click', function () {
        console.log(id)
        var x = $('#searchNisya').val();
        console.log(x);
        $.ajax({
            url: '/items/search',
            type: "GET",
            data: JSON.stringify({ x: x }),
            success: function (response) {
                for (i = 0; i < response.length; i++) {
                    console.log(response[i].item)
                    if (response[i].item == x) {

                        $('tbody').append("<tr id=" + response[i]._id + "  ><td>" + response[i].item + "</td><td>" + response[i].Author + "</td><td>" + response[i].Quantity + "</td><td><button  data-toggle='modal' data-target='#myModalupdate' class='btn btn-outline-info' DataId=" + response[i]._id + ">Update</button><button class='btn btn-outline-danger ' id='deleteBtn'>Delete</button></td></tr>" + "<br>")
                    }
                    else {
                        $('thead').hide();
                        $('#notavai').show();


                    }
                }


            },

        });

    })

})