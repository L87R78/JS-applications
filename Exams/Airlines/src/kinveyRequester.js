const kinvyRequester = (function () {
    const BASE_URL = 'https://baas.kinvey.com';
    const APP_KEY = "kid_BkooSP514";
    const BASE_SECRET = "1be803d3166044ff8291ff3e7b2dcb33";
    // const BASE_64 = btoa(APP_KEY + ':' + BASE_SECRET);
    const AUTH = {"Authorization": "Basic " + btoa(APP_KEY + ":" + BASE_SECRET)};

    function registerUser(username, password) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + '/user/' + APP_KEY,
            headers: AUTH,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'Registration successful.')
        }).catch(handleError);
    }

    function logInUser(username, password) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + '/user/' + APP_KEY + '/login',
            headers: AUTH,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'Login successful.')
        }).catch(function (handleError) {

        })
    }

    function logOutLogin(username, password) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + '/user/' + APP_KEY + "/_logout",
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}
        }).catch(function (err) {
            console.log("error");
        });
        sessionStorage.clear();
        showInfo("logout successful");
        showHomeView();
        showHideLinks();

    }

    function postFlight(destination, origin, departureDate, departureTime, seats, cost, img, isCheckBox) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + '/appdata/' + APP_KEY + '/flights',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {destination, origin, departureDate, departureTime, seats, cost, img, isCheckBox}
        }).then(function (res) {
            showHomeView();
            showInfo("Created flights.");
            $('#formAddFlight').trigger("reset") // изтрива всички полета
        }).catch(handleError)
    }

    async function getAllPublicFlights() {

        return await $.ajax({
            method: 'GET',
            url: BASE_URL + '/appdata/' + APP_KEY + '/flights?query={"isCheckBox":"true"}',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (response) {
            return response;
        }).catch(handleError)
    }

    async function getMyFlights(id) {

        return await $.ajax({
            method: 'GET',
            url: BASE_URL + '/appdata/' + APP_KEY
                + `/flights?query={"_acl.creator":"${sessionStorage.getItem("userId")}"}`,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (response) {
            return response;
        }).catch(handleError)
    }

    function removeFlight(id) {
        $.ajax({
            method: 'DELETE',
            url: BASE_URL + '/appdata/' + APP_KEY + '/flights/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {}
        }).then(function () {
            showInfo("Flight deleted!")
            $('#linkFlights').trigger("click")

        }).catch(function (handleError) {

        })
    }

    function editFlights(id, destination, origin, departureDate, departureTime, seats, cost, img, isCheckBox) {
        $.ajax({
            method: 'PUT',
            url: BASE_URL + '/appdata/' + APP_KEY + '/flights/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {destination, origin, departureDate, departureTime, seats, cost, img, isCheckBox}
        }).then(function (res) {
            showInfo("Successfully edited flights.");
            renderDetailsView(res)
        }).catch(function (handleError) {

        })
    }

    function signInUser(res, message) {         //след регистрация
        saveUserSession(res);
        //$('#linkLogout').show();
        showHideLinks();
        showInfo(message);
        showHomeView();
        //hideAllViews();
        //$('#viewCatalog').show();
    }

    function saveUserSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('username', userInfo.username);
        sessionStorage.setItem('userId', userInfo._id)
    }

    function handleError(err) {
        handleError(err.message)
    }

    return {registerUser, logInUser, logOutLogin, postFlight, getAllPublicFlights, editFlights, getMyFlights, removeFlight}

}());