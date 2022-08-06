function DrawFourier() {
}

function GetFrourier(a1, a5, a10, a25, a50) {
    var values = [];
    for (var i = 0; i <= 1000; i++) {
        var x = i / (1000) * 2 * Math.PI;
        y = a1 * Math.sin(x) + a5 * Math.sin(5 * x) + a10 * Math.sin(10 * x)
            + a25 * Math.sin(25 * x) + a50 * Math.sin(50 * x);
        value = { x: x, y: y };
        values.push(value);
    }

    return values;
}

function InitializeGraph() {
    var ctx = document.getElementById('ex_chart');
    var answerCoefficients = GetRandomCoefficients();
    var data = {
        datasets: [{
            radius: 0,
            label: "フーリエ関数",
            data: GetFrourier(0.5, 0.5, 0.5, 0.5, 0.5),
            showLine: true,
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132)'
        },
        {
            radius: 0,
            label: "フーリエ関数",
            data: GetFrourier(answerCoefficients[0], answerCoefficients[1], answerCoefficients[2], answerCoefficients[3], answerCoefficients[4]),
            showLine: true,
            fill: false,
            borderColor: 'rgb(0, 0, 0)',
            backgroundColor: 'rgb(255, 99, 132)'
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
                    max: 2 * Math.PI
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
        legend: {
            labels: {
                filter: function (items) {
                    return items.datasetIndex != 1;
                }
            }
        }
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
    chart.data.datasets[0].data = GetFrourier(a1, a2, a5, a10, a20);
    chart.update();
}