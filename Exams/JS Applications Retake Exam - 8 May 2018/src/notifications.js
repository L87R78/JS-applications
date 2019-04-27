$(document).on('ajaxStart', function(){
    $('#loadingBox').show();
});
$(document).on('ajaxStop', function(){
    $('#loadingBox').hide();
});

function showInfo(message) {
    $('#infoBox').show();
    $('#infoBox > span').text(message);

    setTimeout(function () {
        $('#infoBox').hide();
    }, 3000)
}
function showError(message) {
    $('#errorBox').show();
    $('#errorBox > span').text(message);
    setTimeout(function () {
        $('#errorBox').hide();
    }, 3000)
}

function attachBoxesEvents() {
    $('#infoBox').on('click', function () {
        $(this).hide();
    });
    $('#errorBox').on('click', function () {
        $(this).hide();
    });
}

