function attachButtonEvents(event) {
    $('#buttonRegisterUser').on('click', function () {
        let username = $('#formRegister input[name=username]').val();
        let password = $('#formRegister input[name=passwd]').val();

        kinvyRequester.registerUser(username, password);
    });
    //------------------------------------------------------------------------------>
    $('#buttonLoginUser').on('click', function () {

        let username = $('#formLogin input[name=username]').val();
        let password = $('#formLogin input[name=passwd]').val();

        kinvyRequester.logInUser(username, password);
    });
    //------------------------------------------------------------------------------>
    $('#buttonCreateAd').on('click', function () {

        let tittle = $('#formCreateAd input[name=title]').val();
        let description = $('#formCreateAd [name=description]').val();
        let price = $('#formCreateAd input[name=price]').val();
        let image = $('#formCreateAd input[name=imageUrl]').val();
        let published = localStorage.getItem('username')


        kinvyRequester.postAdd(tittle, description, price, image, published)
    });
}