$.ajax({
    type: 'GET',
    url: 'https://wakatime.com/share/@be3a3e41-13fd-45af-9359-ab80bf63e454/dd3112ee-e32b-4be6-b582-4933a2165408.json',
    dataType: 'jsonp',
});

var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Accepted", "Pending", "Rejected"],
        datasets: [{
            data: [70, 10, 6],
            borderColor: [
                "#3cba9f",
                "#ffa500",
                "#c45850",
            ],
            backgroundColor: [
                "rgb(60,186,159,0.1)",
                "rgb(255,165,0,0.1)",
                "rgb(196,88,80,0.1)",
            ],
            borderWidth: 2,
        }]
    },
    options: {
        scales: {
            xAxes: [{
                display: false,
            }],
            yAxes: [{
                display: false,
            }],
        }
    },

});
