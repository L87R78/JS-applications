const kinvyRequester = (function () {
    const BASE_URL = 'https://baas.kinvey.com';
    const APP_KEY = "kid_rkyPRAXgE";
    const BASE_SECRET = "fba327dfb0e94d52af61174316f3618e";
    // const BASE_64 = btoa(APP_KEY + ':' + BASE_SECRET);
    const AUTH = {"Authorization": "Basic " + btoa(APP_KEY + ":" + BASE_SECRET)};

    function registerUser(username, password) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + '/user/' + APP_KEY,
            headers: AUTH,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'User registration successful.')
            showHideLinks();

        })
    }
    //------------------------------------------------------------------------------------------->

    function getAllUsers(username) {
        console.log(username);
        $.ajax({
            method: 'GET',
            url: BASE_URL + '/appdata/' + APP_KEY,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (response) {
            $('#basic').show();

            $('#login').hide();
            $('#register').hide();
            $('#myPet').hide();
            $('#otherPet').hide();
            $('#deletePet').hide();
            $('#detailsMyPet').hide();
            $('#detailsOtherPet').hide();
            $('#dashboard').hide();
            $('#my-pets').hide();

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
            signInUser(res, 'Login successful.')
        }).catch(function () {
            console.log("sssasasa")
            showError("Invalid credentials. Please retry your request with correct credentials!")
        })
    }
    //-------------------------------------------------------------------------------------------->

    function logOutLogin() {
        console.log("logOut")
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

    function postPet(name, description, imageURL, category) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + '/appdata/' + APP_KEY + '/pets',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {name, description, imageURL, category}
        }).then(function (res) {
            showHideLinks();
            $("#formCreateAddPet").trigger("reset");
            showInfo("Created Pet.");


            //$('#create').trigger("reset") // изтрива всички полета
            //$('#linkMyListings').trigger("click");

        }).catch(function () {

        })
    }
    //-------------------------------------------------------------------------------------------->

    function getMyPets() {
        $.ajax({
            method: 'GET',
            url: BASE_URL + '/appdata/' + APP_KEY
                + `/pets?query={"_acl.creator":"${sessionStorage.getItem("userId")}"}`,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (response) {
            if (response.length === 0) {
                $('#my-pets').empty()
                showInfo("There is no Pets")
            } else {
                viewMyPetsLength(response)
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

    function removeMyPet(id) {
        $.ajax({
            method: 'DELETE',
            url: BASE_URL + '/appdata/' + APP_KEY + '/pets/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {}
        }).then(function () {
            showInfo("Pet deleted!")
            getMyPets();

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
    return {registerUser, logInUser, logOutLogin, postPet, getMyPets, removeMyPet, putMyPet, getAllUsers}

}());