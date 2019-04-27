function showHideLinks() {
    //  hideAllLinks();
    if (sessionStorage.getItem('authToken')) { //ако има user

        let test = $("#welcomeId");
        test.text("Welcome, " + sessionStorage.getItem('username') + " ;)");

        //$('#homeImage').show();

        $('#loginView').hide();
        $('#registerView').hide();
        $('#allSongsView').hide();
        $('#createSongView').hide();
        $('#mySongsView').hide();


        $('#homeLink').show();
        $('#allSongsLink').show();
        $('#mySongsLink').show();
        $('#welcomeId').show();
        $('#logOut').show();
        $('#mySongsLink').show();
        $('#homeImage').show();

        $('#linkLogin').hide();
        $('#linkRegister').hide();


    } else {
        $('#homeImage').show();

        $('#linkLogin').show();
        $('#linkRegister').show();

        $('#homeLink').hide();
        $('#allSongsLink').hide();
        $('#mySongsLink').hide();
        $('#welcomeId').hide();
        $('#logOut').hide();

        $('#loginView').hide();
        $('#registerView').hide();
        $('#allSongsView').hide();
        $('#createSongView').hide();
        $('#mySongsView').hide();
    }
}

function attachLinkEvents() {
    $("#registerView").on('submit', function (event) {
        event.preventDefault();

        let username = $('#registerView input[name=username]').val();
        let password = $('#registerView input[name=password]').val();

        if (username.length < 3) {
            showError("Username must be at least 3 symbols.")
        } else if (password.length < 6) {
            showError("Password must be at least 6 symbols.")
        } else if (username === "" && password === "") {
            showError("Username and Password does not empty.")
        } else {
            kinvyRequester.registerUser(username, password)
        }
    });
    //------------------------------------------------------------------------------------------------->
    $("#loginView").on('submit', function (event) {
        event.preventDefault();

        let username = $('#loginView input[name=username]').val();
        let password = $('#loginView input[name=password]').val();

        if (username.length < 3) {
            showError("Username must be at least 3 symbols.")
        } else if (password.length < 6) {
            showError("Password must be at least 6 symbols.")
        } else if (username === "" && password === "") {
            showError("Username and Password does not empty.")
        } else {
            kinvyRequester.logInUser(username, password)
        }
    });

    //------------------------------------------------------------------------------------------------->
    $("#allSongsLink").on('click', function (event) {
        event.preventDefault();
        $('#mySongsView').hide();
        $('#allSongsView').empty();
        $('#homeImage').hide();
        //$('#song-container').empty();
        $('#allSongsView').show();
        $('#mySongsView').hide();

        kinvyRequester.getAllUsers();
    });

    //------------------------------------------------------------------------------------------------->
    $("#mySongsLink").on('click', function (event) {
        event.preventDefault();
        $('#loginView').hide();
        $('#registerView').hide();
        $('#allSongsView').hide();
        $('#createSongView').hide();
        $('#mySongsView').show();


        $('#homeLink').show();
        $('#allSongsLink').show();
        $('#mySongsLink').show();
        $('#welcomeId').show();
        $('#logOut').show();
        $('#mySongsLink').show();
        $('#homeImage').hide();

        $('#linkLogin').hide();
        $('#linkRegister').hide();



        kinvyRequester.getMySongs();
    });
    //------------------------------------------------------------------------------------------------->
    $("#homeLink").on('click', function (event) {
        event.preventDefault();
       showHideLinks();

    });
}