$(document).on('ajaxStart', function(){
    $('#loadingBox').show();
});
$(document).on('ajaxStop', function(){
    $('#loadingBox').hide();
});

function showInfo(message) {
    $('#infoBox').show();
    $('#infoBox').text(message);

    setTimeout(function () {
        $('#infoBox').hide();
    }, 5000);
}
function showError(message) {
    $('#errorBox').show();
    $('#errorBox > span').text(message);
    setTimeout(function () {
        $('#errorBox').hide();
    }, 3000);
}
function showErrorInvalidUserOrPassword(message) {
    $('#errorBox').show();
    $('#errorBox').text(message);
    setTimeout(function () {
        $('#errorBox').hide();
    }, 3000);
}

function attachBoxesEvents() {
    $('#infoBox').on('click', function () {
        $(this).hide();
    });
    $('#errorBox').on('click', function () {
        $(this).hide();
    });
}


