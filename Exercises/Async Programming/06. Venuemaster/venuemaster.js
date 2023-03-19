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
