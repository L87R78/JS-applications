function attachEvents() {
    const userName = 'Lubomir';
    const password = '123456';

    const BASE_64 = btoa(userName + ':' + password);
    const AUTH = {
        'Content-type': 'application/json',
        "Authorization": "Basic " + BASE_64};

    const URL = `https://baas.kinvey.com/appdata/kid_B1G9KZsCX/biggestCatches`;

    function loadSuccess() {
        $.ajax({
            method: 'GET',
            url: URL,
            headers: AUTH,
        }).then(function (res) {
            $('#catches').empty();
            let allCatches = $('#catches');
            for (const re of res) {
                allCatches
                    .append($('<div>').addClass("catch").attr("data-id", re._id)
                        .append($('<label>').text("Angler"))
                        .append($('<input>').attr("type", "text").addClass("angler").val(re.angler))
                        .append($('<label>').text("Weight"))
                        .append($('<input>').attr("type", "number").addClass("weight").val(re.weight))
                        .append($('<label>').text("Species"))
                        .append($('<input>').attr("type", "text").addClass("species").val(re.species))
                        .append($('<label>').text("Location"))
                        .append($('<input>').attr("type", "text").addClass("location").val(re.location))
                        .append($('<label>').text("Bait"))
                        .append($('<input>').attr("type", "text").addClass("bait").val(re.bait))
                        .append($('<label>').text("Capture Time"))
                        .append($('<input>').attr("type", "number").addClass("captureTime").val(re.captureTime))
                        .append($('<button>').addClass("update").text("Update").on('click', updateCatch.bind(re)))
                        .append($('<button>').addClass("delete").text("Delete").on('click', deleteCatch.bind(re)))
                    );
                $('#main').append(allCatches)
            }
        })
    }
    function addSuccess() {

        let angler = $('#addForm input.angler').val();
        let weight = Number($('#addForm input.weight').val());
        let species = $('#addForm input.species').val();
        let location = $('#addForm input.location').val();
        let bait = $('#addForm input.bait').val();
        let captureTime = Number($('#addForm input.captureTime').val());

        $('#addForm input.angler').val("");
        $('#addForm input.weight').val("");
        $('#addForm input.species').val("");
        $('#addForm input.location').val("");
        $('#addForm input.bait').val("");
        $('#addForm input.captureTime').val("");

        if(angler !== "" || weight !== 0 || species !== "" || location !== "" || bait !== "" || captureTime !== 0){
            let catchObj = {
                angler: angler,
                weight: +weight,
                species: species,
                location: location,
                bait: bait,
                captureTime: +captureTime
            };
            $.ajax({
                method: 'POST',
                url: URL,
                data: JSON.stringify(catchObj),
                headers: AUTH
            })
        }
    }
    function updateCatch(ev) {
        let catchObj = {};
        $(ev.target).parent().find('input').each((index, el)=> {
            catchObj[el.className] = el.value;
        });
        $.ajax({
            method: 'PUT',
            url: URL + "/" + this._id,
            headers: AUTH,
            data: JSON.stringify(catchObj),
        })
    }
    function deleteCatch(ev) {
        $.ajax({
            method: 'DELETE',
            url: URL + "/" + this._id,
            headers: AUTH,
            success: handleDelete.bind(ev)
        });
        function handleDelete() {
            $(this.target).parent().remove()
        }
    }
 }
