function DrawFourier() {
}

function GetFrourier(a1, a2, a5, a10, a20) {
    var values = [];
    for (var i = 0; i <= 1000; i++) {
        var x = i / (1000) * 2 * Math.PI;
        y = a1 * Math.sin(x) + a2 * Math.sin(2 * x) + a5 * Math.sin(5 * x)
            + a10 * Math.sin(10 * x) + a20 * Math.sin(20 * x);
        value = { x: x, y: y };
        values.push(value);
    }

    return values;
}

function InitializeGraph() {
    GetFrourier();
    var ctx = document.getElementById('ex_chart');

    var data = {
        datasets: [{
            radius: 0,
            label: "フーリエ関数",
            data: GetFrourier(1, 1, 1, 1, 1),
            showLine: true,
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132)'
        }],
    };

    var config = {
    };

    var ex_chart = new Chart(ctx, {
        type: 'scatter',
        data: data,
        options: config
    });
}