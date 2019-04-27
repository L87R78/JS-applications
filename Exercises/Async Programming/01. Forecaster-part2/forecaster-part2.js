function attachEvents() {
    const URL = `https://judgetests.firebaseio.com/`;

    $('#submit').on('click', getForecast);

    //GET request to firebase;
    function request(endpoint) {
        return $.ajax({
            method: 'GET',
            url: URL + endpoint
        })
    }

    //Get the forecast for the wanted location or error
    function getForecast() {
        request('locations.json')
            .then(displayForecats)
            .catch(handleError);

        function displayForecats(allLocations) {
            let location = $('#location').val();
            let locationCode = allLocations
                .filter(l => l['name'] === location)
                .map(l => l['code'])[0];

            if (!locationCode) {
                handleError();
            }

            let weatherSymbols = {
                'Sunny': '&#x2600',
                'Partly sunny': '&#x26C5',
                'Overcast': '&#x2601',
                'Rain': '&#x2614',
            };

            let currentConditionPromise = request(`forecast/today/${locationCode}.json`);
            let threeDaysConditionPromise = request(`forecast/upcoming/${locationCode}.json`);

            Promise.all([currentConditionPromise, threeDaysConditionPromise])
                .then(displayCondition)
                .catch(handleError);

            function displayCondition([currentCondition, upcomingCondition]) {
                $('#forecast').css('display', 'block');

                appendDataCurrent();
                appendDataUpcoming();

                function appendDataCurrent() {
                    let current = $('#current');
                    current.empty();

                    let condition = currentCondition['forecast']['condition'];
                    let name = currentCondition['name'];
                    let low = currentCondition['forecast']['low'];
                    let high = currentCondition['forecast']['high'];

                    current
                        .append($('<div class="label">Current conditions</div>'))
                        .append($('<span>')
                            .addClass('condition symbol')
                            .html(weatherSymbols[condition]))
                        .append($('<span>')
                            .addClass('condition')
                            .append('<span>')
                            .addClass('forecast-data').text(name))
                        .append($('<span>')
                            .addClass('forecast-data')
                            .html(`${low}&#176/${high}&#176`))
                        .append($('<span>')
                            .addClass('forecast-data')
                            .text(condition))

                }

                function appendDataUpcoming() {
                    let upcoming = $('#upcoming');
                    upcoming.empty();

                    upcoming.append($('<div class="label">Three-day forecast</div>'));


                    for (let forecast of upcomingCondition['forecast']) {
                        let condition = forecast['condition'];
                        let low = forecast['low'];
                        let high = forecast['high'];

                        upcoming
                            .append($('<span>')
                                .addClass('upcoming')
                                .append($('<span>')
                                    .addClass('symbol')
                                    .html(weatherSymbols[condition]))
                            .append($('<span>')
                                .addClass('forecast-data')
                                .html(`${low}&#176/${high}&#176`))
                                .append($('<span>')
                                    .addClass('forecast-data')
                                    .text(condition)));
                    }
                }
            }
        }
        function handleError() {
            $('#forecast')
                .css('display', 'block')
                .text("Error")

        }
    }
}