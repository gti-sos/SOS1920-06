<script>


async function loadGraph(){

    
    var ctg = [];
    var accVictotal = [];
    var accVicinter = [];
    var accFall = [];

    const resData = await fetch("/api/v2/accstats");
    const json = await resData.json();

    for (var i in json) {
        if(ctg.includes(json[i]["year"])){
            var index = ctg.indexOf(json[i]["year"]);
            accVictotal.splice(index,1,accVictotal[index]+json[i]["accvictotal"]);
            accVicinter.splice(index,1,accVicinter[index]+json[i]["accvicinter"]);
            accFall.splice(index,1,accFall[index]+json[i]["accfall"]);
        }else{
            ctg.push(json.map(function(d) { return d["year"]})[i]);
            accVictotal.push(json.map(function(d) { return d["accvictotal"] })[i]);
            accVicinter.push(json.map(function(d) { return d["accvicinter"] })[i]);
            accFall.push(json.map(function(d) { return d["accfall"] })[i]);
        }        
     }

    Highcharts.chart('container', {
    chart: {
        type: 'area'
    },
    title: {
        text: 'Gráfica sobre accidentes de tráficos en vías urbanas e interurbanas'
    },
    subtitle: {
        text: 'Fuente: Dirección General de Tráfico (DGT)'
    },
    xAxis: {
        categories: ['2014', '2015', '2016', '2017', '2018', '2019', '2020'],
        tickmarkPlacement: 'on',
        title: {
            enabled: false
        }
    },
    yAxis: {
        title: {
            text: 'Número de accidentes'
        },
        labels: {
            formatter: function () {
                return this.value / 1000;
            }
        }
    },
    tooltip: {
        split: true,
        valueSuffix: ' accidentes'
    },
    plotOptions: {
        area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666'
            }
        }
    },
    series: [{
        name: 'Accidentes con víctimas totales',
        data: accVictotal
    }, {
        name: 'Accidentes con víctimas en vías interurbanas',
        data: accVicinter
    }, {
        name: 'Accidentes con fallecidos',
        data: accFall
    }]
});
}

    
</script>

<svelte:head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/series-label.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Gráfica sobre la variación por año entre accidentes en vías interurbanas y urbanas
        </p>
    </figure>
</main>