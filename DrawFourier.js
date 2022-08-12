const PLOT_NUMBER = 10000;
const Two_PI = 2 * Math.PI;
const ANSWER_THRETHOLD = 0.01;

var correctAnswers;
var minCoefficient = 0;
var maxCoefficient = 1;
var coefficientStep = 0.25;
var cycles = [];

function GetFrourier(_coefficients) {
    var values = [];
    for (var i = 0; i <= PLOT_NUMBER; i++) {
        var x = i / (PLOT_NUMBER) * 2 * Math.PI;
        var y = 0;
        for (var j = 0; j < _coefficients.length; j++) {
            y += _coefficients[j] * Math.sin(cycles[j] * x);
        }
        values.push({ x: x, y: y });
    }

    return values;
}

function GetInitialHintData() {
    var values = [];
    for (var i = 0; i <= PLOT_NUMBER; i++) {
        var x = i / PLOT_NUMBER * Two_PI;
        var y = null;
        values.push({ x: x, y: y });
    }

    return values;
}

function InitializeGame(_minCoefficient, _maxCoefficient, _coefficientStep, _cycles) {
    minCoefficient = _minCoefficient;
    maxCoefficient = _maxCoefficient;
    coefficientStep = _coefficientStep;
    cycles = _cycles;

    SetCorrectAnswers();

    return InitializeGraph();
}

function InitializeGraph() {
    var ctx = document.getElementById('ex_chart');
    var data = {
        datasets: [{
            radius: 1,
            label: "Hint",
            data: GetInitialHintData(),
            order: 1,
            showLine: false,
            fill: false,
            borderColor: "#2cb67d",
            backgroundColor: "#2cb67d",
            hoverRadius: 1.5
        }, {
            radius: 0,
            label: "Answer",
            data: GetFrourier([0.5, 0.5, 0.5, 0.5, 0.5]),
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
            enabled: false,
        },
    };

    var ex_chart = new Chart(ctx, {
        type: 'scatter',
        data: data,
        options: config
    });
    return ex_chart;
}

function SetCorrectAnswers() {
    var coefficients = [];
    var choiceNumber = (maxCoefficient - minCoefficient) / coefficientStep + 1;
    for (let i = 0; i < 5; i++) {
        var randomValue = Math.random() * choiceNumber;
        var coefficient = Math.floor(randomValue) * coefficientStep;
        coefficients.push(coefficient);
    }
    correctAnswers = coefficients;
}

function ChangeGraph(_chart, _coefficients) {
    _chart.data.datasets[1].data = GetFrourier(_coefficients);
    _chart.update();
}

function UpdateHintData(_hintData, _coefficients) {
    var correctAnswerFrourier = GetFrourier(correctAnswers);
    var checkFrourier = GetFrourier(_coefficients);

    for (var i = 0; i < _hintData.length; i++) {
        if (Math.abs(correctAnswerFrourier[i].y - checkFrourier[i].y) < ANSWER_THRETHOLD) {
            _hintData[i] = { x: correctAnswerFrourier[i].x, y: correctAnswerFrourier[i].y };
        }
    }
}

function UpdateHintGraph(_chart, _coefficients) {
    UpdateHintData(_chart.data.datasets[0].data, _coefficients);
    _chart.update();
}

function GetScore(_chart) {
    var hintData = chart.data.datasets[0].data;
    var answerCount = 0;
    for (var i = 0; i < hintData.length; i++) {
        if (hintData[i].y != null)
            answerCount++;
    }
    return (answerCount / hintData.length * 100).toPrecision(3);
}

function GetAnswerStatuses(_answerCoefficients) {
    var choiceNumber = (maxCoefficient - minCoefficient) / coefficientStep + 1;
    var correctCounts = Array(choiceNumber).fill(0);
    correctAnswers.forEach(correctAnswer => {
        correctCounts[correctAnswer / coefficientStep]++;
    });

    var answerStatuses = [0, 0, 0, 0, 0];

    for (var i = 0; i < 5; i++) {
        var answerIndex = _answerCoefficients[i] / coefficientStep;
        if (_answerCoefficients[i] == correctAnswers[i]) {
            answerStatuses[i] = 2;
            correctCounts[answerIndex]--;
        }
    }

    for (var i = 0; i < 5; i++) {
        var answerIndex = _answerCoefficients[i] / coefficientStep;
        if (correctCounts[answerIndex] > 0 && answerStatuses[i] == 0) {
            answerStatuses[i] = 1;
            correctCounts[answerIndex]--;
        }
    }

    return answerStatuses;
}


