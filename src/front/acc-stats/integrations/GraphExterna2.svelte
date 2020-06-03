<script>

import Button from "sveltestrap/src/Button.svelte";
import { pop } from "svelte-spa-router";

async function loadGraph(){

    
    var ctg = [];
    var accVictotal = [];
    var accVicinter = [];
    var accFall = [];

    var ctg2 = [];
    var flight_number = [];
    var mission_name = [];


    const resData = await fetch("/api/v2/accstats");
    const json = await resData.json();
    const yourData = await fetch("https://api.spacexdata.com/v3/launches");
    const json2 = await yourData.json(); 

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

    for (var i in json2) {
        if (json2[i]["launch_year"]<2010) {
	        if(ctg.includes(json2[i]["launch_year"])){
	            var index = ctg.indexOf(json2[i]["launch_year"]);
	            flight_number.splice(index,1,accVictotal[index]+json2[i]["flight_number"]);
	            mission_name.splice(index,1,accVictotal[index]+json2[i]["mission_name"]);

	        }else{
	            ctg.push(json2.map(function(d) { return d["launch_year"]})[i]);
	            flight_number.push(json2.map(function(d) { return d["flight_number"] })[i]);
	            mission_name.splice(index,1,accVictotal[index]+json2[i]["mission_name"]);

	        }        
	     }
	}

    Highcharts.chart('container', {
    chart: {
        type: 'area'
    },
    title: {
        text: 'Gráfica sobre accidentes de tráficos en vías urbanas e interurbanas en comparación con cervecerías'
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
            text: 'Número de accidentes y vuelos'
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
    	name: 'Número de vuelos',
    	data: flight_number
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
            Gráfica sobre la variación por año entre accidentes junto con los números de vuelos realizados por la NASA
        </p>
    </figure>
    <Button style="margin-left: 50%"color="success" on:click="{pop}">Volver atrás</Button>
</main>