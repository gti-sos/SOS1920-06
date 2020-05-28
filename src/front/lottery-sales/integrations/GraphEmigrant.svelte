<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {
            pop
        } from "svelte-spa-router";

async function loadGraph(){

//Lineas del grafico de ventas totales
var allLines = [];

//fetch a todos los recursos
const all = await fetch("/api/v2/lottery-sales");
const json  =await all.json();

const all1 = await fetch("/api/v2/emigrants-stats");
const json1  =await all1.json();

//Iteramos los datos del json devuelto
for (var i in json) {
    var lineTotal = [];
    //Creamos un array por elemento del json de la forma [Madrid,2017,4959]
    lineTotal.push(json.map(function(d) { return d["province"]})[i]);
    lineTotal.push(json.map(function(d) { return d["year"]})[i]);
    lineTotal.push(json.map(function(d) { return d["total"]/100})[i]);
    //Añadimos la linea al array de todas
    allLines.push(lineTotal);     
  }

  for (var i in json1) {
    var line1 = [];
    //Creamos un array por elemento del json de la forma [Madrid,2017,4959]
    line1.push(json1.map(function(d) { return d["country"]})[i]);
    line1.push(json1.map(function(d) { return d["year"]})[i]);
    line1.push(json1.map(function(d) { return d["em_totals"]})[i]);
    //Añadimos la linea al array de todas
    allLines.push(line1);     
  }

Highcharts.chart('container', {
    title: {
        text: 'Ventas totales de loteria y emigrantes totales'
    },
    accessibility: {
        point: {
            valueDescriptionFormat: '{index}. From {point.from} to {point.to}: {point.weight}.'
        }
    },
    series: [{
        keys: ['from', 'to', 'weight'],
        data: allLines,
        type: 'dependencywheel',
        name: 'Total',
        dataLabels: {
            color: '#333',
            textPath: {
                enabled: true,
                attributes: {
                    dy: 10
                }
            },
            distance: 5
        },
        size: '100%'
    }]

});
}


</script>

<svelte:head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/sankey.js"></script>
<script src="https://code.highcharts.com/modules/dependency-wheel.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
<figure class="highcharts-figure">
<div id="container"></div>
<p class="highcharts-description">
    Gráfica rueda de ventas totales y emigrantes totales
</p>
</figure>
<Button outline color="secondary" on:click="{pop}">Atrás</Button>
<!--
<figure class="highcharts-figure">
<div id="container2"></div>
<p class="highcharts-description">
    Gráfica rueda de ventas de navidad
</p>
</figure>
<figure class="highcharts-figure">
<div id="container3"></div>
<p class="highcharts-description">
    Gráfica rueda de ventas del niño
</p>
</figure>
-->
</main>