var answerCoefficients;
const PLOT_NUMBER = 10000;
const Two_PI = 2 * Math.PI;
const ANSWER_THRETHOLD = 0.05;

function DrawFourier() {
}

function GetFrourier(a1, a5, a10, a25, a50) {
    var values = [];
    for (var i = 0; i <= PLOT_NUMBER; i++) {
        var x = i / (PLOT_NUMBER) * 2 * Math.PI;
        var y = a1 * Math.sin(x) + a5 * Math.sin(5 * x) + a10 * Math.sin(10 * x)
            + a25 * Math.sin(25 * x) + a50 * Math.sin(50 * x);
        var value = { x: x, y: y };
        values.push(value);
    }

    return values;
}

function GetInitializeData() {
    var values = [];
    for (var i = 0; i <= PLOT_NUMBER; i++) {
        var x = i / PLOT_NUMBER * Two_PI;
        var y = null;
        var value = { x: x, y: y };
        values.push(value);
    }

    return values;
}

function InitializeGraph() {
    answerCoefficients = GetRandomCoefficients();
    console.log(answerCoefficients[0], answerCoefficients[1], answerCoefficients[2], answerCoefficients[3], answerCoefficients[4]);

    var ctx = document.getElementById('ex_chart');
    var data = {
        datasets: [{
            radius: 1,
            data: GetInitializeData(),
            order: 1,
            showLine: false,
            fill: false,
            borderColor: 'rgb(0, 0, 0)',
            backgroundColor: 'rgb(0, 0, 0)',
            hoverRadius: 1.5
        }, {
            radius: 0,
            label: "フーリエ関数",
            data: GetFrourier(0.5, 0.5, 0.5, 0.5, 0.5),
            order: 1,
            showLine: true,
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132)',
            hoverRadius: 1.5
        }],
    };

    var config = {
        animation: {
            duration: 1
        },
        scales: {
            xAxes: [{
                ticks: {
                    min: 0,
                    max: Two_PI
                }
            }],
            yAxes: [{
                ticks: {
                    min: -4,
                    max: 4
                }
            }],
        },
        tooltips: {
            enabled: false
        },
    };

    var ex_chart = new Chart(ctx, {
        type: 'scatter',
        data: data,
        options: config
    });

    return ex_chart;
}

function GetRandomCoefficients() {
    var coefficients = [];
    for (let i = 0; i < 5; i++) {
        var randomValue = Math.random();
        var coefficient;
        if (randomValue < 0.2)
            coefficient = 0;
        else if (randomValue < 0.4)
            coefficient = 0.25;
        else if (randomValue < 0.6)
            coefficient = 0.5;
        else if (randomValue < 0.8)
            coefficient = 0.75;
        else
            coefficient = 1.0;
        coefficients.push(coefficient);
    }

    return coefficients;
}

function ChangeGraph(chart, a1 = 0.5, a2 = 0.5, a5 = 0.5, a10 = 0.5, a20 = 0.5) {
    chart.data.datasets[1].data = GetFrourier(a1, a2, a5, a10, a20);
    chart.update();
}

function UpdateHintData(hintData, a1, a5, a10, a25, a50) {
    var answerFrourier = GetFrourier(answerCoefficients[0], answerCoefficients[1], answerCoefficients[2], answerCoefficients[3], answerCoefficients[4]);
    var checkFrourier = GetFrourier(a1, a5, a10, a25, a50);

    var hintValues = [];
    for (var i = 0; i < hintData.length; i++) {
        if (Math.abs(answerFrourier[i].y - checkFrourier[i].y) < ANSWER_THRETHOLD) {
            value = { x: answerFrourier[i].x, y: answerFrourier[i].y };
            hintData[i] = value;
        }
    }
}

function UpdateHintGraph(chart, a1 = 0.5, a2 = 0.5, a5 = 0.5, a10 = 0.5, a20 = 0.5) {
    UpdateHintData(chart.data.datasets[0].data, a1, a2, a5, a10, a20);
    chart.update();
}
