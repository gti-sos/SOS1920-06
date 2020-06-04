<script>

import Button from "sveltestrap/src/Button.svelte";
import { pop } from "svelte-spa-router";

async function loadGraph(){

    
    var total = [];
    var MyData = [];
    const resData = await fetch("/api/v2/accstats");
    MyData = await resData.json();

    for (var i in MyData) {
            var aux = [];
            aux.push(MyData.map(function(d) { return d["province"]})[i]);
            aux.push(MyData.map(function(d) { return d["accvictotal"]})[i]);
            aux.push(MyData.map(function(d) { return d["year"]})[i]);
            aux.push(MyData.map(function(d) { return d["accvicinter"]})[i]);
            aux.push(MyData.map(function(d) { return d["accfall"]})[i]);
            total.push(aux); 
        }
    console.log(total);

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
        categories: [],
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
        data: total
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
    <Button style="margin-left: 50%"color="success" on:click="{pop}">Volver atrás</Button>
</main>