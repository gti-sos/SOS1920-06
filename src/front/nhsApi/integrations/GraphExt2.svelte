<script>
    async function loadGraph(){
        var total = [];
        let MyData = [];
        let YourData = [];
        const resData = await fetch("/api/v2/not-hospitalized-stats/Madrid");
        const resDataOtro = await fetch("https://restcountries.eu/rest/v2/all");
        MyData = await resData.json();
        YourData = await resDataOtro.json();
        for (var i in MyData) {
            var aux = [];
            aux.push(MyData.map(function(d) { return d["province"]})[i]);
            aux.push(MyData.map(function(d) { return d["total"]})[i]);
            total.push(aux); 
        }
        for (var i in YourData) {
            var auxOther = [];
            auxOther.push(YourData.map(function(d) { return d["name"]})[i]);
            auxOther.push(YourData.map(function(d) { return d["population"]})[i]);
            total.push(auxOther); 
        }
        console.log(total);
        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Integration with api externa 2'
            },
            subtitle: {
                text: 'Source: Sos y https://restcountries.eu/rest/v2/all'
            },
            xAxis: {
                categories: [total[0][0],total[2][0],total[28][0]],
                title: {
                    text: "Provinces and population"
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'totals and countries',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' totals and population'
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
                data: [total[0][1], total[2][1],total[28][1]]
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
