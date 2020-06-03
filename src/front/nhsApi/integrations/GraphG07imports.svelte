<script>
    async function loadGraph(){
        var total = [];
        let MyData = [];
        let YourData = [];
        const resData = await fetch("/api/v2/not-hospitalized-stats?year=2015");
        const resDataOtro = await fetch("https://sos1920-07.herokuapp.com/api/v2/imports");
        MyData = await resData.json();
        YourData = await resDataOtro.json();
        for (var i in MyData) {
            var aux = [];
            aux.push(MyData.map(function(d) { return d["province"]})[i]);
            aux.push(MyData.map(function(d) { return d["urban"]})[i]);
            aux.push(MyData.map(function(d) { return d["year"]})[i]);
            total.push(aux); 
        }
        for (var i in YourData) {
            var auxOther = [];
            auxOther.push(YourData.map(function(d) { return d["country"]})[i]);
            auxOther.push(YourData.map(function(d) { return d["gdaethylalcohol"]})[i]);
            auxOther.push(YourData.map(function(d) { return d["year"]})[i]);

            total.push(auxOther); 
        }
        console.log(total);
        Highcharts.chart('container', {
            chart: {
                type: 'variwide'
            },

            title: {
                text: 'Integration with G07 api imports'
            },

            xAxis: {
                type: 'category'
            },

            yAxis: {
                name: 'Valor totales'
            },

            caption: {
                text: 'Province'
            },

            legend: {
                enabled: false
            },

            series: [{
                name: 'Total',
                data: total,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.0f}'
                },
                tooltip: {
                    pointFormat: 'Urban and gdaethylalcohol: <b> {point.y}</b><br>' +
                        'Año: <b> {point.z} </b><br>'
                },
                colorByPoint: true
            }]
        });
    }

</script>
<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/variwide.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"  on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Variwide charts can be used to visualize a second dimension
            in a column chart. Each data point is given a weight, in
            addition to its value, determining the width of the column.
            In this chart, the Y-Axis represents the labor cost of the
            country, while the column width is proportional to the
            country's GDP.
        </p>
    </figure>
</main>