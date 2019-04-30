const kinvyRequester = (function () {
    const BASE_URL = 'https://baas.kinvey.com';
    const APP_KEY = "kid_S1FazMcxV";
    const BASE_SECRET = "d8374e3c05d94eb0b989821ac1d3281c";
    // const BASE_64 = btoa(APP_KEY + ':' + BASE_SECRET);
    const AUTH = {"Authorization": "Basic " + btoa(APP_KEY + ":" + BASE_SECRET)};

    function registerUser(username, password) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + '/user/' + APP_KEY,
            headers: AUTH,
            data: {username, password}
        }).then(function (res) {
            $('#registerView input[name=username]').val("");
            $('#registerView input[name=password]').val("");
            signInUser(res, 'User registration successful.')
            //showHideLinks();

        }).catch( function () {
            showError("there is already user!")
        })
    }
    //------------------------------------------------------------------------------------------->
    function getAllUsers() {
        $.ajax({
            method: 'GET',
            url: BASE_URL + '/appdata/' + APP_KEY + '/songs',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (response) {
                viewAllUsersSongs(response);
        }).catch(function (err) {
            showError("Already has an existing user")
        })
    }

    //------------------------------------------------------------------------------------------->

    function logInUser(username, password) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + '/user/' + APP_KEY + '/login',
            headers: AUTH,
            data: {username, password}
        }).then(function (res) {
            $('#loginView input[name=username]').val("");
            $('#loginView input[name=password]').val("");
            signInUser(res, 'Login successful.')
            $('#homeView').show();

        }).catch(function () {

            showError("Invalid credentials. Please retry your request with correct credentials!")
        })
    }
    //-------------------------------------------------------------------------------------------->

    function logOutLogin() {
        $.ajax({
            method: 'POST',
            url: BASE_URL + '/user/' + APP_KEY + "/_logout",
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}
        }).catch(function (err) {
            console.log("error for logout");
        });
        sessionStorage.clear();
        showInfo("logout successful");
        showHideLinks();
    }
    //-------------------------------------------------------------------------------------------->

    function postSong(tittle, artist, imageURL, listen) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + '/appdata/' + APP_KEY + '/songs',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {tittle, artist, imageURL, listen}
        }).then(function (res) {
            showInfo("Created Song.");
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

        }).catch(function () {

        })
    }
    //-------------------------------------------------------------------------------------------->

    function getMySongs() {
        $.ajax({
            method: 'GET',
            url: BASE_URL + '/appdata/' + APP_KEY
                + `/songs?query={"_acl.creator":"${sessionStorage.getItem("userId")}"}`,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (response) {
            if (response.length === 0) {
                $('#my-pets').empty()
                showError("There is no songs")
            } else {
                viewMySongs(response)
            }

        }).catch(function () {

        })
    }
    //-------------------------------------------------------------------------------------------->
    function putMyPet(id, description, name, imageURL, category) {

        $.ajax({
            method: 'PUT',
            url: BASE_URL + '/appdata/' + APP_KEY + '/pets/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {description, name, imageURL, category}
        }).then(function (res) {
            //console.log("after response");
            //console.log(res);
            showInfo("Successfully edited Pet.");
            $('#detailsMyPet').empty();
            getMyPets();

        }).catch(function (handleError) {

        })
    }
    //-------------------------------------------------------------------------------------------->

    function removeFromMySongs(id) {
        $.ajax({
            method: 'DELETE',
            url: BASE_URL + '/appdata/' + APP_KEY + '/songs/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {}
        }).then(function () {
            showInfo("Song deleted!")
            getMySongs();

            $('#my-pets').trigger("click")


        }).catch(function (handleError) {

        })
    }
    //-------------------------------------------------------------------------------------------->

    function signInUser(res, message) {         //след регистрация
        saveUserSession(res);
        showInfo(message);
        showHideLinks()
    }
    //-------------------------------------------------------------------------------------------->

    function saveUserSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('username', userInfo.username);
        sessionStorage.setItem('userId', userInfo._id);

    }
    //------------------------------------------------------------------------------------------->
    return {registerUser, logInUser, logOutLogin, postSong, getMySongs, removeFromMySongs, putMyPet, getAllUsers}

}());