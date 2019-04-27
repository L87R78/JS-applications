// function attachEvents() {
//     let URL = 'https://judgetests.firebaseio.com/';
//
//     function request(endpoint) {
//         return $.ajax({
//             method: 'GET',
//             url: URL + endpoint
//         })
//     }
//
//     $('#submit').on('click', function () {
//         request('locations.json')
//             .then(displayForecats)
//             .catch(handleError);
//
//         function displayForecats(allCocations) {
//             let inputText = $('#location').val();
//             let locationCode = allCocations
//                 .filter(l => l['name'] === inputText.trim())
//                 .map(l => l['code'])[0];
//
//             if (locationCode !== undefined) {
//                 let currentConditionPromise = request(`forecast/today/${locationCode}.json`);
//                 let threeDaysConditionPromise = request(`forecast/upcoming/${locationCode}.json`);
//
//                 Promise.all([currentConditionPromise, threeDaysConditionPromise])
//                     .then(displayCondition)
//                     .catch(handleError);
//
//                 function displayCondition(allConditions) {
//                     $('#current').empty();
//                     $('#upcoming').empty();
//                     $('#forecast').show();
//
//                     appendDataCorrect();
//                     appendDataUpcoming();
//
//                     function appendDataCorrect() {
//
//                         $('#current').append($('<div class="label">Current conditions</div>'));
//                         $('#upcoming').append($('<div class="label">Three-day forecast</div>'));
//
//                         let low = allConditions[0]['forecast']['low'];
//                         let high = allConditions[0]['forecast']['high'];
//                         let condition = allConditions[0]['forecast']['condition'];
//                         let name = allConditions[0]['name'];
//
//                         let resultCondition;
//                         switch (condition.trim()) {
//                             case "Sunny":
//                                 resultCondition = "&#x2600";
//                                 break;
//                             case "Partly sunny":
//                                 resultCondition = "&#x26C5";
//                                 break;
//                             case "Overcast":
//                                 resultCondition = "&#x2601";
//                                 break;
//                             case "Rain":
//                                 resultCondition = "&#x2614";
//                                 break;
//                         }
//
//                         let span = $(`<span>${resultCondition}</span>`).addClass('condition symbol');
//
//                         let spanClass = $('<span>').addClass('condition');
//                         spanClass.append($(`<span>${name}</span>`).addClass('forecast-data'));
//                         spanClass.append($(`<span>${low + '&#176' + '/' + high + '&#176'}</span>`).addClass('forecast-data'));
//                         spanClass.append($(`<span>${condition}</span>`).addClass('forecast-data'));
//
//                         $('#current').append(span);
//                         $('#current').append(spanClass);
//                     }
//
//                     function appendDataUpcoming() {
//                         for (let el of allConditions[1]['forecast']) {
//                             let high = el.high;
//                             let low = el.low;
//                             let condition = el.condition;
//                             let resultCondition;
//
//                             switch (condition) {
//                                 case "Sunny":
//                                     resultCondition = "&#x2600";
//                                     break;
//                                 case "Partly sunny":
//                                     resultCondition = "&#x26C5";
//                                     break;
//                                 case "Overcast":
//                                     resultCondition = "&#x2601";
//                                     break;
//                                 case "Rain":
//                                     resultCondition = "&#x2614";
//                                     break;
//                             }
//
//                             let spanClass = $('<span>').addClass('upcoming');
//                             spanClass.append($(`<span>${resultCondition}</span>`).addClass('symbol'));
//                             spanClass.append($(`<span>${low + '&#176' + '/' + high + '&#176'}</span>`).addClass('forecast-data'));
//                             spanClass.append($(`<span>${condition}</span>`).addClass('forecast-data'));
//
//                             $('#upcoming').append(spanClass);
//                         }
//                     }
//                 }
//
//                 $('#location').val("")
//             } else {
//                 handleError()
//             }
//         }
//
//         function handleError() {
//            $('#forecast')
//                .css('display', 'block')
//                .text("Error")
//         }
//     })
// }

///-------------------------------------------------------- solve2

function attachEvents() {
    const URL = 'https://judgetests.firebaseio.com/';
    const symbols  = {
        "Sunny": "&#x2600",
        "Partly sunny": "&#x26C5",
        "Overcast": "&#x2601",
        "Rain": "&#x2614"
    };
    $('#submit').on('click', getWeather);

    function getWeather() {
        //get name from input window
        let locationName = $('#location').val();

        //get all location codes (async 1)
        $.ajax({
            method: 'GET',
            url: URL + 'locations.json'
        }).then(parseData)
            .catch(handleError);


        function parseData(codes) {
            let code = undefined;
            for (let loc of codes) {
                if (loc.name === locationName) {
                    code = loc.code;
                    break;
                }
            }

            //request today's forecast (async 2)
            //request upcoming forecast (async 2)
            Promise.all([
                $.get(URL + `forecast/today/${code}.json`),
                $.get(URL + `forecast/upcoming/${code}.json`)
            ]).then(displayResults)
                .catch(handleError)
        }
        function displayResults([today, upcoming]) {
            $('#current').empty();
            $('#current').append($('<div class="label">Current conditions</div>'));
            $('#upcoming').empty();
            $('#upcoming').append($('<div class="label">Three-day forecast</div>'));

            const resultCondition = symbols[today.forecast.condition];


            let htmlSymbol = `<span class="condition symbol">${resultCondition}</span>`;
            let htmlContent = `<span class="condition"> 
                                <span class="forecast-data">${today.name}</span>
                                <span class="forecast-data">${today.forecast.low + "&#176" + "/" + today.forecast.high + "&#176"}</span>
                                <span class="forecast-data">${today.forecast.condition}</span>
                                </span>`;
            $('#current').append(htmlSymbol);
            $('#current').append(htmlContent);

            for (let el of upcoming.forecast) {
                $('#upcoming').append(renderUpcoming(el))
            }

            $('#forecast').show();
            $('#location').val("")

        }

        function renderUpcoming(data) {
            const resultCondition = symbols[data.condition];
            return `<span class="upcoming">;
            <span class="symbol">${resultCondition}</span> 
            <span class="forecast-data">${data.low + "&#176" + "/" + data.high + "&#176"}</span>
            <span class="forecast-data">${data.condition}</span>
            </span>`;
        }
    }
    function handleError(err) {
        $('#forecast').text("Error");
        $('#forecast').show();

    }
}































