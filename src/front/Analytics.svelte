<script>

    async function loadGraph(){


        var sales = [];
        var nhs = [];
        var accs = [];

        const dataAdri = await fetch("/api/v1/lottery-sales");
        const jsonAdri  =await dataAdri.json();

        const dataAlvaro = await fetch("/api/v1/not-hospitalized-stats");
        const jsonAlvaro  =await dataAlvaro.json();

        const dataLeandro = await fetch("/api/v2/accstats");
        const jsonLeandro  =await dataLeandro.json();
        
        

        for (var i in jsonAdri) {
            if(jsonAdri[i]["year"]==2014){
            var a;
            var b;
            var sale = {name:a,value:b};
            sale.name = jsonAdri.map(function(d) { return d["province"] })[i];
            sale.value = jsonAdri.map(function(d) { return d["kid"] })[i];
            console.log(sale);
            sales.push(sale);
            } 
            
        } 
        
        for (var i in jsonAlvaro) {
            if(jsonAlvaro[i]["year"]==2014){
            var a;
            var b;
            var nh = {name:a,value:b};
            nh.name = jsonAlvaro.map(function(d) { return d["province"] })[i];
            nh.value = jsonAlvaro.map(function(d) { return d["total"] })[i];
            nhs.push(nh);
            } 
            
        }

        for (var i in jsonLeandro) {
            if(jsonLeandro[i]["year"]==2014){
            var a;
            var b;
            var acc = {name:a,value:b};
            acc.name = jsonLeandro.map(function(d) { return d["province"] })[i];
            acc.value = jsonLeandro.map(function(d) { return d["accvictotal"] })[i];
            accs.push(acc);
            } 
            
        }

        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '80%'
            },
            title: {
                text: 'Grafica de grupo'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '10%',
                    maxSize: '70%',
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        splitSeries: true,
                        gravitationalConstant: 0.02
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 250
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                }
            },
            series: [{
                        name: 'Ventas de navidad',
                        data: sales
                    },
                    {
                        name: 'Accidentes totales',
                        data: nhs
                    },
                    {
                        name: 'Victimas totales',
                        data: accs
                    }]
});
    }
    
    
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>


<main>
    
    <h1>
         ¡ Aquí va la gráfica grupal !
    </h1>
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>

</main>

