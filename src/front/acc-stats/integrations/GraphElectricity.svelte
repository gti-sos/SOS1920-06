<script>

import Button from "sveltestrap/src/Button.svelte";
import { pop } from "svelte-spa-router";


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

    var ctg2 = [];
    var state = [];
    var solar = [];
    var solarDiv = [];
    var hydro = [];
    var coal = [];
    var hydroDiv = [];
    var coalDiv = [];

    const yourResData = await fetch("api/v2/electricity-produced-stats");
    const json2 = await yourResData.json();

    for (var i in json2) {
        if(ctg2.includes(json2[i]["year"])){
            var index = ctg2.indexOf(json2[i]["year"]);
            state.splice(index,1,state[index]+json2[i]["state"]);
            solar.splice(index,1,solar[index]+json2[i]["solar"]/1000);
            hydro.splice(index,1,hydro[index]+json2[i]["hydro"]);
        }else{
            ctg2.push(json2.map(function(d) { return d["year"]})[i]);
            state.push(json2.map(function(d) { return d["state"] })[i]);
            solar.push(json2.map(function(d) { return d["solar"] })[i]);
            hydro.push(json2.map(function(d) { return d["hydro"] })[i]);
        }        
     }    

     //Funciones proporcionadas por Ángel


    Highcharts.chart('container', {
    chart: {
        type: 'area'
    },
    title: {
        text: 'Gráfica sobre accidentes de tráficos en vías urbanas e interurbanas'
    },
    subtitle: {
        text: '[OJO] Él al tener unos datos con una gran cantidad de números la gráfica no sale con líneas'
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
            text: 'Número de accidentes junto con los datos de la API electricity-produced-stats'
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
        name: 'Plantas solares',
        data: solar
    }]
});
}

window.alert("Esta API integrada tiene más de 33 millones de datos. Por eso mismo, a no ser que se introduzca una función para minimizar esos datos sólo nos saldrá la del principio, pues es la que menos datos tiene.");

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