function renderMyApp(app) {
    $('#viewAds > div').remove();
    for (let ap of app) {
        //console.log(ap);

        let mainDiv = $('<div class="flight-ticket"></div>');
        mainDiv.append(`<div class="flight-left">
         <img src="${ap.image}" alt=""></div>`);
        let innerDiv = $(`<div class="flight-right"></div>`);
        innerDiv.append(`<div><h3>${ap.destination}</h3><span>${ap.departureDate}</span></div>
                <div>
                    from ${ap.origin} <span>${ap.departureTime}</span>
                </div>
                <p>${ap.seats} Seats (${app.price}$ per seat) </p>`);

        innerDiv.append($(`<a href="#" class="remove">REMOVE</a>`).on('click', function () {
            let id = flight._id;
            //kinvyRequester.removeFlight(id);
            $(this).parent().parent().remove();
        }));
        innerDiv.append($(`<a href="#" class="details">Details</a>`).on('click', function () {
            //renderDetailsView(flight)
        }));
        mainDiv.append(innerDiv);
        $('#viewAds').append(mainDiv);
    }
}