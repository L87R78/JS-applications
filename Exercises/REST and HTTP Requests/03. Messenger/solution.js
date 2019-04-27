function attachEvents(){
    const POST_URL = 'https://messanger-2ca76.firebaseio.com/messanger';

    $('#submit').on('click', loadContacts);
    $('#refresh').on('click', refresh);



    function loadContacts () {
        let NAME = $('#author').val();
        let MESSAGE = $('#content').val();
        let name = NAME;
        let message = MESSAGE;
        if(name.trim() !== '' && message.trim() !== ''){
            $.ajax({
                method: 'POST',
                url: POST_URL + '.json',
                data: JSON.stringify({name, message})
            }).then(function () {
                $('#author').val("");
                $('#content').val("");

            }).catch(handleError)


            //for GET
            $.ajax({
                method: 'GET',
                url: POST_URL + '.json',
                data: JSON.stringify({name, message})
            }).then(function () {
                $("#messages").val($("#messages").val() + `${name}: ${message}\n`);
            }).catch(handleError)
        }
    }
    function handleError(err) {
        console.error(err)
    }

    function refresh() {
        $("#messages").val().empty;
    }
}
