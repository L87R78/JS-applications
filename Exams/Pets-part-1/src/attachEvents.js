function showHideLinks() {
    hideAllLinks();
    if (sessionStorage.getItem('authToken')) { //ако има user
        console.log("има user");

        let test = $("#right-barId li:first-child");
        test.text("Welcome, " + sessionStorage.getItem('username') + " ;)");

        $('#left-barId').show();
        $('#right-barId').show();
        $('#navbar-anonymousId').hide();

        $('#basic').show();
    } else {
        console.log("няма user");

        $('#registerLink').show();
        $('#loginLink').show();
        $('#basic').show();
        $('#navbar-anonymousId').show();
    }
}
//------------------------------------------------------------------------------------------------->

function hideAllLinks() {
    $('#left-barId').hide();
    $('#right-barId').hide();
    $('#loginForm').hide();
    $('#registerForm').hide();
    $('#create').hide();
    $('#myPet').hide();
    $('#otherPet').hide();
    $('#deletePet').hide();
    $('#detailsMyPet').hide();
    $('#detailsOtherPet').hide();
    $('#dashboard').hide();
    $('#my-pets').hide();
}
//------------------------------------------------------------------------------------------------->

function attachLinkEvents() {
    $("#registerLink").on('click', function () {
        $('#registerForm').show();

        $('#basic').hide();
        $('#loginForm').hide();
        $('#create').hide();
        $('#myPet').hide();
        $('#otherPet').hide();
        $('#deletePet').hide();
        $('#detailsMyPet').hide();
        $('#detailsOtherPet').hide();
        $('#dashboard').hide();
        $('#my-pets').hide();
    });
    //------------------------------------------------------------------------------------------------->

    $("#loginLink").on('click', function (event) { //for login
        event.preventDefault();

        $('#loginForm').show();

        $('#basic').hide();
        $('#registerForm').hide();
        $('#myPet').hide();
        $('#otherPet').hide();
        $('#deletePet').hide();
        $('#detailsMyPet').hide();
        $('#detailsOtherPet').hide();
        $('#dashboard').hide();
        $('#my-pets').hide();
    });
    //------------------------------------------------------------------------------------------------->

    $("#buttonLeftMyPets").on('click', function (event) { //My Pets
        event.preventDefault();
        showHideLinks();

        $('#basic').hide();
        $('#myPet').empty();
        $('#myPet').show();

        kinvyRequester.getMyPets();
    });
    //------------------------------------------------------------------------------------------------->

    $("#buttonLeftAddPet").on('click', function (event) {
        event.preventDefault();
        hideAllLinks();
        console.log("create")
        $('#left-barId').show();
        $('#right-barId').show();
        $('#navbar-anonymousId').hide();
        $('#basic').hide();

        $('#create').show();

    });
    //------------------------------------------------------------------------------------------------->

    $("#buttonDashboard").on('click', function (event) {
        event.preventDefault();

       $('#basic').hide();
       $('#dashboard').show();

    });
}