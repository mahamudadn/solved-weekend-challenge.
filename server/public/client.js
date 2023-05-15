let currentOpperation;

$(document).ready(onReady);

function onReady() {

    $('#equation-form').on('click', '.opperation', updateCurrentOpperation);
    $('#calculate').on('click', sendToServer); // Event Listner for calculate button.
    $('#clear').on('click', clearInput);

    getEquationsAndAddToPage();
}

function clearInput(event) {
    event.preventDefault();

    $('#number-one').val('');
    $('#number-two').val('');
}

function updateCurrentOpperation(event) {
    event.preventDefault();
    currentOpperation = $(this).text();
    console.log('updated currentOpperation:', currentOpperation);
}

function getEquationsAndAddToPage() {
    $.ajax({
        method: 'GET',
        url: '/equation',
    }).then(
        function (response) {  // array of eqution objs {num1, opperation, num2, answer}

            // let equation = {
            //     num1: num1,
            //     opperation: opperation,
            //     num2, num2,
            //     answer, answer
            // }

            $('#equation-history').empty();

            let newestAnswer = response[response.length - 1].answer;
            $('#newest-answer').text(`${newestAnswer}`);

            for (let equation of response) {
                let equationString = `${equation.num1} ${equation.opperation} ${equation.num2} = ${equation.answer}`;

                $('#equation-history').append(`<li>${equationString}</li>`);
            }

        }).catch(
            function (error) {
                console.log('GET /equation call failed');
                console.log('error:', error);
            });
}

function sendToServer(event) {
    event.preventDefault();

    // Put together the equation data
    let equation = {
        num1: $("#number-one").val(),
        num2: $("#number-two").val(),
        opperation: currentOpperation
    };

    console.log('equation:', equation);

    // send the data
    $.ajax({
        method: 'POST',
        url: '/equation',
        data: equation  // The value of data needs to be an object
    }).then(
        function (response) {
            getEquationsAndAddToPage()
        }
    ).catch(
        function (error) {
            console.log('POST /equation call failed');
            console.log('error:', error);
        }
    )
}
