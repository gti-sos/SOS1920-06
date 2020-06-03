<script>

import Button from "sveltestrap/src/Button.svelte";
import { pop } from "svelte-spa-router";

async function loadGraph(){

    
    var ctg = [];
    var accVictotal = [];
    var accVicinter = [];
    var accFall = [];

    var ctg2 = [];
    var natality_totals = [];
    var natality_men = [];
    var natality_women = [];

    const resData = await fetch("/api/v2/accstats");
    const json = await resData.json();
    const yourResData = await fetch("/api/v2/natality-stats");
    const json2 = await yourResData.json();

    for (var i in json) {
        if (json[i]["year"]<2016) {
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
 }

    for (var i in json2) {
        if(ctg2.includes(json2[i]["year"])){
            var index = ctg2.indexOf(json2[i]["year"]);
            natality_totals.splice(index,1,natality_totals[index]+json2[i]["natality_totals"]);
            natality_men.splice(index,1,natality_men[index]+json2[i]["natality_men"]);
            natality_women.splice(index,1,natality_women[index]+json2[i]["natality_women"]);
        }else{
            ctg2.push(json2.map(function(d) { return d["year"]})[i]);
            natality_totals.push(json2.map(function(d) { return d["natality_totals"] })[i]);
            natality_men.push(json2.map(function(d) { return d["natality_men"] })[i]);
            natality_women.push(json2.map(function(d) { return d["natality_women"] })[i]);
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
        text: 'Accstats con natality stats'
    },
    xAxis: {
        categories: ['2014', '2015', '2016'],
        tickmarkPlacement: 'on',
        title: {
            enabled: false
        }
    },
    yAxis: {
        title: {
            text: 'Número de accidentes junto con los datos de la API natality-stats'
        },
        labels: {
            formatter: function () {
                return this.value / 1000;
            }
        }
    },
    tooltip: {
        split: true,
        valueSuffix: ' datos'
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
    }, {
        name: 'Natality totals',
        data: natality_totals
    }, {
        name: 'Natality men',
        data: natality_men
    }, {
        name: 'natality_women',
        data: natality_women
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