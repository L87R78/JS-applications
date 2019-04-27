// function attachEvents() {
//     const URL = 'https://baas.kinvey.com';
//     const userName = 'guest';
//     const password = 'pass';
//
//     const BASE_64 = btoa(userName + ':' + password);
//     const AUTH = {
//         'Content-type': 'application/json',
//         "Authorization": "Basic " + BASE_64
//     };
//
//
//     $('#getVenues').on('click', getValues);
//
//      function getValues() {
//         const infoDiv = $('#venue-info');
//         const inputDate = $('#venueDate').val();
//         const venueIds =  getAllVenues(inputDate);
//
//         const details =  Promise.all(venueIds.map(getVenuesDetails));
//
//         infoDiv.empty();
//         for (const venue of details) {
//             displayVenue(venue)
//         }
//
//         $('.info').on('click', function () {
//             if ($(this).parent().parent().find('.venue-details').css('display') === 'none') {
//                 $(this).parent().parent().find('.venue-details').show();
//             }
//             else {
//                 $(this).parent().parent().find('.venue-details').hide();
//             }
//         });
//         $('.purchase').on('click', purchaseTicket)
//
//     }
//
//     function displayVenue(venue) {
//         $('#venue-info').append($(`<div class="venue" id="${venue._id}">
//                           <span class="venue-name"><input class="info" type="button" value="More info">${venue.name}</span>
//                           <div class="venue-details" style="display: none;">
//                             <table>
//                               <tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>
//                               <tr>
//                                 <td class="venue-price">${venue.price} lv</td>
//                                 <td><select class="quantity">
//                                   <option value="1">1</option>
//                                   <option value="2">2</option>
//                                   <option value="3">3</option>
//                                   <option value="4">4</option>
//                                   <option value="5">5</option>
//                                 </select></td>
//                                 <td><input class="purchase" type="button" value="Purchase"></td>
//                               </tr>
//                             </table>
//                             <span class="head">Venue description:</span>
//                             <p class="description">${venue.description}</p>
//                             <p class="description">Starting time: ${venue.startingHour}</p>
//                           </div>
//                         </div>
//                     `))
//
//
//     }
//
//     function showInfo() {
//         $('.venue-details').hide();
//         $(this).parent().parent().find('.venue-details').show();
//     }
//
//     function getAllVenues(inputDate) {
//         return $.ajax({
//             method: "POST",
//             url: URL + `/rpc/kid_BJ_Ke8hZg/custom/calendar?query=${inputDate}`,
//             headers: AUTH
//         }).then(function () {
//
//         }).catch(function (err) {
//             return console.log("errorrrrr")
//         })
//     }
//
//     function getVenuesDetails(venueId) {
//         return $.ajax({
//             method: "GET",
//             url: URL + `/appdata/kid_BJ_Ke8hZg/venues/${venueId}`,
//             headers: AUTH
//         })
//     }
//
//     function purchaseTicket() {
//         let id = $(this).parent().parent().parent().parent().parent().parent().attr('id');
//         let name = $(this).parent().parent().parent().parent().parent().parent().find(".venue-name").text();
//         let qty = Number($(this).parent().parent().find(".quantity").val());
//         let price = $(this).parent().parent().children()[0].textContent;
//         let test = price.slice(0, price.length- 3);
//         price = Number(test);
//
//         console.log(id);
//         console.log(qty);
//
//         $('#venue-info').html($(`<span class="head">Confirm purchase</span>
//                     <div class="purchase-info">
//                       <span>${name}</span>
//                       <span>${qty} x ${price}</span>
//                       <span>Total: ${qty * price} lv</span>
//                       <input type="button" value="Confirm">
//                     </div>
//                     `));
//         $('.purchase-info input').on('click', function () {
//             $.ajax({
//                 method: "POST",
//                 url: URL + `/rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${id}&qty=${qty}`,
//                 headers: AUTH
//             }).then(function (data) {
//                 $('#venue-info').html("You may print this page as your ticket" + data.html);
//             })
//         });
//     }
// }

////----------------------------------solve02

function attachEvents() {
    const URL = 'https://baas.kinvey.com';
    const userName = 'guest';
    const password = 'pass';

    const BASE_64 = btoa(userName + ':' + password);
    const AUTH = {
        'Content-type': 'application/json',
        "Authorization": "Basic " + BASE_64
    };

    $('#getVenues').on('click', function () {
        let inputDate = $('#venueDate').val();
        $.ajax({
            method: 'POST',
            url: URL + `/rpc/kid_BJ_Ke8hZg/custom/calendar?query=${inputDate}`,
            headers: AUTH
        }).then(function (arr) {
            for (const id of arr) {
                $.ajax({
                    method: 'GET',
                    url: URL + `/appdata/kid_BJ_Ke8hZg/venues/${id}`,
                    headers: AUTH
                }).then(function (resultId) {
                    $('#venue-info').append(`<div class="venue" id="${resultId._id}">
                          <span class="venue-name"><input class="info" type="button" value="More info">${resultId.name}</span>
                          <div class="venue-details" style="display: none;">
                            <table>
                              <tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>
                              <tr>
                                <td class="venue-price">${resultId.price} lv</td>
                                <td><select class="quantity">
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select></td>
                                <td><input class="purchase" type="button" value="Purchase"></td>
                              </tr>
                            </table>
                            <span class="head">Venue description:</span>
                            <p class="description">${resultId.description}</p>
                            <p class="description">Starting time: ${resultId.startingHour}</p>
                          </div>
                        </div>`);


                }).catch(function (err) {
                    console.log(err.statusText)
                });

            }
            $(document).on('click','.venue-name',function(e){
                $(this).parent().find('.venue-details').css('display','block');

                $('.purchase').on('click', function () {
                    let currentId = $(this).parent().parent().parent().parent().parent().parent()[0].id;
                    let qty = Number($('.quantity option:selected').eq(2).val());  // .val();

                    $.ajax({
                        method: 'GET',
                        url: URL + `/appdata/kid_BJ_Ke8hZg/venues/${currentId}`,
                        headers: AUTH
                    }).then(function (res) {
                        $('#venue-info').append(`<span class="head">Confirm purchase</span>
                            <div class="purchase-info">
                              <span>${res.name}</span>
                              <span>${qty} x ${res.price}</span>
                              <span>Total: ${qty * res.price} lv</span>
                              <input type="button" value="Confirm">
                            </div>`)
                    })
                })
            });

        }).catch(function (err) {
            console.log(err.statusText)
        })
    });

}































