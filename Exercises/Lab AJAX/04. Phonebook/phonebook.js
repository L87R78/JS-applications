const BASE_URL = 'https://messanger-2ca76.firebaseio.com/phonebook';
const TABLE = $('#phonebook');

const PERSON = $('#person');
const PHONE = $('#phone');

$('#btnLoad').on('click', loadContacts);
$('#btnCreate').on('click', createContact);

let li;
let button;

function loadContacts() {
    $.ajax({
        method: "GET",
        url: BASE_URL + '.json'
    }).then(appendContacts)
        .catch(handleError)
}

function appendContacts(contacts) {

    TABLE.empty();
    if (contacts !== null) {
        let keys = Object.keys(contacts);
        keys.sort((a, b) => contacts[a].name.localeCompare(contacts[b].name));

        for (const id of keys) {
            li = $(`<li>${contacts[id].name}: +${contacts[id].phone}</li>`);
            button = $('<button>Delete</button>');
            button.on('click', function () {
                $(this).closest("li").remove();
                $.ajax({
                    method: "DELETE",
                    url: BASE_URL + '/' + id + '.json'
                }).then(function () {

                }).catch(handleError)
            });
            li.append(button);
            TABLE.append(li)
        }

        // for (let key in contacts) {
        //     li = $(`<li>${contacts[key].name}: +${contacts[key].phone}</li>`);
        //     button = $('<button>[Delete]</button>')
        //     li.append(button);
        //     TABLE.append(li)
        // }
        //}
    }
}

function createContact() {
    let name = PERSON.val();
    let phone = PHONE.val();

    if (name.trim() !== '' && phone.trim() !== '') {
        $.ajax({
            method: 'POST',
            url: BASE_URL + '.json',
            data: JSON.stringify({name, phone})
        }).then(function () {
            PERSON.val("");
            PHONE.val("");

        }).catch(handleError)
    }
};

function deleteContact() {
    console.log(this)
}

function handleError(err) {
    console.error(err);
}


