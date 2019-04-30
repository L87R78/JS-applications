let view = (() => {
    function homeView() {
        if (sessionStorage.getItem('authtoken') === null) {
            userLoggedOut();
        } else {
            userLoggedIn();
        }
    }

    function userLoggedOut() {
        hideAll();
        $(`.navbar-dashboard`).hide();
        $(`.navbar-anonymous`).show();
        $(`.basic`).show();
    }

    function userLoggedIn() {
        hideAll();
        $(`.navbar-dashboard`).show();
        $(`.navbar-anonymous`).hide();
        $(`.basic`).show();
    }



    function hideAll() {
        $(`#site-content section`).hide();
    }

    return {
        homeView,
        hideAll
    }
})();