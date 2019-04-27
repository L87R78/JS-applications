$(() => {
    sessionStorage.clear();
    attachEventsLinks();
    showHideMenuLinks();

    $("#registerUserBtn").on("click", userReg);
    $("#loginBtn").on("click", userLog);
    $("#linkLogout").on("click", requester.logoutUser);

    $("#linkDashboard").on("click", requester.allListings);
    $("#addPetBtn").on("click", createListing);
    $("#linkMyPetsBtn").on("click", requester.myPets);

    $("#listAllBtn").on("click", requester.allListings);
    $("#listCatsBtn").on("click", requester.allListingsByType);
    $("#listDogsBtn").on("click", requester.allListingsByType);

    $("#listParrotsBtn").on("click", requester.allListingsByType);
    $("#listReptilesBtn").on("click", requester.allListingsByType);
    $("#listOtherBtn").on("click", requester.allListingsByType);





    $("form").submit(function (event) {
        event.preventDefault();
    });


    function userReg() {

        let username = $("#registerView input[name='username']").val();
        let password = $("#registerView input[name='password']").val();

        if (username.length < 3) {
            showError("Username must be at least 3 symbols");
        } else if (password.length < 6) {
            showError("Password must be at least 6 symbols");
        } else {
            requester.registerUser(username, password);
        }

    }

    function userLog() {
        console.log("here")
        let username = $("#loginView input[name='username']").val();
        let password = $("#loginView input[name='password']").val();

        if (username.length < 3) {
            showError("Username must be at least 3 symbols");
        } else if (password.length < 6) {
            showError("Password must be at least 6 symbols");
        } else {
            requester.loginUser(username, password);
        }
    }

    function createListing() {

        let name = $("#formAddPet input[name='name']").val();
        let description = $("#formAddPet textarea[name='description']").val();
        let imageURL = $("#formAddPet input[name='imageURL']").val();
        let category = $("#optionSelector option:selected").val();
        let likes = 0;

       let data = {
           name, description, imageURL, category, likes
       };

        requester.createProduct(data)
    }
});