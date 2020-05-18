<script>

async function loadGrapghByYear(){
    var ctg = [];
    var salesTotal = [];
    var salesXmas = [];
    var salesKid = [];
    const all = await fetch("/api/v1/lottery-sales");
    const json  =await all.json();
    console.log(json)
    for (var i in json) {
        if(ctg.includes(json[i]["year"])){
            var index = ctg.indexOf(json[i]["year"]);
            salesTotal.splice(index,1,salesTotal[index]+json[i]["total"]);
            salesXmas.splice(index,1,salesXmas[index]+json[i]["xmas"]);
            salesKid.splice(index,1,salesKid[index]+json[i]["kid"]);
        }else{
            ctg.push(json.map(function(d) { return d["year"]})[i]);
            salesTotal.push(json.map(function(d) { return d["total"] })[i]);
            salesXmas.push(json.map(function(d) { return d["xmas"] })[i]);
            salesKid.push(json.map(function(d) { return d["kid"] })[i]);
        }        
      }
     
    Highcharts.chart('container', {
        title: {
            text: 'Ventas de loteria nacional'
        },
        xAxis: {
            categories: ctg,
            title: {
                text: 'Año',
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Ventas (€)'
            }
        },
        series: [{
        name: 'VENTAS TOTALES DE LOTERIA NACIONAL',
        data: salesTotal
        },
        {
        name: 'VENTAS DE LA LOTERIA DE NAVIDAD',
        data: salesXmas
        },
        {
        name: 'VENTAS DE LA LOTERIA DEL NIÑO',
        data: salesKid
        }]
        
        });


}

async function loadGrapghByProvince(){
    var ctg = [];
    var salesTotal = [];
    var salesXmas = [];
    var salesKid = [];
    const all = await fetch("/api/v1/lottery-sales");
    const json  =await all.json();
    for (var i in json) {
        if(ctg.includes(json[i]["province"])){
            var index = ctg.indexOf(json[i]["province"]);
            salesTotal.splice(index,1,salesTotal[index]+json[i]["total"]);
            salesXmas.splice(index,1,salesXmas[index]+json[i]["xmas"]);
            salesKid.splice(index,1,salesKid[index]+json[i]["kid"]);
        }else{
            ctg.push(json.map(function(d) { return d["province"]})[i]);
            salesTotal.push(json.map(function(d) { return d["total"] })[i]);
            salesXmas.push(json.map(function(d) { return d["xmas"] })[i]);
            salesKid.push(json.map(function(d) { return d["kid"] })[i]);
        }        
      }
    
    Highcharts.chart('container', {
        title: {
            text: 'Ventas de loteria nacional'
        },
        xAxis: {
            categories: ctg,
            title: {
            text: 'Provincia'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Ventas (€)',
                align: 'high'
            }
        },
        series: [{
        name: 'VENTAS TOTALES DE LOTERIA NACIONAL',
        data: salesTotal
        },
        {
        name: 'VENTAS DE LA LOTERIA DE NAVIDAD',
        data: salesXmas
        },
        {
        name: 'VENTAS DE LA LOTERIA DEL NIÑO',
        data: salesKid
        }]
        
        });


}  
    </script>
    
    <svelte:head>
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/modules/series-label.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/modules/export-data.js"></script>
        <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGrapghByProvince}"></script>
    </svelte:head>
    
    
    <main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Descripción de las ventas totales, de navidad y del niño por provincia en España.
        </p>
    </figure>
    </main>