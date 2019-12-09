 $(document).ready(function () {

     $('#notavai').hide();
     //  retrieveAll();
     $('input').val("");
     var id;
     $("#book").show();
     $("#formni").hide();
     $("#tableni").hide();
     $("#formUpdate").hide();
     $('#Borrowerstable').hide();

     $("#createbtn").click(function () {
         $("#book").show();
         $("#formni").hide();
         // $("#tableni").hide();
     })

     function viewbtn() {

         $("#viewbtn").click(function () {
             $("#searchNisya").val("");
             $("#book").hide();

             $("#tableni").show();
             $('tbody').empty();
             retrieveAll();
             $('#notavai').hide();
             $('#Borrowerstable').hide();

         })
     }
     viewbtn();
     $('#listofborrowerbtn').click(function () {
         $("#book").hide();
         $('#Borrowerstable').show();
         $("#tableni").hide();
         $('#borrowertbody').empty();
         retrieveAllBorrowers();

     })
     $("#addItems").click(function () {
         $("#formni").hide();
         $("#book").hide();
         $("#tableni").show();
     })
     $("#cancelbtnborrow").click(function () {
         // alert("mabuhay!")
         location.reload();
         $('#myModalborrow11').hide();
     })

     $("#cancelbtn").click(function () {
         $("#formni").hide();
         $("#tableni").hide();
         $('input').val("")
         $('#notavai').hide();

     })
     $("#updateItems").click(function () {
         $("#tableni").hide();
         $("#formUpdate").show();
     })
     $('thead').show();
     $('#notavai').hide();

     function search() {
         $("#searchNisya").on("keyup", function () {
             $('thead').hide();
             $("#book").hide();
             $("#tableni").show();
             viewbtn();
             var value = $(this).val();
             if (value == "") {
                 $('#notavai').hide();
                 $("#book").show();
                 // $("#tableni").hide();
             }
             $("tbody tr").each(function () {

                 $row = $(this);
                 var id = $row.find("td").text()
                 if (id.indexOf(value) !== 0) {

                     $row.hide();

                 } else {

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
     //it retrieve all the book items in the table.
     function retrieveAll() {
         $.ajax({
             url: '/item/retrieve/all',
             type: 'get',
             success: function (result) {
                 var item = result
                 data = item
                 for (var i = 0; i < item.length; ++i) {
                     $('#itemtbody').append("<tr id=" + item[i].item + "><td id=" + item[i]._id + 'o' + ">" + item[i].item + "</td><td id=" + item[i]._id + 'b' + ">" + item[i].Author + "</td><td id=" + item[i]._id + 'a' + ">" + item[i].Quantity + "</td><td><button class='btn btn-outline-info ' id='borrowBtn' data-toggle=modal data-target='#myModalborrow' type='button' DataId=" + item[i]._id + ">Borrow </button><button  id='updateBtn' data-toggle='modal' data-target='#myModalupdate' class='btn btn-outline-info'  DataId=" + item[i]._id + " >Update</button><button class='btn btn-outline-danger ' DataId=" + item[i]._id + " id='deleteBtn'>Delete</button></td></tr><br>");
                 }
             }
         })
     }

     function retrieveAllBorrowers() {
         $.ajax({
             url: '/borrower/retrieve/all',
             type: 'get',
             success: function (result) {
                 // console.log(result)
                 var item = result
                 data = item
                 for (var i = 0; i < item.length; ++i) {
                     $('#borrowertbody').append("<tr id=" + item[i]._id + "><td id=" + item[i].Borrower + 'o' + ">" + item[i].Borrower + "</td><td id=" + item[i]._id + 'b' + ">" + item[i].book + "</td><td id=" + item[i]._id + 'a' + ">" + item[i].Quantity + "</td><td><button class='btn btn-outline-danger ' DataId=" + item[i]._id + " id='returnBtn'>Return</button></td></tr><br>");
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
         $("#book").hide();
         $.ajax({
             url: 'item/create',
             type: "PUT",
             data: {
                 item: $('#item').val(),
                 Author: $('#Author').val(),
                 Quantity: $('#Quantity').val()
             },
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
             data: {
                 id: newId,
                 item: $('#updateitem').val(),
                 Author: $('#updateAuthor').val(),
                 Quantity: $('#updateQuantity').val(),
                 Priority: $('#updatePriority').val()
             },
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
         $('input').val("");
         id = $(this).attr("DataId");
         retrieveOneItemInTheBorrowModal($(this).attr("DataId") + "")

     })
     var QuantityUpdated;
     $("#BorrowItems").click(function () {
         $("#myModalborrow").hide();
         var newId = id;
         borrowQuantity = $('#noofbooks').val()
         var borrower = $('#Borrower').val()

         $.ajax({
             url: '/item/update1/' + newId,
             type: "PUT",
             data: {
                 id: newId,
                 borrowQuantity: -borrowQuantity,
                 borrower: borrower,
                 book: $('#itemborrowed').val()
             },
             success: function (result) {

                 // alert(result.Quantity)
                 console.log(result)
                 var newQuantity = result.Quantity - borrowQuantity;
                 // console.log(newQuantity)
                 $("#" + result._id + 'a').html(result.Quantity);
                 QuantityUpdated = newQuantity;
                 $("#tableni").show();
             },
             error: function (e) {
                 console.error(e)
             }
         })
         $('input').val("");

     })

     //saving the borrower in the history!
     // $(document).on('click', '#returnBtn', function () {
     //     id = $(this).attr("DataId");
     //     $.ajax({
     //         url: `/borrower/history/ `+id,
     //         data: 
     //         type: 'post',
     //         success: function (result) {
     //             alert(result)
     //         },
     //         error: function (e) {
     //             console.error(e)
     //         }
     //     })
     // })
     //returning the books in the library...
     $(document).on('click', '#returnBtn', function () {
         id = $(this).attr("DataId");
         $.ajax({
             url: '/item/return/' + id,
             type: 'get',
             success: function (result) {
                 alert(JSON.stringify(result))
                 // var data = result
                 $.ajax({
                     url: '/item/updateReturnBook/' + result.BookID,
                     type: "PUT",
                     data: {
                         id: result.BookID,
                         returnborrowQuantity: +result.Quantity,
                     },
                     success: function (result) {
                         // console.log(id)
                         // alert(JSON.stringify(result))
                         // console.log(JSON.stringify(result))
                         console.log(result)
                         swal("Successfully return!", "You clicked the button!", "success");
                         $(`table #${id}`).remove();
                         // window.location.reload();
                         $('tbody').empty();
                         retrieveAllBorrowers();
                     },
                     error: function (e) {
                         console.error(e)
                     },
                 })
                 $('input').val("");
             },
             error: function (e) {
                 console.error(e)
             }
         })


     })

     //ajax for delete 


     $(document).on('click', "#deleteBtn", (function () {
         var id = $(this).attr("Dataid");
         swal({
                 title: "Are you sure you want to delete this BOOK?",
                 icon: "warning",
                 buttons: true,
                 dangerMode: true,
             })
             .then(function (willDelete) {
                 if (willDelete) {
                     deleteItem();
                     swal("The book is remove in the list!", {
                         icon: "success",
                     });
                 } else {
                     swal("Book is not deleted!");
                 }
             });

         function deleteItem() {

             $.ajax({
                 url: '/item/delete',
                 type: 'Delete',
                 dataType: 'JSON',
                 data: {
                     id: id
                 },

                 success: function (result) {
                     console.log(result);
                     swal("Successfully deleted!", "You clicked the button!", "success");
                     $('#' + id).remove();
                     $('tbody').empty();
                     retrieveAll();
                 },
                 error: function (err) {
                     // alert(err)
                     console.log(err);
                 },
             });
         }
     }));

     // // searching in the search bar
     $("#btnsearch").on('click', function () {

         // console.log(id)
         var x = $('#searchNisya').val();

         // console.log(x);
         $.ajax({
             url: '/items/search',
             type: "GET",
             data: JSON.stringify({
                 x: x
             }),

             success: function (response) {
                 for (i = 0; i < response.length; i++) {
                     console.log(response[i].item == x);

                     if (response[i].item == x) {
                         swal("Book is available!", "You clicked the button!", "success");
                         break;
                     } else {
                         swal("Book is not available!", "You clicked the button!", "error");
                     }

                 }


             },

         });
         $("#searchNisya").val("");


     });
     $('#notavai').hide();
 });