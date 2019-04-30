$(document).on({
    ajaxStart: function () {
        $('#loadingBox').show()
    },
    ajaxStop: function () {
        $('#loadingBox').hide()
    }
});
$('#infoBox', '#errorBox').on('click', function () {
    $(this).fadeOut()
});

function showInfo(message) {
    $('#infoBox').show();
    $('#infoBox > span').text(message);
    setTimeout(function () {
        $('#infoBox').fadeOut()
    }, 3000);
}

function showError(error) {
    $('#errorBox').show();
    $('#errorBox > span').text(error);
    $('#errorBox').on('click', function () {
        $(this).fadeOut()
    })
}


function hideAllViews() {

    $("#site-content > section").hide();
}

function showHideMenuLinks() {

    hideAllViews();

    if (sessionStorage.getItem("authToken")) {
        $("#linkDashboard").show();
        $("#linkMyPetsBtn").show();
        $("#linkAddPetBtn").show();
        $("#welcomeUser").text(`Welcome, ${sessionStorage.getItem("userName")}!`);
        $("#linkRegister").hide();
        $("#linkLogin").hide();
        $(".second-bar").show();
        $("#formLogin").trigger("reset");
        $("#formRegister").trigger("reset");
    } else {

        $("#linkDashboard").hide();
        $("#linkMyPetsBtn").hide();
        $("#linkAddPetBtn").hide();
        $(".second-bar").hide()
        $("#linkRegister").show();
        $("#linkLogin").show()
        $("#welcomeView").show()
    }
}

function attachEventsLinks() {

    $("#linkRegister").on("click", function () {
        hideAllViews();
        $("#registerView").show()
    });

    $("#linkLogin").on("click", function () {
        hideAllViews();
        $("#loginView").show()
    });
    $("#linkAddPetBtn").on("click", function () {
        console.log("create btn")
        hideAllViews();
        $("#createViewPet").show()
    })

}