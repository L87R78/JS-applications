function viewAllCars(cars) {
    for (let car of cars) {
        let acl = car._acl;
        let test = acl.creator
        if (acl.creator === sessionStorage.getItem("userId")) { //това е за моите коли
            let classListing = $('<div class="listing">');
            classListing.append($(`<p>${car.tittle}</p>`));
            classListing.append($(`<img src=${car.imageUrl}>`));
            classListing.append($(`<h2>Brand: ${car.brand}</h2>`));

            let divClassInfo = $('<div class="info">');

            let divIdDataInfo = $('<div id="data-info">');
            divIdDataInfo.append($(`<h3>Seller: ${car.name}</h3>`));
            divIdDataInfo.append($(`<h3>Fuel: ${car.fuelType}</h3>`));
            divIdDataInfo.append($(`<h3>Year: ${car.year}</h3>`));
            divIdDataInfo.append($(`<h3>Price: ${car.price} $</h3>`));

            let dataButton = $('<div id="data-buttons">');
            let ul = $('<ul></ul>');
            let buttonDetails = $('<li class="action"><a href="#" class="button-carDetails">Details</a></li>').on('click', function () {
                console.log("details")
            });
            let buttonEdit = $('<li class="action"><a href="#" class="button-carDetails">Edit</a></li>').on('click', function () {
                console.log("edit")
            });
            let buttonDelete = $('<li class="action"><a href="#" class="button-carDetails">Delete</a></li>').on('click', function () {
                console.log("delete");
                let id = car._id;
                kinvyRequester.removeCar(id);
                $(this).parent().parent().remove();

            });
            ul.append(buttonDetails);
            ul.append(buttonEdit);
            ul.append(buttonDelete);
            dataButton.append(ul);

            divClassInfo.append(divIdDataInfo);
            divClassInfo.append(dataButton);
            classListing.append(divClassInfo);
            $('#listings').append(classListing);

        } else {                                              //за чуждите коли
            let classListing = $('<div class="listing">');
            classListing.append($(`<p>${car.tittle}</p>`));
            classListing.append($(`<img src=${car.imageUrl}>`));
            classListing.append($(`<h2>Brand: ${car.brand}</h2>`));

            let divClassInfo = $('<div class="info">');

            let divIdDataInfo = $('<div id="data-info">');
            divIdDataInfo.append($(`<h3>Seller: ${car.name}</h3>`));
            divIdDataInfo.append($(`<h3>Fuel: ${car.fuelType}</h3>`));
            divIdDataInfo.append($(`<h3>Year: ${car.year}</h3>`));
            divIdDataInfo.append($(`<h3>Price: ${car.price} $</h3>`));


            let dataButton = $('<div id="data-buttons">');
            let ul = $('<ul></ul>');
            let buttonDetails = $('<li class="action"><a href="#" class="button-carDetails">Details</a></li>').on('click', function () {
                console.log("details")
                renderNoMyDetailsCars(car)
            });
            ul.append(buttonDetails);
            dataButton.append(ul);

            divClassInfo.append(divIdDataInfo);
            divClassInfo.append(dataButton);
            classListing.append(divClassInfo);
            $('#listings').append(classListing);
        }
    }
}

function viewMyCars(cars) {
    $('#myListings > div').remove();
    $('#myListings').show();
    $('#myListings').trigger("click")
    for (let car of cars) {
        let myListings = $('<div class="my-listing">');

        let listingProps = $('<div class="listing-props">');
        listingProps.append($(`<h2>Brand: ${car.brand}</h2>`));
        listingProps.append($(`<h3>Model: ${car.model}</h3>`));
        listingProps.append($(`<h3>Year: ${car.year}</h3>`));
        listingProps.append($(`<h3>Price: ${car.price}</h3>`));

        let myListingsButtons = $('<div class="my-listing-buttons">');
        let buttonDetails = $('<a href="#" class="my-button-list">Details</a>').on('click', function () {
            console.log("details")
        });
        let buttonEdit = $('<a href="#" class="my-button-list">Edit</a>').on('click', function () {
            console.log("edit");
            renderEditMyCars(car);
        });
        let buttonDelete = $('<a href="#" class="my-button-list">Delete</a>').on('click', function () {
            console.log("delete");
            let id = car._id;
            kinvyRequester.removeInMyCarListing(id);
            $(this).parent().parent().remove();
        });
        myListingsButtons.append(buttonDetails);
        myListingsButtons.append(buttonEdit);
        myListingsButtons.append(buttonDelete);

        myListings.append($(`<p id="listing-title">${car.tittle}</p>`));
        myListings.append($(`<img src=${car.imageUrl}>`));
        myListings.append(listingProps);
        myListings.append(myListingsButtons);

        $('#myListings').append(myListings);
    }
}


function testRenderMyCars(car) {
    $('#myListings > div').remove();
    $('#myListings').show();

        let myListings = $('<div class="my-listing">');

        let listingProps = $('<div class="listing-props">');
        listingProps.append($(`<h2>Brand: ${car.brand}</h2>`));
        listingProps.append($(`<h3>Model: ${car.model}</h3>`));
        listingProps.append($(`<h3>Year: ${car.year}</h3>`));
        listingProps.append($(`<h3>Price: ${car.price}</h3>`));

        let myListingsButtons = $('<div class="my-listing-buttons">');
        let buttonDetails = $('<a href="#" class="my-button-list">Details</a>').on('click', function () {
            console.log("details")
        });
        let buttonEdit = $('<a href="#" class="my-button-list">Edit</a>').on('click', function () {
            console.log("edit");
            renderEditMyCars(car);
        });
        let buttonDelete = $('<a href="#" class="my-button-list">Delete</a>').on('click', function () {
            console.log("delete");
            let id = car._id;
            kinvyRequester.removeInMyCarListing(id);
            $(this).parent().parent().remove();
        });
        myListingsButtons.append(buttonDetails);
        myListingsButtons.append(buttonEdit);
        myListingsButtons.append(buttonDelete);

        myListings.append($(`<p id="listing-title">${car.tittle}</p>`));
        myListings.append($(`<img src=${car.imageUrl}>`));
        myListings.append(listingProps);
        myListings.append(myListingsButtons);

        $('#myListings').append(myListings);

}
function renderEditMyCars(car) {
    hideAllLinks();

    $('#edit-listing').show();
    let id = $('#edit-listing').attr('userId', car._id);

    $('#edit-listing input[name=title]').val(car.tittle);
    $('#edit-listing input[name=description]').val(car.description);
    $('#edit-listing input[name=brand]').val(car.brand);
    $('#edit-listing input[name=model]').val(car.model);
    $('#edit-listing input[name=year]').val(car.year);
    $('#edit-listing input[name=imageUrl]').val(car.imageUrl);
    $('#edit-listing input[name=fuelType]').val(car.fuelType);
    $('#edit-listing input[name=price]').val(car.price);

    $('#edit-listing').on('submit', async function (event) {
        event.preventDefault();

        let id = $('#edit-listing').attr("userId");
        let name = car.name;

        let tittle = $('#edit-listing input[name=title]').val();
        let description = $('#edit-listing input[name=description]').val();
        let brand = $('#edit-listing input[name=brand]').val();
        let model = $('#edit-listing input[name=model]').val();
        let year = $('#edit-listing input[name=year]').val();
        let imageUrl = $('#edit-listing input[name=imageUrl]').val();
        let fuelType = $('#edit-listing input[name=fuelType]').val();
        let price = $('#edit-listing input[name=price]').val();
         kinvyRequester.testEditMyCars(name, id, tittle, description, brand, model, year, imageUrl, fuelType, price);
         hideAllLinks();
    })
}
function renderNoMyDetailsCars(car) {
    hideAllLinks();
  $('#listDetails').show()
    $('.my-listing-details').empty()

    // let classListing = $('<div class="my-listing-details">');
    // classListing.append();
    // classListing.append();

    let listingProps = $('<div class="listing-props">');
    listingProps.append($(`<h2>Brand: ${car.brand}</h2>`));
    listingProps.append($(`<h3>Model: ${car.model}</h3>`));
    listingProps.append($(`<h3>Model: ${car.fuelType}</h3>`));
    listingProps.append($(`<h3>Year: ${car.year}</h3>`));
    listingProps.append($(`<h3>Price: ${car.price} $</h3>`));

    $('.my-listing-details').append($(`<p id="auto-title">${car.tittle}</p>`));
    $('.my-listing-details').append($(`<img src=${car.imageUrl}>`));

    $('.my-listing-details').append(listingProps);

    $('.my-listing-details').append($(`<p id="description-title">Description</p>`));
    $('.my-listing-details').append($(`<p id="description-para">${car.description}</p>`));
    $('#listDetails').append( $('.my-listing-details'));
}

