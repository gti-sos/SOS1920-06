<script>
        import Button from "sveltestrap/src/Button.svelte";
        import {
                pop
            } from "svelte-spa-router";

async function loadGraph(){

    //Lineas del grafico de ventas totales
    var allLinesTotal = [];
    /*
    var allLinesXmas = [];
    var allLinesKid = [];
    */

    //fetch a todos los recursos
    const all = await fetch("/api/v2/lottery-sales");
    const json  =await all.json();
    //Iteramos los datos del json devuelto
    for (var i in json) {
        var lineTotal = [];
        /*
        var lineXmas = [];
        var lineKid = [];
        */

        //Creamos un array por elemento del json de la forma [Madrid,2017,4959]
        lineTotal.push(json.map(function(d) { return d["province"]})[i]);
        lineTotal.push(json.map(function(d) { return d["year"]})[i]);
        lineTotal.push(json.map(function(d) { return d["total"]})[i]);

        /*
        lineXmas.push(json.map(function(d) { return d["province"]})[i]);
        lineXmas.push(json.map(function(d) { return d["year"]})[i]);
        lineXmas.push(json.map(function(d) { return d["xmas"]})[i]);

        lineKid.push(json.map(function(d) { return d["province"]})[i]);
        lineKid.push(json.map(function(d) { return d["year"]})[i]);
        lineKid.push(json.map(function(d) { return d["kid"]})[i]);
        */

        //Añadimos la linea al array de todas
        allLinesTotal.push(lineTotal);
        /*
        allLinesXmas.push(lineXmas);
        allLinesKid.push(lineKid);
        */     
      }


    Highcharts.chart('container', {
        title: {
            text: 'Ventas totales de loteria'
        },
        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. From {point.from} to {point.to}: {point.weight}.'
            }
        },
        series: [{
            keys: ['from', 'to', 'weight'],
            data: allLinesTotal,
            type: 'dependencywheel',
            name: 'Ventas totales de loteria',
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
/*
    Highcharts.chart('container2', {

        title: {
            text: 'Ventas de navidad de loteria'
        },

        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. From {point.from} to {point.to}: {point.weight}.'
            }
        },
        series: [{
            keys: ['from', 'to', 'weight'],
            data: allLinesXmas,
            type: 'dependencywheel',
            name: 'Ventas de navidad de loteria',
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

    Highcharts.chart('container3', {
        title: {
            text: 'Ventas del niño de loteria'
        },
        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. From {point.from} to {point.to}: {point.weight}.'
            }
        },
        series: [{
            keys: ['from', 'to', 'weight'],
            data: allLinesKid,
            type: 'dependencywheel',
            name: 'Ventas del niño de loteria',
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
*/
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
        Gráfica rueda de ventas totales
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