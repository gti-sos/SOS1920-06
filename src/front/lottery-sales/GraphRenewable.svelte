<script>

async function loadGraph(){

    var sales = [];
    var stats = [];

    const dataAdri = await fetch("/api/v2/lottery-sales");
    const jsonAdri  =await dataAdri.json();

    for (var i in jsonAdri) {
            if(jsonAdri[i]["year"]==2017){
            var a;
            var b;
            var sale = {name:a,y:b};
            sale.name = jsonAdri.map(function(d) { return d["province"] })[i];
            sale.y = jsonAdri.map(function(d) { return d["xmas"]/1000000})[i];
            sales.push(sale);
            } 
            
        }
    
        const dataOther = await fetch("https://sos1920-09.herokuapp.com/api/v4/renewable-sources-stats");
        const jsonOther  =await dataOther.json();

        for (var i in jsonOther) {
                if(jsonOther[i]["year"]==2017){
                var a;
                var b;
                var stat = {name:a,y:b};
                stat.name = jsonOther.map(function(d) { return d["country"] })[i];
                stat.y = jsonOther.map(function(d) { return d["percentage-hydropower-total"] })[i];
                sales.push(stat);
                console.log(sales);

                } 
                
            }

            Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: '2017, ventas de navidad y uso de energias hidroelectricas'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Porcentaje',
        colorByPoint: true,
        data: sales
    }]
});


}




</script>

<svelte:head>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <h1>INTEGRACION GRUPO 9 </h1>
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>
</main>




