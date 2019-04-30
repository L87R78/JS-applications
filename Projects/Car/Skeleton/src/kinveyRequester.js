const kinvyRequester = (function () {
    const BASE_URL = 'https://baas.kinvey.com';
    const APP_KEY = "kid_Hk8quo0kN";
    const BASE_SECRET = "b11e1c30af34409197dc7fc1a1362974";
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
        })
    }
    //-------------------------------------------------------------------------------------------->

    function logInUser(username, password) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + '/user/' + APP_KEY + '/login',
            headers: AUTH,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'Login successful.')
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

    function postCar(tittle, description, name, brand, model, year, imageUrl, fuelType, price) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + '/appdata/' + APP_KEY + '/carOLX',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {tittle, description, name, brand, model, year, imageUrl, fuelType, price}
        }).then(function (res) {
            showHideLinks();
            showInfo("Created Cars.");
            //$('#formAddFlight').trigger("reset") // изтрива всички полета
            $('#linkMyListings').trigger("click");
        }).catch(function () {
            
        })
    }
    //-------------------------------------------------------------------------------------------->

     function getAllCars(id) {

          $.ajax({
            method: 'GET',
            url: BASE_URL + '/appdata/' + APP_KEY + '/carOLX',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (response) {
            if(response.length === 0){
                $('#listings').append('<p class="no-cars">No cars in database.</p>');
            }else{
                viewAllCars(response)
            }

        }).catch(function () {
            console.log("there is no cars");
        })
    }
    //-------------------------------------------------------------------------------------------->
     function getMyCars() {
          $.ajax({
            method: 'GET',
            url: BASE_URL + '/appdata/' + APP_KEY
                + `/carOLX?query={"_acl.creator":"${sessionStorage.getItem("userId")}"}`,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (response) {
              viewMyCars(response)
          }).catch(function () {
            
        })
    }
    //-------------------------------------------------------------------------------------------->
     function editMyCars(id, tittle, description, brand, model, year, imageUrl, fuelType, price) {
        $.ajax({
            method: 'PUT',
            url: BASE_URL + '/appdata/' + APP_KEY + '/carOLX/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {tittle, description, brand, model, year, imageUrl, fuelType, price}
        }).then(function (res) {
            showInfo("Successfully edited Car.");

            viewMyCars(res)

        }).catch(function (handleError) {

        })
    }

    function testEditMyCars(name, id, tittle, description, brand, model, year, imageUrl, fuelType, price) {
        $.ajax({
            method: 'PUT',
            url: BASE_URL + '/appdata/' + APP_KEY + '/carOLX/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {name, tittle, description, brand, model, year, imageUrl, fuelType, price}
        }).then(function (res) {
            showInfo("Successfully edited Car.");

            testRenderMyCars(res)
            $('#linkMyListings').trigger("click")

        }).catch(function (handleError) {

        })
    }
    //-------------------------------------------------------------------------------------------->

    function removeInMyCarListing(id) {
        $.ajax({
            method: 'DELETE',
            url: BASE_URL + '/appdata/' + APP_KEY + '/carOLX/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {}
        }).then(function () {
            showInfo("Car deleted!")

            //$('#linkAllListings').trigger("click")
            $('#myListings').trigger("click")


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
    //-------------------------------------------------------------------------------------------->

    // function handleError(err) {
    //     handleError(err.message)
    // }
    //-------------------------------------------------------------------------------------------->

    return {registerUser, logInUser, logOutLogin, postCar, getAllCars, getMyCars, editMyCars, removeInMyCarListing, testEditMyCars}

}());