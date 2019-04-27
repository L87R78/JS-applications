function attachEvents() {
    const buttonLoad = $('.load').on('click', loadSuccess);
    const buttonAdd = $('.add').on('click', addSuccess);

    const appKey = 'kid_BkT0F350X';
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



////////////////////////////////////////////////////////////////////  Solve-2

// function attachEvents() {
//     const baseSurviceUrl = "https://baas.kinvey.com/appdata/kid_B1G9KZsCX/biggestCatches";
//     const kinveyUsername = "Lubomir";
//     const kinveyPassword = "123456";
//     const base64Auth = btoa(kinveyUsername + ":" + kinveyPassword);
//     const authHeaders = {"Authorization":"Basic " + base64Auth};
//
//     $('.load').click(loadCatches);
//     $('.add').click(addCatch);
//
//     function loadCatches() {
//         let request = {
//             url: baseSurviceUrl,
//             method: "GET",
//             headers: authHeaders
//         };
//
//         $.ajax(request)
//             .then(displayCatches);
//
//         function displayCatches(catches) {
//             $('#catches').empty();
//
//             for(let catche of catches){
//                 $('#catches')
//                     .append($('<div>').addClass("catch").attr("data-id", catche._id)
//                         .append($('<label>').text("Angler"))
//                         .append($('<input>').attr("type", "text").addClass("angler").val(catche.angler))
//                         .append($('<label>').text("Weight"))
//                         .append($('<input>').attr("type", "number").addClass("weight").val(catche.weight))
//                         .append($('<label>').text("Species"))
//                         .append($('<input>').attr("type", "text").addClass("species").val(catche.species))
//                         .append($('<label>').text("Location"))
//                         .append($('<input>').attr("type", "text").addClass("location").val(catche.location))
//                         .append($('<label>').text("Bait"))
//                         .append($('<input>').attr("type", "text").addClass("bait").val(catche.bait))
//                         .append($('<label>').text("Capture Time"))
//                         .append($('<input>').attr("type", "number").addClass("captureTime").val(catche.captureTime))
//                         .append($('<button>').addClass("update").text("Update").click(updateCatch))
//                         .append($('<button>').addClass("delete").text("Delete").click(deleteCatch))
//                     );
//             }
//         }
//     }
//
//     function addCatch() {
//         let inputs = $(this).parent().find('input');
//
//         let request = {
//             url: baseSurviceUrl,
//             method: "POST",
//             headers: {"Authorization": "Basic " + base64Auth, "Content-type": "application/json"},
//             data: JSON.stringify({
//                 angler: $(inputs[0]).val(),
//                 weight: +($(inputs[1]).val()),
//                 species: $(inputs[2]).val(),
//                 location: $(inputs[3]).val(),
//                 bait: $(inputs[4]).val(),
//                 captureTime: +($(inputs[5]).val())
//             })
//         };
//
//         $.ajax(request)
//             .then(loadCatches);
//
//         for(let input of inputs){
//             $(input).val('');
//         }
//     }
//
//     function updateCatch() {
//         let inputs = $(this).parent().find('input');
//         let catchId = $(this).parent().attr('data-id');
//
//         let request = {
//             url: baseSurviceUrl + "/" + catchId,
//             method: "PUT",
//             headers: {"Authorization": "Basic " + base64Auth, "Content-type": "application/json"},
//             data: JSON.stringify({
//                 angler: $(inputs[0]).val(),
//                 weight: +($(inputs[1]).val()),
//                 species: $(inputs[2]).val(),
//                 location: $(inputs[3]).val(),
//                 bait: $(inputs[4]).val(),
//                 captureTime: +($(inputs[5]).val())
//             })
//         };
//
//         $.ajax(request)
//             .then(loadCatches)
//     }
//
//     function deleteCatch() {
//         let catchId = $(this).parent().attr('data-id');
//
//         let request = {
//             url: baseSurviceUrl + "/" + catchId,
//             method: "DELETE",
//             headers: authHeaders
//         }
//
//         $.ajax(request)
//             .then(loadCatches)
//     }
// }
