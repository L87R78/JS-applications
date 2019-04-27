let view = (() => {
    function homeView() {
        if (sessionStorage.getItem('authtoken') === null) {
            userLoggedOut();
        } else {
            userLoggedIn();
        }
        $(`.basic`).show();
    }

    function userLoggedOut() {
        hideAll();
        $(`.navbar-dashboard`).hide();
        $(`.navbar-anonymous`).show();
    }

    function userLoggedIn() {
        hideAll();
        $(`.navbar-dashboard`).show();
        $(`.navbar-anonymous`).hide();
    }



    function hideAll() {
        $(`#site-content section`).hide();
    }

    function showOtherPets(filter) {
        let pets = $('.other-pets-list');
        requester.get('appdata', 'pets', 'Kinvey').then(function (result) {
            $(pets).empty();
            result = result.sort((x, y) => +y.likes - +x.likes);
            for (const resultElement of result) {
                if (!utils.isAuthor(resultElement)) {
                    if (resultElement.category === filter || filter === "All") {
                        let pet = $(`<li class="otherPet">`)
                            .append($(`<h3>Name: ${resultElement.name}</h3>`))
                            .append($(`<p>Category: ${resultElement.category}</p>`))
                            .append($(`<p class="img"><img src="${resultElement.imageURL}"></p>`))
                            .append($(`<p class="description">${resultElement.description}</p>`))
                            .append($(`<div class="pet-info">`)
                                .append($(`<a href="#">`)
                                    .append($(` <button class="button"><i class="fas fa-heart"></i> Pet</button>`).on('click', function () {
                                        resultElement.likes++;
                                        requester.update('appdata', 'pets/' + resultElement._id, 'Kinvey', resultElement).then(function (result) {
                                            $(pet).find('span').text(result.likes);
                                        }).catch(auth.handleError)
                                    })))
                                .append($(`<a href="#">`)
                                    .append($(`<button class="button">Details</button>`).on('click', function () {
                                        entity.otherPetDetails(resultElement);
                                    })))
                                .append($(`<i class="fas fa-heart"></i> <span id="numberOfPets">${resultElement.likes}</span>`)));
                        $(pets).append($(pet));
                    }
                }
            }
        }).catch(auth.handleError);
        view.hideAll();
        $('.dashboard').show();
    }

    function showMyPets() {
        requester.get('appdata', 'pets', 'Kinvey').then(function (result) {
            let pets = $('.my-pets-list');
            $(pets).empty();
            for (const resultElement of result) {
                if (utils.isAuthor(resultElement)) {
                    $(pets).append($(`<section class="myPet">`)
                        .append($(`<h3>Name: ${resultElement.name}</h3>`))
                        .append($(`<p>Category: ${resultElement.category}</p>`))
                        .append($(`<p class="img"><img src="${resultElement.imageURL}"></p>`))
                        .append($(`<p class="description">${resultElement.description}</p>`))
                        .append($(`<div class="pet-info">`)
                            .append($(`<a href="#">`)
                                .append($(`<button class="button">Delete</button>`).on('click', function () {
                                    entity.deletePet(resultElement);
                                })))
                            .append($(`<a href="#">`)
                                .append($(`<button class="button">Edit</button>`).on('click', function () {
                                    entity.editPet(resultElement);
                                })))
                            .append($(`<i class="fas fa-heart"></i> <span>${resultElement.likes}</span>`))));
                }
            }
        }).catch(auth.handleError)
    }


    return {
        homeView,
        hideAll,
        showMyPets,
        showOtherPets
    }
})();