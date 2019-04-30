$(() => {
    showHideLinks();
    attachLinkEvents();

    $('#linkLogin').on('click', attachLoginForm);
    $('#linkRegister').on('click', attachRegisterForm);
    $('#logOut').on('click', kinvyRequester.logOutLogin);
    //$('#create').on('click', createSong);
});

function attachRegisterForm(event) {
    event.preventDefault();

    $('#homeImage').hide();

    $('#homeLink').hide();
    $('#allSongsLink').hide();
    $('#mySongsLink').hide();
    $('#welcomeId').hide();
    $('#logOut').hide();

    $('#loginView').hide();
    $('#registerView').hide();
    $('#allSongsView').hide();
    $('#createSongView').hide();
    $('#mySongsView').hide();

    $('#registerView').show();

    $('#addLinkLogin').on('click', function () {
        $('#container > section').hide();
        $('#loginView').show();
        $('#registerView').hide();
    })
}
function attachLoginForm() {
    $('#homeImage').hide();

    $('#homeLink').hide();
    $('#allSongsLink').hide();
    $('#mySongsLink').hide();
    $('#welcomeId').hide();
    $('#logOut').hide();

    $('#loginView').hide();
    $('#registerView').hide();
    $('#allSongsView').hide();
    $('#createSongView').hide();
    $('#mySongsView').hide();

    $('#loginView').show();
    $('#addLinkRegister').on('click', function () {
        $('#container > section').hide();
        $('#loginView').hide();
        $('#registerView').show();
    })
}



