function showHideLinks() {

    hideAllLinks();

    if (sessionStorage.getItem('authToken')) { //ако има user
        console.log("има user");
        let test = $("#profile").children(":first");
        test.text("Welcome, " + sessionStorage.getItem('username') + " ;)");

        $('#linkAllListings').show();
        $('#linkMyListings').show();
        $('#linkCreateListings').show();
        $('#profile').show();
        $('#main').hide();

    } else {
        console.log("няма user");
        $('#linkAllListings').hide();
        $('#linkMyListings').hide();
        $('#linkCreateListings').hide();
        $('#profile').hide();
        hideAllWithoutStartPage();
    }
}

function hideAllLinks() {
    $('#login').hide();
    $('#register').hide();
    $('#car-listings').hide();
    $('#create-listing').hide();
    $('#edit-listing').hide();
    $('.listing-details').hide();
    $('.my-listings').hide();
    $('.car-listings').hide();
}
//------------------------------------------------------------------------------------>

function hideAllWithoutStartPage() {
    hideAllLinks();
    $('#login').hide();
    $('#register').hide();
    $('#main').show()
}
//------------------------------------------------------------------------------------>

function attachLinkEvents() {
    $('#login a').on('click', function () {
        hideAllLinks();
        $('#main').hide();
        $('#register').show();
    });
    //------------------------------------------------------------------------------------>
    $('#register a').on('click', function () {
        hideAllLinks();
        $('#main').hide();
        $('#login').show();
    });
    //------------------------------------------------------------------------------------>

    $('#buttonLoginStart').on('click', function () {
        hideAllLinks();
        $('#main').hide();
        $('#login').show();
    });
    //------------------------------------------------------------------------------------>
    $('#buttonRegisterStart').on('click', function () {
        $('#main').hide();
        $('#register').show();
    });
    //------------------------------------------------------------------------------------>
    $('#linkHome').on('click', function () {
        let a = sessionStorage.getItem('username');
        if(a === null){
            hideAllWithoutStartPage();
        }else{
            //TODO...
        }
    });
    //------------------------------------------------------------------------------------>
    $('#linkAllListings').on('click',  function () {
        hideAllLinks();
        $('#car-listings').show();
        $('#listings').empty();
        kinvyRequester.getAllCars();
    });
    //------------------------------------------------------------------------------------>
    $('#linkMyListings').on('click',   function () {
        console.log("here")
        hideAllLinks();
        kinvyRequester.getMyCars();
    });
    //------------------------------------------------------------------------------------>
    $('#linkCreateListings').on('click', function () {
        hideAllLinks();
        $('#create-listing').show()
    });
}
//------------------------------------------------------------------------------------>