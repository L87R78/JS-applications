function renderHomeView(flights) {
    for (const flight of flights) {
        let a = $(`<a href="#" class="added-flight"></a>`).on('click', function () {
            renderDetailsView(flight)
        });
        a.append($(`<img src="${flight.img}" alt=\"\" class=\"picture-added-flight\">`));
        a.append($(`<h3>${flight.origin}</h3>`));
        a.append($(`<span>from ${flight.destination}}</span><span>${flight.departureDate}</span>`));
        $('#viewCatalog > div').append(a)
    }
}

function renderDetailsView(flight) {
    hideAllViews();
    $('#viewFlightDetails').show();
    $('#viewFlightDetails').empty();

    let divTicketAreaLeft = $(`<div class="ticket-area"></div>`);
    divTicketAreaLeft.append($(`<div class="ticket-area-left"><img src="${flight.img}" alt=""></div>`));

    let divTicketAreaRigth = $(`<div class="ticket-area-right"></div>`);
    divTicketAreaRigth.append($(`<h3>${flight.destination}</h3><div>${flight.origin}</div>`));

    let divTicketTime = $(`<div class="data-and-time">${flight.departureDate} ${flight.departureTime}</div>`);

    if (sessionStorage.getItem("userId") === flight._acl.creator) {
        divTicketTime.append($(`<a href="#" class="edit-flight-detail"></a>`).on('click', function () {
            renderEditFlight(flight)
        }));
    }

    divTicketAreaRigth.append(divTicketTime);
    divTicketAreaRigth.append($(`<div>${flight.seats} Seats (${flight.cost} per seat)</div>`));
    divTicketAreaLeft.append(divTicketAreaRigth);

    $('#viewFlightDetails').append(divTicketAreaLeft);
}

function renderEditFlight(flight) {
    hideAllViews();
    $('#viewEditFlight').show();
    $('#viewEditFlight').attr('flightId', flight._id);
    $('#formEditFlight > input[name=destination]').val(flight.destination);
    $('#formEditFlight > input[name=origin]').val(flight.origin);
    $('#formEditFlight > input[name=departureDate]').val(flight.departureDate);
    $('#formEditFlight > input[name=departureTime]').val(flight.departureTime);
    $('#formEditFlight > input[name=seats]').val(flight.seats);
    $('#formEditFlight > input[name=cost]').val(flight.cost);
    $('#formEditFlight > input[name=img]').val(flight.img);
    $('#formEditFlight > input[type=checkbox]').val(flight.isCheckBox);
}

function renderMyFlights(flights) {
    $('#viewMyFlights > div').remove();
    for (let flight of flights) {
        let mainDiv = $('<div class="flight-ticket"></div>');
        mainDiv.append(`<div class="flight-left">
         <img src="${flight.img}" alt=""></div>`);
        let innerDiv = $(`<div class="flight-right"></div>`);
        innerDiv.append(`<div><h3>${flight.destination}</h3><span>${flight.departureDate}</span></div>
                <div>
                    from ${flight.origin} <span>${flight.departureTime}</span>
                </div>
                <p>${flight.seats} Seats (${flight.cost}$ per seat) </p>`);

        innerDiv.append($(`<a href="#" class="remove">REMOVE</a>`).on('click', function () {
            let id = flight._id;
            kinvyRequester.removeFlight(id);
            $(this).parent().parent().remove();
        }));
        innerDiv.append($(`<a href="#" class="details">Details</a>`).on('click', function () {
            renderDetailsView(flight)
        }));
        mainDiv.append(innerDiv);
        $('#viewMyFlights').append(mainDiv)
    }
}