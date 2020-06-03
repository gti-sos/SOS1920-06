<script>
    async function loadGraph(){
        var total = [];
        let MyData = [];
        let YourData = [];
        const resData = await fetch("/api/v2/not-hospitalized-stats?year=2015");
        const resDataOtro = await fetch("/api/v1/roads");
        MyData = await resData.json();
        YourData = await resDataOtro.json();
        for (var i in MyData) {
            var aux = [];
            aux.push(MyData.map(function(d) { return d["province"]})[i]);
            aux.push(MyData.map(function(d) { return d["year"]})[i]);
            aux.push(MyData.map(function(d) { return d["total"]})[i]);
            total.push(aux); 
        }
        for (var i in YourData) {
            var auxOther = [];
            auxOther.push(YourData.map(function(d) { return d["province"]})[i]);
            auxOther.push(YourData.map(function(d) { return d["year"]})[i]);
            auxOther.push(YourData.map(function(d) { return d["oneway"]})[i]);
            total.push(auxOther); 
        }
        console.log(total);
        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Integration with G4 api roads'
            },
            subtitle: {
                text: 'SOS'
            },
            xAxis: {
                categories: [total[0][0],total[1][0],total[2][0],total[3][0],total[4][0],total[5][0]],
                title: {
                    text: "Provinces"
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total ',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' totals'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: total[0][1],
                data: [total[0][2], 0,0,total[3][2],0,0]
            }, {
                name: total[1][1],
                data: [0,total[1][2], 0,0,total[4][2],0]
            }, {
                name: total[2][1],
                data: [0,0,total[2][2],0,0,0]
            }, {
                name: total[5][1],
                data: [0,0,0,0,0,total[5][2]]
            }]
        });
    }

</script>
<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"  on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Bar chart showing horizontal columns. This chart type is often
            beneficial for smaller screens, as the user can scroll through the data
            vertically, and axis labels are easy to read.
        </p>
    </figure>
</main>