$(() => {
    showHideLinks();
    attachLinkEvents();
    attachButtonPets();


    $('#registerButton').on('click', attachRegisterForm);
    $('#loginButton').on('click', attachLoginForm);
    $('#loginOut').on('click', kinvyRequester.logOutLogin);
    $('#createBtn').on('click', createListings);
    $('#linkDashboard').on('click', kinvyRequester.logOutLogin);


    function attachRegisterForm(event) {
        event.preventDefault();

        let username = $('#registerForm input[name=username]').val();
        let password = $('#registerForm input[name=password]').val();

        if (username.length < 3) {
            showError("Username must be at least 3 symbols.")
        } else if (password.length < 6) {
            showError("Password must be at least 6 symbols.")
        } else if (username === "" && password === "") {
            showError("Username and Password does not empty.")
        } else {
            kinvyRequester.registerUser(username, password)
        }
    }
    function attachLoginForm(event) {
        event.preventDefault();
        let username = $('#loginForm input[name=username]').val();
        let password = $('#loginForm input[name=password]').val();

        kinvyRequester.logInUser(username, password)
    }
    function createListings(event) {
        event.preventDefault();

        let name = $('#create  input[name=name]').val();
        let description = $('#create textarea[name=description]').val();
        let imageURL = $('#create input[name=imageURL]').val();
        let category = $('#dropDownMenu option:selected').text();
        if (name !== "" && description !== "" && imageURL !== "" && category !== "") {
            kinvyRequester.postPet(name, description, imageURL, category);
        } else {
            showError("Please fill all the fields!")
        }
    }
});