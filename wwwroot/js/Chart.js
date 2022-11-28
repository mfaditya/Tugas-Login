//Chart JS
//$(document).ready(function () {
//    $.ajax({
//        url: 'https://localhost:7213/api/Department',
//        dataSrc: 'data',
//        type: "GET",
//        success: function (data) {
//            console.log(data);
//            var length = data.data.length;
//            var label = [];
//            var value = [];
//            for (i = 0; i < length; i++) {
//                label.push(data.data[i].name);
//                value.push(data.data[i].divisionId);
//            }
//            var ctx = document.getElementById('pieChart').getContext('2d');
//            var chart = new Chart(ctx, {
//                type: 'pie',
//                data: {
//                    labels: label,
//                    datasets: [{
//                        label: 'Jumlah ID',
//                        backgroundColor: 'rbg(255, 205, 86)',
//                        borderColor: 'rgb(255, 255, 255)',
//                        data: value
//                    }]
//                },
//                options: {}
//            });
//        }
//    });
//});

//Chart Apex
$(document).ready(function () {
    $.ajax({
        url: 'https://localhost:7213/api/Department',
        headers: {
            'Authorization': "Bearer " + sessionStorage.getItem("token")
        },
    }).done((data) => {
        console.log(data);
        var DivisionId = data.data
            .map(x => ({ divisionId: x.divisionId }));
        var { divisionId1, divisionId2, divisionId3 } = DivisionId.reduce((previous, current) => {
            if (current.divisionId === 1) {     // spread operator
                // spread untuk memecah array-nya 
                return { ...previous, divisionId1: previous.divisionId1 + 1 }
            }
            //console.log(previous, "ytt+otak");
            if (current.divisionId === 2) {
                return { ...previous, divisionId2: previous.divisionId2 + 1 }
            }
            if (current.divisionId === 3) {
                return { ...previous, divisionId3: previous.divisionId3 + 1 }
            }
        }, { divisionId1: 0, divisionId2: 0, divisionId3: 0 })

        var options = {
            series: [divisionId1, divisionId2, divisionId3],
            chart: {
                width: 500,
                height: '250%',
                type: 'pie',
            },
            labels: ['Division Id: 1', 'Division Id: 2', 'Division Id: 3'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 500
                    },
                    legend: {
                        show: true,
                        position: 'right',
                    }
                }
            }]
        };

        var options2 = {
            series: [{
                data: [divisionId1, divisionId2, divisionId3],
            }],
            chart: {
                height: 350,
                type: 'bar',
                events: {
                    click: function (chart, w, e) {
                        // console.log(chart, w, e)
                    }
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            xaxis: {
                categories: [
                    ['Division Id: 1'],
                    ['Division Id: 2'],
                    ['Division Id: 3'],
                ],
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            }
        };

        var chartPie = new ApexCharts(document.querySelector("#pieChart"), options);
        chartPie.render();
        var chartBar = new ApexCharts(document.querySelector("#barChart"), options2);
        chartBar.render();
    });
});