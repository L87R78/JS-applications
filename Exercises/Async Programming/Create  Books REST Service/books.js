function attachEvents() {
    // constants
    const basUrl = 'https://baas.kinvey.com/appdata/kid_ByAjOc0AX/books';
    const kinveyUsername = 'Lubomir';
    const kinveyPassword = '123456';
    const base64auth = btoa(kinveyUsername + ':' + kinveyPassword);
    const authHeaders = {
        'Authorization': 'Basic ' + base64auth,
        'Content-Type': 'application/json'
    };

    let title = $('#title');
    let author = $('#author');
    let isbn = $('#isbn');

    $('.load').on('click', loadAllBooks);
    $('.create').on('click', createBook);

    // Function that returns a promise
    function request(method, endpoint, data) {
        return $.ajax({
            method: method,
            url: basUrl + endpoint,
            headers: authHeaders,
            data: JSON.stringify(data)
        });
    }

    // AJAX call to load all books (GET)
    function loadAllBooks() {
        request('GET', '')
            .then(displayAllBooks)
            .catch(handleError);
    }

    // Displays all books in the HTML
    function displayAllBooks(books) {
        let allBooks = $('#books');
        allBooks.empty();
        for (let book of books) {
            allBooks.append($(`<div  id="${book._id}" book" data-id="${book['_id']}">`)
                .append($('<label>').text('Title '))
                .append($(`<input type="text" class="title" value="${book.title}">`))
                .append($('<label>').text(' Author '))
                .append($(`<input type="text" class="title" value="${book.author}">`))
                .append($('<label>').text(' Isbn '))
                .append($(`<input type="text" class="title" value="${book.isbn}">`))
                .append($('<button>').addClass("edit ").text("Edit").on('click', handleEdit.bind(book)))
                .append($('<button>').addClass("delete").text("Delete").on('click', handleDelete)))
        }
        title.val("");
        author.val("");
        isbn.val("");
        $('.create').attr('disabled', false);
    }

    function handleEdit(ev) {
        let id = this._id;
        let arr = [];
        $(ev.target).parent().find('input').each((index, el)=> {
            arr.push(el.value);
       });
        let editBookData = {
            title: arr[0],
            author: arr[1],
            isbn: arr[2]
        };

        request('PUT', `/${id}`, editBookData)
            .then(loadAllBooks)
            .catch(handleError);
    }

    function handleDelete(ev) {
        let id = $(this).parent().attr('data-id');

        request('DELETE', `/${id}`)
            .then(loadAllBooks)
            .catch(handleError);
    }

    function createBook(event) {
        event.preventDefault(); // stops form from refreshing
        if(title.val() !== "" || author.val() !== "" || isbn.val() !== ""){

            let createBookData = {
                title: title.val(),
                author: author.val(),
                isbn: Number(isbn.val())
            };
            request('POST', '', createBookData)
                .then(loadAllBooks)
                .catch(handleError);
            $('.create').attr('disabled', true);
        }
    }
    function handleError(err) {
        $('#books').text(err.statusText);
    }
}
