let func = (() => {
    function activateForms() {

        //LOGIN
        $("#loginSubmitForm").on('submit', function (e) {
            e.preventDefault();
            let form = $(`#loginSubmitForm`);
            let username = $(form).find('input[name=username]');
            let password = $(form).find('input[name=password]');

            if (username.val().length < 3) {
                auth.showError("Error: Username must be at least 3 symbols.");
            } else if (password.val().length < 6) {
                auth.showError("Error: Password must be at least 6 symbols.");
            } else {
                auth.login(username.val(), password.val()).then(function (result) {
                    auth.handleSuccess(result, "Login successful.", 'loginSubmitForm');
                    view.homeView();
                }).catch(auth.handleError)
            }
        });

        //REGISTER
        $("#registerSubmitForm").on('submit', function (e) {
            e.preventDefault();
            let form = $(`#registerSubmitForm`);
            let username = $(form).find('input[name=username]');
            let password = $(form).find('input[name=password]');

            if (username.val().length < 3) {
                auth.showError("Error: Username must be at least 3 symbols.");
            } else if (password.val().length < 6) {
                auth.showError("Error: Password must be at least 6 symbols.");
            } else {
                auth.register(username.val(), password.val()).then(function (result) {
                    auth.handleSuccess(result, "Registration successful.", 'registerSubmitForm');
                    view.homeView();
                }).catch(auth.handleError)
            }
        });

        //LOGOUT
        $("#logout").on('click', function () {
            auth.logout().then(function (result) {
                sessionStorage.clear();
                view.homeView();
                auth.showInfo('Logout successful.');
            }).catch(auth.handleError);
        });
    }

    return {activateForms}
})();