const PLOT_NUMBER = 10000;
const Two_PI = 2 * Math.PI;
const ANSWER_THRETHOLD = 0.01;

var correctAnswers;
var minCoefficient = 0;
var maxCoefficient = 1;
var coefficientStep = 0.25;

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

function InitializeGraph(_minCoefficient, _maxCoefficient, _coefficientStep) {
    minCoefficient = _minCoefficient;
    maxCoefficient = _maxCoefficient;
    coefficientStep = _coefficientStep;

    correctAnswers = GetRandomCoefficients();
    console.log(correctAnswers[0], correctAnswers[1], correctAnswers[2], correctAnswers[3], correctAnswers[4]);

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
    var choiceNumber = (maxCoefficient - minCoefficient) / coefficientStep + 1;
    for (let i = 0; i < 5; i++) {
        var randomValue = Math.random() * choiceNumber;
        var coefficient = Math.floor(randomValue) * coefficientStep;
        coefficients.push(coefficient);
    }

    return coefficients;
}

function ChangeGraph(chart, a1 = 0.5, a2 = 0.5, a5 = 0.5, a10 = 0.5, a20 = 0.5) {
    chart.data.datasets[1].data = GetFrourier(a1, a2, a5, a10, a20);
    chart.update();
}

function UpdateHintData(hintData, a1, a5, a10, a25, a50) {
    var answerFrourier = GetFrourier(correctAnswers[0], correctAnswers[1], correctAnswers[2], correctAnswers[3], correctAnswers[4]);
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

function GetScore() {
    hintData = chart.data.datasets[0].data;
    var answerCount = 0;
    for (var i = 0; i < hintData.length; i++) {
        if (hintData[i].y != null)
            answerCount++;
    }
    return (answerCount / hintData.length * 100).toPrecision(3);
}

function GetAnswerStatuses(a1, a2, a5, a10, a20) {
    var choiceNumber = (maxCoefficient - minCoefficient) / coefficientStep + 1;
    var correctCounts = Array(choiceNumber).fill(0);
    correctAnswers.forEach(correctAnswer => {
        correctCounts[correctAnswer / coefficientStep]++;
    });

    var answers = [a1, a2, a5, a10, a20];
    var answerStatuses = [0, 0, 0, 0, 0];

    for (var i = 0; i < 5; i++) {
        var answerIndex = answers[i] / coefficientStep;
        if (answers[i] == correctAnswers[i]) {
            answerStatuses[i] = 2;
            correctCounts[answerIndex]--;
        }
    }

    for (var i = 0; i < 5; i++) {
        var answerIndex = answers[i] / coefficientStep;
        if (correctCounts[answerIndex] > 0 && answerStatuses[i] == 0) {
            answerStatuses[i] = 1;
            correctCounts[answerIndex]--;
        }
    }

    return answerStatuses;
}


