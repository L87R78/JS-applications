let events = (() => {
    function attachEventListeners() {
        $("#loginButton").on('click', function () {
            view.homeView();
            $(`.basic`).hide();
            $(`.login`).show();

        });

        $("#registerButton").on('click', function () {
            view.homeView();
            $(`.basic`).hide();
            $(`.register`).show();
        });

        $(`#addPet`).on('click', function () {
            view.hideAll();
            $(`.create`).show();
        });

        $(`#createPetForm`).on('submit', function (e) {
            e.preventDefault();
            crud.createPet();
        });

        $("#dashboard").on('click', function () {
            view.homeView();
        });

        $(`#myPets`).on('click', function () {
            view.hideAll();
            $(`.my-pets`).show();
            getItems.showMyPets();
        });

        $(`#dashboard`).on('click', function () {
            view.hideAll();
            getItems.showOtherPets("All");
        });

        $(`#categoryAll`).on('click', function () {
            view.hideAll();
            getItems.showOtherPets("All");
        });

        $(`#categoryCats`).on('click', function () {
            view.hideAll();
            getItems.showOtherPets("Cat");

        });

        $(`#categoryDogs`).on('click', function () {
            view.hideAll();
            getItems.showOtherPets("Dog");

        });

        $(`#categoryParrots`).on('click', function () {
            view.hideAll();
            getItems.showOtherPets("Parrot");
        });

        $(`#categoryReptiles`).on('click', function () {
            view.hideAll();
            getItems.showOtherPets("Reptile");

        });

        $(`#categoryOther`).on('click', function () {
            view.hideAll();
            getItems.showOtherPets("Other");

        });

    }

    return {attachEventListeners}
})();
