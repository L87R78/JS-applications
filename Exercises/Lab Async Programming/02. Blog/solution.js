function attachEvents() {
    const URL = 'https://baas.kinvey.com/appdata/kid_BkGd4cIC7/';

    const USERNAME = 'Peter';
    const PASSWORD = 'p';
    const BASE_64 = btoa(USERNAME + ':' + PASSWORD);
    const AUTH = {"Authorization": "Basic " + BASE_64};

    const SELECT = $('#posts');
    const POST_TITTLE = $('#post-title');
    const POST_BODY = $('#post-body');
    const POSTCOMMENTS = $('#post-comments');

    $('#btnLoadPosts').on('click', loadPost);
    $('#btnViewPost').on('click', viewPost);

    const anglerInAside = $('#aside .angler');
    const weightInAside = $('#aside .weight');
    const speciesInAside = $('#aside .species');
    const locationInAside = $('#aside .location');
    const baitInAside = $('#aside .bait');
    const captureInAside = $('#aside .captureTime');

    function loadPost() {
        $.ajax({
            method: "GET",
            url: URL + 'posts',
            headers: AUTH
        }).then(function (res) {

            for (const post of res) {
                SELECT.append($(`<option id="${post._id}" body="${post.body}">${post.tittle}</option>`));
                $('#btnLoadPosts').attr('disabled', true);
        }
        }).catch(function (err) {
            console.log(err);
        });
    }
    function viewPost() {
        $('#btnViewPost').attr('disabled', true);
        let selectedElement =  SELECT.find(":selected");
        let id = selectedElement.attr('id');

        $.ajax({
            method: 'GET',
            url: URL + `comments/?query={"post_id":"${id}"}`,
            headers: AUTH
        }).then(function (res) {
            POST_TITTLE.empty();
            POST_BODY.empty();
            POSTCOMMENTS.empty();

            let value = selectedElement.text();
            let body = selectedElement.attr('body');

            POST_TITTLE.text(value);
            POST_BODY.append($(`<li>${body}</li>`));
            for (let id of res) {
                POSTCOMMENTS.append($(`<li>${id.text}</li>`));
                $('#btnViewPost').attr('disabled', false);
            }
        }).catch(function (err) {
            console.log(err);
        })
    }
}