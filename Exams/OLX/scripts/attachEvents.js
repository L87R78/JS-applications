function showHideLinks() {
    hideAllViews();
    hideAllLinks();

    if (sessionStorage.getItem('authToken')) { //ако има user
        console.log("има user");

        $('#linkHome').show();
        $('#linkLogout').show();
        $('#linkListAds').show();
        $('#linkCreateAd').show();
    } else {                                        // ако няма reg user
        console.log("no user");

        $('#linkLogin').show();
        $('#linkHome').show();
        $('#linkRegister').show();
        $('#viewHome').show();
    }
}

function hideAllLinks() {
    console.log("2")
    $('#linkHome').hide();
    $('#linkLogin').hide();
    $('#linkRegister').hide();
    $('#linkListAds').hide();
    $('#linkCreateAd').hide();
    $('#linkLogout').hide();
}

//----------------------------------------------------------------------------------->

function hideAllViews() {
    console.log("1")
    $('#viewRegister').hide();
    $('#viewLogin').hide();
    $('#viewHome').hide();
    $('#viewAds').hide();
    $('#viewCreateAd').hide();
    $('#viewEditAd').hide();
}

//----------------------------------------------------------------------------------->
function showHomeView(){
    if(sessionStorage.getItem('username')){
        console.log("here")
        $('#loggedInUser').show();
        $('#loggedInUser').text("Welcome " + sessionStorage.getItem('username'));

        $('#viewRegister').hide();
        $('#viewLogin').hide();
        $('#viewHome').hide();
        $('#viewAds').hide();
        $('#viewCreateAd').hide();
        $('#viewEditAd').hide();
    }else{
        $('#loggedInUser').hide();
        $('#viewRegister').hide();
        $('#viewLogin').hide();
        $('#viewHome').hide();
        $('#viewAds').hide();
        $('#viewCreateAd').hide();
        $('#viewEditAd').hide();
    }
}

function attachLinkEvents() {
    $('#linkLogin').on('click', function () {
        hideAllViews();
        $('#viewLogin').show();
    });
    //----------------------------------------------------------------------------------->
    $('#linkRegister').on('click', function () {
        hideAllViews();
        $('#formRegister input[name=username]').val("");
        $('#formRegister input[name=passwd]').val("");
        $('#viewRegister').show();
    });
    //----------------------------------------------------------------------------------->
    $('#linkHome').on('click', function () {
        hideAllViews();
        $('#viewHome').show();
    });
    //----------------------------------------------------------------------------------->
    $('#linkCreateAd').on('click', function () {
        hideAllViews();
        $('#viewCreateAd').show();
    });
    //----------------------------------------------------------------------------------->
    $('#linkLogout').on('click', function () {
        hideAllViews();
        kinvyRequester.logOutLogin()
    });
    //----------------------------------------------------------------------------------->
    $('#linkListAds').on('click', async function () {
        hideAllViews();
        let app = await kinvyRequester.getAllPost();
        if(app.length > 0){
            console.log("yes")

            renderMyApp(app)
            $('#viewAds').show()

            console.log("finish")
        }else{
            showError("There is no Flights")
        }
    });
    //----------------------------------------------------------------------------------->
    // $('#linkCreateAd').hide();
    // $('#linkLogout').hide();
}