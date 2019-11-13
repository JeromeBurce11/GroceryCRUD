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
        $("#formni").hide();
        $("#tableni").show();
    })
    $("#updateItems").click(function () {
        $("#tableni").hide();
        $("#formUpdate").show();
    })
    $('#notavai').hide();

    function search() {

        $.ajax({

            success: function () {
                $("#searchNisya").on("keyup", function () {
                    var value = $(this).val();
                    $("tbody tr").each(function () {
                        // if (index !== 0) {
                        $row = $(this);
                        var id = $row.find("td").text()
                        if (id.indexOf(value) == false) {
                            $('#notavai').show();
                        }
                        if (id.indexOf(value) !== 0) {

                            $row.hide();
                        }
                        else {
                            $('#notavai').hide();
                            $row.show();

                        }
                        // }
                    });
                });

            },
            error: function () {

                alert("Result Not Found");
                $("button").attr("disabled", false);
            }

        });
    }
    retrieveAll();
    search();

    // function searching(){
    //     $("#searchNisya").on("keyup", function () {
    //         var value = $(this).val();
    //         $("tbody tr").each(function () {
    //             // if (index !== 0) {
    //                 $row = $(this);
    //                 var id = $row.find("td").text()
    //                 if(id.indexOf(value)==false){
    //                     $('#notavai').show();
    //                 }
    //                 if (id.indexOf(value) !== 0) {

    //                    $row.hide();
    //                 }
    //                 else {   
    //                     $('#notavai').hide();
    //                     $row.show();

    //                 }
    //             // }
    //         });
    //     });
    // }
    // searching();
    // if($("#searchNisya").val()==''){
    //     retrieveAll();
    // }
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

                    $('tbody').append("<tr id=" + item[i].item + "><td id=" + item[i]._id + 'o' + ">" + item[i].item + "</td><td id=" + item[i]._id + 'b' + ">" + item[i].Author + "</td><td id=" + item[i]._id + 'a' + ">" + item[i].Quantity + "</td><td><button  id='updateBtn' data-toggle='modal' data-target='#myModalupdate' class='btn btn-outline-info'  DataId=" + item[i]._id + " >Update</button><button class='btn btn-outline-danger ' id='deleteBtn'>Delete</button></td></tr><br>");


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



    $("#addItems").on('click', function () {
        $.ajax({
            url: 'item/',
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

    // searching in the search bar
    // $("#btnsearch").on('click', function () {
    // var id = $('#searchNisya').val();
    // $("body").find().css({
    //     "display":"none"
    // })
    // $("tr").find(id).css({
    //     "display":"block"
    // })
    // console.log(id)
    //     var x = $('#searchNisya').val();
    //     console.log(x);
    //     $.ajax({
    //         url: '/items/search',
    //         type: "GET",
    //         data:JSON.stringify({x:x}),
    //         success: function (response) {
    //            console.log(response[5].item)
    //             // for (var a = 0; a < response.length; a++) {
    //             //     var book = response.item;
    //             //     if (book.toLowerCase().startsWith(x.toLowerCase())) {
    //             //         console.log(book);
    //             //         retrieveAll();
    //             //     }
    //             // }
    //         },
    //         // error: function (err) {
    //         //     console.log(err)
    //         // }
    //     });

    // })

    // $("#btnsearch").click(function () {

    //     for (i = 0; i < data.length; i++) {
    //         console.log(data[i].item , " == ", $('#searchNisya').val())
    //         console.log(data[i].item==$('#searchNisya').val())
    //         if(data[i].item==$('td').find($('#searchNisya').val())){
    //             console.log('yehey!!!')
    //         }
    //         if(data[i].item == $('#search').val()) {
    //             console.log("inside = "+data[i])
    //         }else{
    //             console.log("not")
    //         }

    //     }
    // })



})