function showHideLinks() {

    hideAllLinks();

    if (sessionStorage.getItem('authToken')) { //ако има user
        console.log("има user");
        $('#linkFlights').show();
        $('#linkLogout').show();
    } else {
        console.log("няма user");
        $('#linkLogin').show();     // ако няма reg user
        $('#linkRegister').show();
        hideAllViews();
    }
}

function hideAllLinks() {
    //$('#linkHome').hide();
    $('#linkFlights').hide();
    $('#linkLogin').hide();
    $('#linkRegister').hide();
    $('#linkLogout').hide();
}

//-----------------------------------------------------------
async function showHomeView() {
    $('#linkLogout > span').text("Welcome, " + sessionStorage.getItem('username') + "!");

    hideAllViews();

    $('#viewCatalog > div > a').remove();

    if (sessionStorage.getItem('username')) {
        $('#viewCatalog > a').show();
        let flights = await kinvyRequester.getAllPublicFlights();
        renderHomeView(flights);
        $('#viewCatalog').show();
    }else{
        $('#viewCatalog > a').hide();
    }

}

//------------------------------------------------------------------------------
function hideAllViews() {
    $('#container > section').hide();
}

 function attachLinkEvents() {
    $('#linkHome').on('click', function () {   //показва на бутоните менютата отдолу
        hideAllViews();
        $('#viewCatalog').show();
    });
    $('#linkFlights').on('click', async function () {
        hideAllViews();

        let flights = await kinvyRequester.getMyFlights();
       if(flights.length > 0){
           renderMyFlights(flights);
           $('#viewMyFlights').show();
       }else{
           showError("There is no Flights")
       }

    });
    $('#linkLogin').on('click', function () {
        $('#formLogin > input[name=username]').val("");
        $('#formLogin > input[name=pass]').val("");

        hideAllViews();
        $('#viewLogin').show();
    });
    $('#linkRegister').on('click', function () {
        $('#formRegister > input[name=username]').val("");
        $('#formRegister > input[name=pass]').val("");
        $('#formRegister > input[name=checkPass]').val("");

        hideAllViews();
        $('#viewRegister').show();
    });
    $('#viewCatalog > a').on('click', function () {
        hideAllViews();
        $('#viewAddFlight').show();
    });
}

