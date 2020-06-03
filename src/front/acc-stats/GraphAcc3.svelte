<!-- Gráfica de AwesomeChart (Utilizando morris.js)-->
<script type="text/javascript">

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

     //...Convertimos con el parseInt los datos ya que morris no entiende de otros valores :)
     let accVictotalConvert = parseInt(accVictotal);
     let accVicinterConvert = parseInt(accVicinter);
     let accFallConvert = parseInt(accFall);
	new Morris.Donut({
  
  element: 'AwesomeChart',
  
  data: [
  
    { label: 'accVictotal', value: accVictotalConvert },
    { label: 'accVicinter', value: accVicinterConvert },
    { label: 'accFall', value: accFallConvert }
  ]
  
});
}
</script>

<svelte:head>
<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js" on:load="{loadGraph}"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
</svelte:head>

<div id="AwesomeChart" style="height: 250px;"></div>

<p></p>
<h1 
	style="
		text-align: center
		  "

		>Esta gráfica ha sido diseñada con Morris.js</h1>
    <Button style="margin-left: 970px"color="success" on:click="{pop}">Volver atrás</Button>
