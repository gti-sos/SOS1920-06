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

	    title: {
	        text: 'Accident Stats'
	    },

	    subtitle: {
	        text: 'SOS1920-06'
	    },

	    yAxis: {
	        title: {
	            text: 'Número de accidentes'
	        }
	    },

	    xAxis: {
	        accessibility: {
	            rangeDescription: ''
	        }
	    },

	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle'
	    },

	    plotOptions: {
	        series: {
	            label: {
	                connectorAllowed: false
	            },
	            pointStart: 2010
	        }
	    },

	    series: [{
        name: 'Accidentes con víctimas totales',
        data: accVictotal
        },
        {
        name: 'Accidentes con víctimas en vías interurbanas',
        data: accVicinter
        },
        {
        name: 'Accidentes con fallecidos',
        data: accFall
        }]	    	,

	    responsive: {
	        rules: [{
	            condition: {
	                maxWidth: 500
	            },
	            chartOptions: {
	                legend: {
	                    layout: 'horizontal',
	                    align: 'center',
	                    verticalAlign: 'bottom'
	                }
	            }
	        }]
	    }

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
	        Gráfica sobre la variación por año entre accidentes en vías inteurbanas y urbanas
	    </p>
	</figure>
</main>