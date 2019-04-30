let utils = (() => {
    function starter() {
        view.homeView();
        $(document).on('ajaxStart', function () {
            $("#loadingBox").show()
        });

        $(document).on('ajaxStop', function () {
            $("#loadingBox").hide()
        });
    }

    function isAuthor(entity) {
        return sessionStorage.getItem('userId') === entity._acl.creator;
    }

    return {
        starter,
        isAuthor
    }
})();

