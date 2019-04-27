function viewMySongs(songs) {
    $('#mySongsView').empty();
    $('#mySongsView').append('<h1>My Songs</h1>');


    for (const song of songs) {
        let div = $('<div class="song">');
        div.append($(`<h5>Title: ${song.tittle}</h5>`));
        div.append($(`<h5>Artist: ${song.artist}</h5>`));
        div.append($(`<img class="cover" src=${song.imageURL}/>`));
        div.append($(`<p>Likes: 100; Listened 1500 times</p>`));

        let btnRemove = $('<a href="#"><button type="button" class="btn btn-danger mt-4">Remove</button></a>').on('click',function () {

           $(this).parent().remove();
            removeFromMySongs(song._id);
        });
        let btnListen = $('<a href="#"><button type="button" class="btn btn-success mt-4">Listen</button></a>');
        let p = $('<p>Likes: 100</p>');
        let btnLike = $('<a href="#"><button type="button" class="btn btn-primary mt-4">Like</button></a>');

        div.append(btnRemove, btnListen, p, btnLike)

        $('#mySongsView').append(div)

    }
    $('#mySongsView').show();

}

function viewAllUsersSongs(songs) {

    if(songs.length === 0){
        showError("There is no songs")
        $('#song-container').empty();

        $('#mySongsView').hide();
        $('#allSongsView').empty();
        $('#allSongsView').append('<div id="background-spotify" class="background-spotify">');
        $('#allSongsView').append('<div id="song-container" class="song-container">');
        $('#song-container').append('<h1>All Songs</h1>');

        $('#song-container').append('<a href="#">\n' +
            '                        <button type="button" id="addNewSong" class="btn-lg btn-block new-song-btn">Add a new song</button>\n' +
            '                    </a>');
        $('#allSongsView').show();


    }else{

        $('#song-container').empty();

        $('#mySongsView').hide();
        $('#allSongsView').empty();
        $('#allSongsView').append('<div id="background-spotify" class="background-spotify">');
        $('#allSongsView').append('<div id="song-container" class="song-container">');
        $('#song-container').append('<h1>All Songs</h1>');

        $('#song-container').append('<a href="#">\n' +
            '                        <button type="button" id="addNewSong" class="btn-lg btn-block new-song-btn">Add a new song</button>\n' +
            '                    </a>');
        $('#allSongsView').show();


        for (const song of songs) {

            let like = 0;
            let listened = 0;

            let acl = song._acl;
            let test = acl.creator;
            if (acl.creator === sessionStorage.getItem("userId")) { //това е за моите песни
                let div = $('<div class="song">');
                div.append($(`<h5>Title: ${song.tittle}</h5>`));
                div.append($(`<h5>Artist: ${song.artist}</h5>`));
                div.append($(`<img class="cover" src=${song.imageURL}/>`));
                div.append($(`<p>Likes: ${like}; Listened ${listened} times</p>`));

                let btnRemove = $('<a href="#"><button type="button" class="btn btn-danger mt-4">Remove</button></a>').on('click', function () {
                    $(this).parent().remove();
                    removeFromMySongs(song._id)

                });
                let btnListen = $('<a href="#"><button type="button" class="btn btn-success mt-4">Listen</button></a>').on('click', function () {
                    listenSong(song, song._id)

                });;
                let p = $('<p>Likes: 100</p>');
                let btnLike = $('<a href="#"><button type="button" class="btn btn-primary mt-4">Like</button></a>');

                div.append(btnRemove, btnListen, p, btnLike);

                $('#song-container').append(div)
            }else{
                let div = $('<div class="song">');
                div.append($(`<h5>Title: ${song.tittle}</h5>`));
                div.append($(`<h5>Artist: ${song.artist}</h5>`));
                div.append($(`<img class="cover" src=${song.imageURL}/>`));
                div.append($(`<p>Likes: 100; Listened 1500 times</p>`));


                let p = $('<p>Likes: 100</p>');
                let btnLike = $('<a href="#"><button type="button" class="btn btn-primary mt-4">Like</button></a>').on('click', function () {
                    likeOnAnotherUser();

                });
                div.append(p, btnLike);

                $('#song-container').append(div)

            }
        }
        $('#allSongsView').show();
    }

    $('#addNewSong').on('click', function () { //add songs
        $('#homeImage').hide();
        $('#allSongsView').hide();
        $('#createSongView').show();

        $('#createSongView input[name=title]').val("");
        $('#createSongView input[name=artist]').val("");
        $('#createSongView input[name=imageURL]').val("");


    });
    $('#create').on('click', function (event) {
        event.preventDefault();

        let tittle = $('#createSongView input[name=title]').val();
        let artist = $('#createSongView input[name=artist]').val();
        let imageURL = $('#createSongView input[name=imageURL]').val();

        let listen = 0;


        if (tittle.length >= 6 && artist.length >= 3) {
            kinvyRequester.postSong(tittle, artist, imageURL, listen);
        }else if(tittle.length < 6){
            showError("tittle must be over 6-character long!")
        }
        else if(artist.length < 3){
            showError("artist must be over 3-character long!")
        }else {
            showError("Incorrect tittle or artist!")
        }
    });
}

function removeFromMySongs(id) {

    kinvyRequester.removeFromMySongs(id)
}

function likeOnAnotherUser() {

}
function listenSong() {
   showInfo("така е като не се отделя достатъчно време")
}

