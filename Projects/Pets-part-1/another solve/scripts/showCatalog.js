let getItems = (() => {
    function showOtherPets(filter) {
        let listings = $('.other-pets-list');
        requester.get('appdata', 'pets', 'Kinvey').then(function (result) {
            $(listings).empty();
            for (const resultElement of result) {
                if (!utils.isAuthor(resultElement)){
                    if (resultElement.category === filter || filter === "All"){
                        let listing = $(`<li class="otherPet">`)
                            .append($(`<h3>Name: ${resultElement.name}</h3>`))
                            .append($(`<p>Category: ${resultElement.category}</p>`))
                            .append($(`<p class="img"><img src="${resultElement.imageURL}"></p>`))
                            .append($(`<p class="description">${resultElement.description}</p>`))
                            .append($(`<div class="pet-info">`)
                                .append($(`<a href="#">`)
                                    .append($(` <button class="button"><i class="fas fa-heart"></i> Pet</button>`).on('click', function () {
                                        resultElement.likes++;
                                        requester.update('appdata', 'pets/' + resultElement._id, 'Kinvey', resultElement).then(function (result) {
                                            $(listing).find('span').text(result.likes);
                                        }).catch(auth.handleError)
                                    })))
                                .append($(`<a href="#">`)
                                    .append($(`<button class="button">Details</button>`).on('click', function () {
                                        crud.otherPetDetails(resultElement);
                                    })))
                                .append($(`<i class="fas fa-heart"></i> <span id="numberOfPets">${resultElement.likes}</span>`)));
                        $(listings).append($(listing));
                    }
                }

            }
        }).catch(auth.handleError);
        view.hideAll();
        $('.dashboard').show();
    }

    function showMyPets() {
        requester.get('appdata', 'pets', 'Kinvey').then(function (result) {
            let listings = $('.my-pets-list');
            $(listings).empty();
            for (const resultElement of result) {
                if (utils.isAuthor(resultElement)) {
                    $(listings).append($(`<section class="myPet">`)
                        .append($(`<h3>Name: ${resultElement.name}</h3>`))
                        .append($(`<p>Category: ${resultElement.category}</p>`))
                        .append($(`<p class="img"><img src="${resultElement.imageURL}"></p>`))
                        .append($(`<p class="description">${resultElement.description}</p>`))
                        .append($(`<div class="pet-info">`)
                            .append($(`<a href="#">`)
                                .append($(`<button class="button">Delete</button>`).on('click', function () {
                                        crud.deletePet(resultElement);
                                })))
                            .append($(`<a href="#">`)
                                .append($(`<button class="button">Edit</button>`).on('click', function () {
                                        crud.editPet(resultElement);
                                })))
                            .append($(`<i class="fas fa-heart"></i> <span>${resultElement.likes}</span>`))));
                }
            }
        }).catch(auth.handleError)
    }

    return {showOtherPets, showMyPets};
} )();
