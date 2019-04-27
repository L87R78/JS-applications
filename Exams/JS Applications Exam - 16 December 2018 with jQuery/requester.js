const requester = (function () {

    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppKey = "kid_rkyPRAXgE";
    const kinveyAppSecret = "fba327dfb0e94d52af61174316f3618e";
    const kinveyAppAuthHeaders = {
        'Authorization': "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret),
    };


    function saveAuthInSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('userName', userInfo.username);
    }

    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
        };
    }

    function handleAjaxError(response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON && response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        showError(errorMsg);
    }

    function registerUser(username, password) {

        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "user/" + kinveyAppKey + "/",
            headers: kinveyAppAuthHeaders,
            data: {username, password}
        }).then(function (res) {
            saveAuthInSession(res);
            showInfo("User registration successful.");
            showHideMenuLinks();

        }).catch(handleAjaxError)

    }

    function loginUser(username, password) {
        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "user/" + kinveyAppKey + "/login",
            data: {username, password},
            headers: kinveyAppAuthHeaders
        }).then(function (res) {
            saveAuthInSession(res);
            showHideMenuLinks();
            $("#welcomeView").show();
            showInfo('Login successful.');
        }).catch(handleAjaxError)
    }

    function logoutUser() {
        console.log("here is logOut")
        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "user/" + kinveyAppKey + "/_logout",
            headers: getKinveyUserAuthHeaders()
        });
        sessionStorage.clear();
        $('#welcomeUser').text('');
        showHideMenuLinks();
        $("#welcomeView").show();
        showInfo('Logout successful.')
    }


    function allListingsByType(event) {
        console.log("here");

        let str = event.target;
        let typeBefore = $(str).text();
        let type = typeBefore;
        if (typeBefore.endsWith("s")) {
            type = typeBefore.slice(0, typeBefore.length -1)
        }

       // console.log(type);

        showHideMenuLinks();
        $("#listAllOtherPets").empty();
        $.ajax({
            method: "GET",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + '/pets?query={}&sort={"likes":-1}',
            headers: getKinveyUserAuthHeaders()
        }).then(function (pets) {
            let mainSection = $("#listAllOtherPets");

            for (const pet of pets) {
                console.log(pet);

                if (pet._acl.creator === sessionStorage.getItem("userId")
                && (pet.category === type)) {
                    console.log("if")

                    let li = $('<li class="otherPet">');
                    let petHearts;
                    if (pet.likes === undefined) {
                        petHearts = 0;
                    } else {
                        petHearts = Number(Number(pet.likes))
                    }
                    let h3 = $(`<h3>Name: ${pet.name}</h3>`);
                    let p = $(`<p>Category: ${pet.category}</p>`);
                    let pImg = $(`<p class="img"><img src="${pet.imageURL}"></p>`);
                    let p3 = $(`<p class="description">${pet.description}</p>`);
                    let div = $(`<div class="pet-info">`);
                    let a = $(`<a href="#"><button class="button">Details</button></a>`)
                        .on("click", function () {
                            petDetails(pet)
                        });
                    let a2 = $(`<a href="#"><button class="button">Delete</button></a>`)
                        .on("click", function () {
                            petDelete(pet)
                        });
                    let hearts = $(`<i class="fas fa-heart"></i> <span>${petHearts}</span>`)
                        .on("click", function (event) {
                            event.preventDefault();
                            petPet(pet)
                        });

                    div.append(a, a2, hearts);
                    li.append(h3, p, pImg, p3, div);
                    mainSection.append(li);
                }

                $("#dashboardView").show()
            }
        }).catch(handleAjaxError)
    }

    function allListings() {
        showHideMenuLinks();
        $("#listAllOtherPets").empty();
        $.ajax({
            method: "GET",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + '/pets?query={}&sort={"likes":-1}',
            headers: getKinveyUserAuthHeaders()
        }).then(function (pets) {
           let mainSection = $("#listAllOtherPets");
            let ul = $('<ul class="other-pets-list" id="listAllOtherPets">');


            for (const pet of pets) {

                if (pet._acl.creator !== sessionStorage.getItem("userId")) {

                    let li = $('<li class="otherPet">');
                    let petHearts;
                    if (pet.likes === undefined) {
                        petHearts = 0;
                    } else {
                        petHearts = Number(Number(pet.likes))
                    }
                    let h3 = $(`<h3>Name: ${pet.name}</h3>`);
                    let p = $(`<p>Category: ${pet.category}</p>`);
                    let pImg = $(`<p class="img"><img src="${pet.imageURL}"></p>`);
                    let p3 = $(`<p class="description">${pet.description}</p>`);
                    let div = $(`<div class="pet-info">`);
                    let a = $(`<a href="#"><button class="button">Details</button></a>`)
                        .on("click", function () {
                            petDetails(pet)
                        });
                    let a2 = $(`<a href="#"><button class="button">Delete</button></a>`)
                        .on("click", function () {
                            petDelete(pet)

                        });
                    let hearts = $(`<i class="fas fa-heart"></i> <span>${petHearts}</span>`)
                        .on("click", function (event) {
                            event.preventDefault();
                            petPet(pet)
                        });

                    if (pet._acl.creator === sessionStorage.getItem("userId")) {
                        div.append(a, a2, hearts);
                    }else {
                        div.append(a, hearts)
                    }


                    li.append(h3, p, pImg, p3, div);
                    mainSection.append(li);
                }

                $("#dashboardView").show()

            }


        }).catch(handleAjaxError)
    }

    function createProduct(data) {
        $.ajax({
            method: "POST",
            data,
            headers: getKinveyUserAuthHeaders(),
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/pets"
        }).then(function (res) {
            showHideMenuLinks();
            $("#formAddPet").trigger("reset");
            showInfo('Pet created.');
            $("#welcomeView").show();

        }).catch(handleAjaxError)
    }

    function petPet(pet) {

        let id = pet._id;
        let description = pet.description;
        let name = pet.name;
        let imageURL = pet.imageURL;
        let category = pet.category;
        let likes = pet.likes;
        likes++;
        // console.log(description);

        $.ajax({
            method: "PUT",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/pets/" + id,
            headers: getKinveyUserAuthHeaders(),
            data: {description, name, imageURL, category, likes}
        }).then(function (res) {
            showHideMenuLinks();
            showInfo(`+1 heart!`);
            allListings();


        }).catch(handleAjaxError)
    }


    function myPets() {
        hideAllViews();
        $(".my-pets").empty();

        $.ajax({
            method: "GET",
            url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + `/pets?query={"_acl.creator":"${sessionStorage.getItem('userId')}"}`,
            headers: getKinveyUserAuthHeaders()
        }).then(function (pets) {

            let mainSection = $(".my-pets");
            let h1 = $("<h1>My Pets</h1>");
            mainSection.append(h1);
            let ul = $('<ul class="my-pets-list">');

            let section = $('<section class="myPet">');//Append all under in ul!!!

            for (const pet of pets) {

                let petHearts;
                if (pet.likes === undefined) {
                    petHearts = 0;
                } else {
                    petHearts = Number(Number(pet.likes))
                }
                let h3 = $(`<h3>Name: ${pet.name}</h3>`);
                let p = $(`<p>Category: ${pet.category}</p>`);
                let pImg = $(`<p class="img"><img src="${pet.imageURL}"></p>`);
                let p3 = $(`<p class="description">${pet.description}</p>`);
                let div = $(`<div class="pet-info">`);
                let a = $(`<a href="#"><button class="button">Details</button></a>`)
                    .on("click", function () {
                        petDetails(pet)
                    });
                let a2 = $(`<a href="#"><button class="button">Delete</button></a>`)
                    .on("click", function () {
                        petDelete(pet)
                    });
                let hearts = $(`<i class="fas fa-heart"></i> <span>${petHearts}</span>`);

                div.append(a, a2, hearts);
                section.append(h3, p, pImg, p3, div);
                ul.append(section)
            }
            mainSection.append(ul);
            $(".my-pets").show();
        })
    }

    function petDetails(pet) {
        hideAllViews()
        $("#petDetails").empty();
        hideAllViews();

        let main = $("#petDetails")

        let petHearts;
        if (pet.likes === undefined) {
            petHearts = 0;
        } else {
            petHearts = Number(Number(pet.likes))
        }

        let h3 = $(`<h3>${pet.name}</h3>`);
        let p = $(`<p>Pet counter: <i class="fas fa-heart" id="petHeartAddDetails"></i>${petHearts}</p>`)
            .on("click", function (event) {
                event.preventDefault();
                if (!pet._acl.creator == sessionStorage.getItem("userId")) {
                    petPet(pet)
                }

            });
        let pImg = $(`<p class="img"><img src="${pet.imageURL}"></p>`);
        let form = $(`<form action="#" method="POST">`);

        let textArea = $(`<textarea type="text" name="description">${pet.description}</textarea>`);

        form.append(textArea);
        if (pet._acl.creator == sessionStorage.getItem("userId")) {
            let saveBtn = $(`<button class="button" id="saveBtn"> Save</button>`)
                .on("click", function (event) {
                    event.preventDefault();

                    saveEdit(pet, pet._id);
                });
            form.append(saveBtn);
        }
        main.append(h3, p, pImg, form);
        $("#petDetails").show();
    }

    function saveEdit(pet, id) {
        let description = $("#petDetails textarea[name='description']").val();
        let name = pet.name;
        let imageURL = pet.imageURL;
        let category = pet.category;
        let likes = pet.likes;
        if (likes === undefined) {
            likes = 0;
        }
        // console.log(description);

        $.ajax({
            method: "PUT",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/pets/" + id,
            headers: getKinveyUserAuthHeaders(),
            data: {description, name, imageURL, category, likes}
        }).then(function (res) {
            showHideMenuLinks();
            showInfo(`Updated successfully!`);
            allListings();


        }).catch(handleAjaxError)
    }

    function petDelete(pet) {
        $.ajax({
            method: "DELETE",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/pets/" + pet._id,
            headers: getKinveyUserAuthHeaders()
        }).then(function (res) {
            showInfo('Pet removed successfully!');
            myPets();

        }).catch(handleAjaxError)
    }

    return {registerUser, loginUser, logoutUser, allListings, createProduct, myPets, allListingsByType}
}());