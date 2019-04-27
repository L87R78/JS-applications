function attachButtonEvents(event) {
    $('#register').on('submit', function (event) {
        event.preventDefault();
        let app = $('#register').find('.container');

        let username = $('#register input[name=username]').val();
        let password = $('#register input[name=password]').val();
        let repeatPassword = $('#register input[name=repeatPass]').val();

        let checkUsernameAlphabet = !/[^a-zA-Z]/.test(username);
        let checkPasswordAlphabetAndNumbers = !/[^a-zA-Z0-9]/.test(password);
        if(username.length < 3){
            showError("Username should be at least 3 characters long.")
        }else if (!checkPasswordAlphabetAndNumbers) {
            showError("Invalid password.")
        }else if (password.length !== repeatPassword.length) {
            showError("Password and repeatPassword does not match.")
        }else{
            kinvyRequester.registerUser(username, password)
        }
    });
    //-------------------------------------------------------------------------------------------->
    $('#login').on('submit', function (event) {
        event.preventDefault();

        let username = $('#login input[name=username]').val();
        let password = $('#login input[name=password]').val();
        kinvyRequester.logInUser(username, password)

    });
    //-------------------------------------------------------------------------------------------->

    $('#linkLogout').on('click', function () {
        kinvyRequester.logOutLogin()
    });
    //-------------------------------------------------------------------------------------------->

    $('#create-listing').on('submit', function (event) {
        event.preventDefault();


        let tittle = $('#create-listing input[name=title]').val();
        let description = $('#create-listing input[name=description]').val();
        let name = sessionStorage.getItem("username");
        let brand = $('#create-listing input[name=brand]').val();
        let model = $('#create-listing input[name=model]').val();
        let year = $('#create-listing input[name=year]').val();
        let imageUrl = $('#create-listing input[name=imageUrl]').val();
        let fuelType = $('#create-listing input[name=fuelType]').val();
        let price = $('#create-listing input[name=price]').val();

        if (tittle && description && name && brand && model && year && imageUrl && fuelType && price) {
            kinvyRequester.postCar(tittle, description, name, brand, model, year, imageUrl, fuelType, price);
        } else {
            showError("Please fill all the fields!")
        }
    });
    //-------------------------------------------------------------------------------------------->

    //-------------------------------------------------------------------------------------------->

}