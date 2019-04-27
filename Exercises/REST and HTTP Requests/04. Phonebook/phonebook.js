function attachEvents() {
    const POST_URL = 'https://phonebook-12e3c.firebaseio.com/phonebook';

    let person = $('#person').val();
    let phone = $('#phone').val();

    let btnLoad = $('#btnLoad');
    let btnCreate = $('#btnCreate');

    btnLoad.on('click', loadContacts);
    btnCreate.on('click', createContacts);


    function loadContacts() {
        $.ajax({
            method: 'GET',
            url: POST_URL + '.json'
        }).then(function (contacts) {
            console.log(contacts);
            $('#phonebook').empty();

            for (const id in contacts) {
                let li = $(`<li>${contacts[id].person}: +${contacts[id].phone}</li>`);
                let btnDelete = $('<button type="button" class="btn btn-danger btn-xs">Delete</button>');

                btnDelete.on('click', function () {
                    $.ajax({
                        method: 'DELETE',
                        url: POST_URL + '/' + id + '.json'
                    }).then(function (response) {
                        console.log(response)
                        li.remove()
                    })
                })
                li.append(btnDelete);
                $('#phonebook').append(li)
            }
        })
    }
    function createContacts() {

        let person = $('#person').val();
        let phone = $('#phone').val();

        $.ajax({
            method: 'POST',
            url: POST_URL + '.json',
            data: JSON.stringify({person, phone})
        }).then(function () {
            $('#person').val("");
            $('#phone').val("");
        })
    }
}