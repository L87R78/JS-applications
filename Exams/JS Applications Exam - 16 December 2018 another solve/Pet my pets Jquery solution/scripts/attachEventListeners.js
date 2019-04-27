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
            entity.createPet();
        });

        $("#dashboard").on('click', function () {
            view.homeView();
        });

        $(`#myPets`).on('click', function () {
            view.hideAll();
            $(`.my-pets`).show();
            view.showMyPets();
        });

        $(`#dashboard`).on('click', function () {
            view.hideAll();
            view.showOtherPets("All");
        });

        $(`#categoryAll`).on('click', function () {
            view.hideAll();
            view.showOtherPets("All");
        });

        $(`#categoryCats`).on('click', function () {
            view.hideAll();
            view.showOtherPets("Cat");
        });

        $(`#categoryDogs`).on('click', function () {
            view.hideAll();
            view.showOtherPets("Dog");

        });

        $(`#categoryParrots`).on('click', function () {
            view.hideAll();
            view.showOtherPets("Parrot");
        });

        $(`#categoryReptiles`).on('click', function () {
            view.hideAll();
            view.showOtherPets("Reptile");

        });

        $(`#categoryOther`).on('click', function () {
            view.hideAll();
            view.showOtherPets("Other");
        });
    }

    return {attachEventListeners}
})();
