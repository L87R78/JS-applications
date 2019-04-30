function attachButtonPets() {

    $('#All').on('click', function (event) {
        event.preventDefault();
        console.log("All")
    });
    $('#Cats').on('click', function (event) {
        event.preventDefault();
        console.log("Cats")
    });
    $('#Dogs').on('click', function (event) {
        event.preventDefault();
        console.log("Dogs")
    });
    $('#Parrots').on('click', function (event) {
        event.preventDefault();
        console.log("Parrots")
    });
    $('#Reptiles').on('click', function (event) {
        event.preventDefault();
        console.log("Reptiles")

    });
    $('#Other').on('click', function (event) {
        event.preventDefault();
        console.log("Other")
    });

    $('#dash').on('click', function (event) {
        event.preventDefault();
        hideAllLinks();
        $('#dashboard').show();

    });
}