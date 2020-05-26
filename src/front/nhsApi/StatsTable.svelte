<script>
	import {
		onMount
	} from "svelte";

	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	let stats = [];
	let newStat = {
		province : "",
		year : "",
		total : "",
		interurban : "",
		urban : ""
	};
	let numeroDePagina = 0;
	let numeroAux;
	let limit = 10;
	let searchProvince = "";
	let searchYear = "";
	let minTotal = "";
	let maxTotal = "";
	let minInterurban = "";
	let maxInterurban = "";
	let minUrban = "";
	let maxUrban = "";
	
	onMount(getStats);

	async function getStats(){
		console.log("Fetching stats....");
		const res = await fetch("/api/v1/not-hospitalized-stats?offset="+numeroDePagina+"&limit="+limit);
		if(res.ok){
			console.log("Ok:");
			const json = await res.json();
			stats = json;
			console.log("Received "+stats.length+" stats.");
		}else{
			console.log("ERROR");
		};
	};
	async function busqueda(searchProvince, searchYear, minTotal, maxTotal, minInterurban, maxInterurban, minUrban, maxUrban){
		if(typeof searchProvince=='undefined'){
			searchProvince="";
		}
		if(typeof searchYear=='undefined'){
			searchYear="";
		}
		if(typeof minTotal=='undefined'){
			minTotal="";
		}
		if(typeof maxTotal=='undefined'){
			maxTotal="";
		}
		if(typeof minInterurban=='undefined'){
			minInterurban="";
		}
		if(typeof maxInterurban=='undefined'){
			maxInterurban="";
		}
		if(typeof minUrban=='undefined'){
			minUrban="";
		}
		if(typeof maxUrban=='undefined'){
			maxUrban="";
		}
		const res = await fetch("/api/v1/not-hospitalized-stats?province="+searchProvince+"&year="+searchYear+"&totalMaxim="+maxTotal+"&totalMinim="+minTotal+"&interurbanMaxim="+maxInterurban+"&interurbanMinim="+minInterurban+"&urbanMaxim="+maxUrban+"&urbanMinim="+minUrban+"&limit="+limit+"&offset="+numeroDePagina)
		if (res.ok){
			const json = await res.json();
			stats = json;
			console.log("Found "+ stats.length + " stats");
			window.alert("Se han encontrado datos.");
		}else if(res.status==404){
				window.alert("No se encuentran datos.");
		}else{
			console.log("ERROR:"+" El tipo de error es: " + res.status + ", y quiere decir: " + res.statusText);
		};
	}
	async function paginacion(searchProvince, searchYear, minTotal, maxTotal, minInterurban, maxInterurban, minUrban, maxUrban,num){
		numeroAux=num;
		if(typeof searchProvince=='undefined'){
			searchProvince="";
		}
		if(typeof searchYear=='undefined'){
			searchYear="";
		}
		if(typeof minTotal=='undefined'){
			minTotal="";
		}
		if(typeof maxTotal=='undefined'){
			maxTotal="";
		}
		if(typeof minInterurban=='undefined'){
			minInterurban="";
		}
		if(typeof maxInterurban=='undefined'){
			maxInterurban="";
		}
		if(typeof minUrban=='undefined'){
			minUrban="";
		}
		if(typeof maxUrban=='undefined'){
			maxUrban="";
		}

		if(num==1){
			numeroDePagina=numeroDePagina-limit;
			if(numeroDePagina<0){
				numeroDePagina=0;
				const res = await fetch("/api/v1/not-hospitalized-stats?province="+searchProvince+"&year="+searchYear+"&totalMaxim="+maxTotal+"&totalMinim="+minTotal+"&interurbanMaxim="+maxInterurban+"&interurbanMinim="+minInterurban+"&urbanMaxim="+maxUrban+"&urbanMinim="+minUrban+"&limit="+limit+"&offset="+numeroDePagina)
				if (res.ok){
					const json = await res.json();
					stats = json;
					numeroAux=num;
					
				}
			}else{
				const res = await fetch("/api/v1/not-hospitalized-stats?province="+searchProvince+"&year="+searchYear+"&totalMaxim="+maxTotal+"&totalMinim="+minTotal+"&interurbanMaxim="+maxInterurban+"&interurbanMinim="+minInterurban+"&urbanMaxim="+maxUrban+"&urbanMinim="+minUrban+"&limit="+limit+"&offset="+numeroDePagina)
				if (res.ok){
					const json = await res.json();
					stats = json;
					numeroAux=num;
				}
			}
		}else{
			numeroDePagina = numeroDePagina+limit;
			const res = await fetch("/api/v1/not-hospitalized-stats?province="+searchProvince+"&year="+searchYear+"&totalMaxim="+maxTotal+"&totalMinim="+minTotal+"&interurbanMaxim="+maxInterurban+"&interurbanMinim="+minInterurban+"&urbanMaxim="+maxUrban+"&urbanMinim="+minUrban+"&limit="+limit+"&offset="+numeroDePagina)
			if (res.ok){
					const json = await res.json();
					stats = json;
					numeroAux=num;
			}
		}
	}



	async function getStatsAntiguo(){
		console.log("Fetching stats...");
		const res = await fetch("/api/v1/not-hospitalized-stats?offset="+numeroDePagina+"&limit="+limit);

		if(res.ok){
			console.log("Ok:");
			const json = await res.json();
			stats = json;
			console.log("Received "+stats.length+" stats.");
		}else{
			console.log("ERROR!");
		}
	}
	async function loadInitialData(){
		console.log("Loading stats...");
		const res = await fetch("/api/v1/not-hospitalized-stats/loadInitialData",{
			method: "GET"
		}).then(function(res){
			if(res.ok){
				getStatsAntiguo();
				window.alert("Datos iniciales cargados.");
			}else if(res.status==401){
				window.alert("La base de datos no esta vacia. Debe vaciarla para cargar los datos iniciales");
			}else{
				console.log("ERROR!");
			}
            

			
		});
	}
	async function insertStat(){
		console.log("Inserting stat...");
		if (newStat.province == "" || newStat.province == null || newStat.year == "" || newStat.year == null || newStat.total == "" || newStat.total == null || newStat.interurban == "" || newStat.interurban == null || newStat.urban == "" || newStat.urban == null) {
			window.alert("No se puede dejar ningún campo vacío");
		}else{
			const res = await fetch("/api/v1/not-hospitalized-stats",{
				method: "POST",
				body: JSON.stringify(newStat),
				headers:{
					"Content-Type": "application/json"
				}
			}).then(function (res){
				if(res.ok){
					console.log("Ok:");
					getStats();
					window.alert("Dato insertado correctamente.");
				}else if(res.status==400){
					window.alert("Campo mal escrito.No puede insertarlo.");
				}else{
					window.alert("Dato ya creado. No puede insertarlo.");
				}
				console.log("ERROR!");
			});
		}
	}
	async function deleteStat(province,year){
		console.log("Deleting stat...");
		const res = await fetch("/api/v1/not-hospitalized-stats/"+province+"/"+year,{
			method: "DELETE"
		}).then(function (res){
			window.alert("Dato eliminado correctamente.");
			getStats();
		});
	}
	async function deleteStats(){
		if(stats.length>=1){
			console.log("Deleting stat...");
			const res = await fetch("/api/v1/not-hospitalized-stats",{
				method: "DELETE"
			}).then(function (res){
				window.alert("Base de datos eliminada correctamente.");			
				getStatsAntiguo();
				location.reload();
			});
		}else {
			window.alert("La base de datos ya esta vacia. Cargue los datos iniciales.");			
		};
	}
</script>

<main>
	<h3>Vista completa  de elementos. </h3>
	{#await stats}
		Loading stats...
	{:then stats}
		<Table bordered>
			<thead>
				<tr>
					<th>Provincia</th>
					<th>Año</th>
					<th>Totales</th>
					<th>Vías interurbanas</th>
					<th>Vías urbanas</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input type = "text" bind:value = "{newStat.province}"></td>
					<td><input type = "number" bind:value = "{newStat.year}"></td>
					<td><input type = "number" bind:value = "{newStat.total}"></td>
					<td><input type = "number" bind:value = "{newStat.interurban}"></td>
					<td><input type = "number" bind:value = "{newStat.urban}"></td>
					<td><Button outline color="primary" on:click={insertStat}>Insertar</Button></td>
				</tr>
				{#each stats as stat}
					<tr>
						<td>
							<a href="#/not-hospitalized-stats/{stat.province}/{stat.year}">{stat.province}</a>
						</td>
						<td>{stat.year}</td>
						<td>{stat.total}</td>
						<td>{stat.interurban}</td>
						<td>{stat.urban}</td>
						<td><Button outline color="danger" on:click="{deleteStat(stat.province,stat.year)}">Eliminar</Button></td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	<Button outline color="secondary" on:click="{loadInitialData}">Cargar datos iniciales</Button>
	<Button outline color="danger" on:click="{deleteStats}">Borrar todos</Button>
	{#if numeroDePagina==0}
		<Button outline color="primary" on:click="{paginacion(searchProvince, searchYear, minTotal, maxTotal, minInterurban, maxInterurban, minUrban, maxUrban, 2)}">&gt</Button>
	{/if}
	{#if numeroDePagina>0}
		<Button outline color="primary" on:click="{paginacion(searchProvince, searchYear, minTotal, maxTotal, minInterurban, maxInterurban, minUrban, maxUrban, 1)}">Pagina anterior</Button>
		<Button outline color="primary" on:click="{paginacion(searchProvince, searchYear, minTotal, maxTotal, minInterurban, maxInterurban, minUrban, maxUrban, 2)}">Pagina siguiente</Button>
	{/if}
	<tr>
		<td><label>Pais: <input bind:value="{searchProvince}"></label></td>
		<td><label>Minimo numero de totales: <input bind:value="{minTotal}"></label></td>
		<td><label>Minimo numero en vias interurbanas: <input bind:value="{minInterurban}"></label></td>
		<td><label>Minimo numero en vias urbanas: <input bind:value="{minUrban}"></label></td>
	</tr>
	<tr>
		<td><label>Año: <input bind:value="{searchYear}"></label></td>
		<td><label>Maximo numero de totales: <input bind:value="{maxTotal}"></label></td>
		<td><label>Maximo numero en vias interurbanas: <input bind:value="{maxInterurban}"></label></td>
		<td><label>Maximo numero en vias urbanas: <input bind:value="{maxUrban}"></label></td>
	</tr>

	<Button outline color="primary" on:click="{busqueda (searchProvince, searchYear, minTotal, maxTotal, minInterurban, maxInterurban, minUrban, maxUrban)}">Buscar</Button>
	<h6>Si quiere ver todos los datos despues de una busqueda, quite todo los filtros y pulse el boton de buscar. </h6>
</main>
