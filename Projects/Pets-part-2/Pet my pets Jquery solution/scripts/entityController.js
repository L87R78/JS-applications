let entity = (() => {
    //EDIT
    function editPet(resultElement) {
        let myPetSection = $(`.detailsMyPet`);
        myPetSection.empty();
        $(myPetSection).append($(`<h3>${resultElement.name}</h3>
            <p>Pet counter: <i class="fas fa-heart"></i> ${resultElement.likes}</p>
            <p class="img"><img src="${resultElement.imageURL}">
            </p>
            <form action="#" method="POST" id="editForm">
                <textarea type="text" name="description">${resultElement.description}</textarea>
                <button class="button"> Save</button>
            </form>`));
        let form = $(`#editForm`);
        view.hideAll();
        $(myPetSection).show();
        $(form).on('submit', function (e) {
            e.preventDefault();
            resultElement.description = $(form).find('textarea[name=description]').val();
            requester.update('appdata', 'pets/' + resultElement._id, 'Kinvey', resultElement).then(function () {
                auth.showInfo(`Updated successfully!`);
                view.homeView();
                $(form).trigger('reset');
            }).catch(auth.handleError)
        });
    }

    //CREATE
    function createPet() {
        let newPet = getPetFormFields("createPetForm");
        newPet.likes = 0;
        requester.post('appdata', 'pets', 'Kinvey', newPet).then(function () {
            auth.showInfo("Pet created.");
            view.homeView();
            $(`#createPetForm`).trigger('reset');
        }).catch(auth.handleError)
    }

    //DELETE
    function deletePet(resultElement) {
        let myPetSection = $(`.deletePet`);
        myPetSection.empty();
        $(myPetSection).append($(`<h3>${resultElement.name}</h3>
            <p>Pet counter: <i class="fas fa-heart"></i> ${resultElement.likes}</p>
            <p class="img"><img src="${resultElement.imageURL}">
            </p>
            <form action="#" method="POST" id="deleteForm">
                <p class="description">${resultElement.description}</p>
                <button class="button">Delete</button>
            </form>`));
        let form = $(`#deleteForm`);
        view.hideAll();
        $(`.deletePet`).show();
        $(form).on('submit', function (e) {
            e.preventDefault();
            requester.remove('appdata', 'pets/' + resultElement._id, 'Kinvey').then(function (result) {
                view.homeView();
                auth.showInfo("Pet removed successfully!");
            }).catch(auth.handleError)
        })
    }

    //DETAILS
    function otherPetDetails(resultElement) {
        let otherPet = $(`.detailsOtherPet`);
        $(otherPet).empty();
        $(otherPet)
            .append($(`<h3 id="petName">${resultElement.name}</h3>`)
            .append($(`<p id="petLikes">Pet counter: ${resultElement.likes} <a href="#">`))
                .append($(`<p class="img" id="petImage"><img src="${resultElement.imageURL}"></p>`))
                .append($(`<p class="description" id="petDescription">${resultElement.description}</p>`)));
        $('.detailsOtherPet a').append($(`<button class="button"><i class="fas fa-heart"></i>
                    Pet
                </button>`).on('click', pressLike)
        );

        function pressLike(){
            resultElement.likes++;
            requester.update('appdata', 'pets/' + resultElement._id, 'Kinvey', resultElement).then(function (result) {
                $(otherPet).find($(`p`)).first().replaceWith($(`<p id="petLikes">Pet counter: ${resultElement.likes} <a href="#"><button class="button" id="like"><i class="fas fa-heart"></i>Pet</button>`));
                $(`#like`).on('click', pressLike);
            }).catch(auth.handleError)
        }

        view.hideAll();
        $(otherPet).show()
    }

    //DETAILS
    function getPetFormFields(formId) {
        let form = $(`#` + formId);
        let newPet = {};
        newPet.name = $(form).find('input[name=name]').val();
        newPet.description = $(form).find('textarea[name=description]').val();
        newPet.imageURL = $(form).find('input[name=imageURL]').val();
        newPet.category = $(form).find('select[name=category]').val();
        return newPet;
    }

    return {editPet, createPet, deletePet, otherPetDetails}
})();