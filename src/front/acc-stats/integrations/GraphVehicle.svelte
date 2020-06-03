<script>

import Button from "sveltestrap/src/Button.svelte";
import { pop } from "svelte-spa-router";

async function loadGraph(){

    //..Cogiendo los datos de mi API
    var ctg = [];
    var accVictotal = [];
    var accVicinter = [];
    var accFall = [];

    const resData = await fetch("/api/v2/accstats");
    const json = await resData.json();

    for (var i in json) {
        if (json[i]["year"]<2019) {
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

    //..Cogiendo los datos de su API
    var ctg2 = [];
    var pevStock = [];
    var annualSale = [];
    var carsPer1000 = [];
    const yourResData = await fetch("/api/v3/plugin-vehicles-stats");
    const json2 = await yourResData.json();

    for (var i in json2) {
        if (json[i]["year"]<2016) {
        if(ctg2.includes(json2[i]["year"])){
            var index = ctg2.indexOf(json2[i]["year"]);
            pevStock.splice(index,1,pevStock[index]+json2[i]["pev-stock"]);
            annualSale.splice(index,1,annualSale[index]+json2[i]["annual-sale"]);
            carsPer1000.splice(index,1,carsPer1000[index]+json2[i]["cars-per-1000"]);
        }else{
            ctg2.push(json2.map(function(d) { return d["years"]})[i]);
            pevStock.push(json2.map(function(d) { return d["pev-stock"] })[i]);
            annualSale.push(json2.map(function(d) { return d["annual-sale"] })[i]);
            carsPer1000.push(json2.map(function(d) { return d["cars-per-1000"] })[i]);
        }        
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
        text: 'Gráficas entre plugin-vehicles-stats y accstats'
    },
    xAxis: {
        categories: ['2014', '2015', '2016', '2017', '2018', '2019'],
        tickmarkPlacement: 'on',
        title: {
            enabled: false
        }
    },
    yAxis: {
        title: {
            text: 'Número de accidentes junto con los datos de la API plugin-vehicles-stats'
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
        name: 'PevStock',
        data: pevStock
    }, {
        name: 'Annual Sale',
        data: annualSale
    }, {
        name: 'Cars per 10000',
        data: carsPer1000
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