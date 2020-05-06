<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import { pop } from "svelte-spa-router";
	export let params = {};

	let accstat = {};
	let updatedProvince;
	let updatedYear;
	let updatedAccvictotal;
	let updatedAccvicinter;
	let updatedAcfall;
	let errorMsg = "";


	onMount(getAccstat);

	// - - - - - - - FUNCIÓN OBTENER ACCSTATS - - - - - - - //
	async function getAccstat(){
		console.log("Fetching accstats...");
		const res = await fetch("/api/v2/accstats/"+ params.province + "/" + params.year);

		if (res.ok){
			console.log("Ok");
			const json = await res.json();
			accstat = json;
			updatedAccvictotal = accstat.accvictotal;
			updatedAccvicinter = accstat.accvicinter;
			updatedAcfall = accstat.accfall;
			console.log("Received accstat");
		}else{
			errorMsg = res.status + " : " + res.statusText;//Hay que personalizarlo con un switch en función del error
			console.log("Error");
		}
	}

	async function updateAccstat(){

		console.log("Updating accstat ..." + JSON.stringify(params.province) + JSON.stringify(params.updatedYear));

		const res = await fetch("/api/v2/accstats/"+params.province +"/"+ params.year, {
			method: "PUT", 
			body: JSON.stringify({
				province: params.province,
				year: parseInt(params.year),
				accvictotal: updatedAccvictotal,
				accvicinter: updatedAccvicinter,
				accfall: updatedAcfall
			}),
			headers: {
				"Content-type": "application/json"
			}
		}).then(function(res){
			if (res.ok) {
				getAccstat();
				window.alert("Pulsa el botón 'Aceptar' para actualizar el dato");
			}else if(res.status == 404) {
				window.alert("Se ha intentado actualizar un elemento inexistente");
			}else{
				window.alert("Se ha producido un error interno en el servidor");
			}
		});

	}

</script>

<main>
	<h3>Edit accstat <strong>{params.province}</strong></h3>


		{#await accstat}
		Loading accstat . . .
		{:then accstat}
	<Table bordered>
		<thead>
			<tr>
				<th>Provincia</th>
				<th>Año</th>
				<th>Accvictotal</th>
				<th>Accvicinter</th>
				<th>Accfall</th>
				<th>Acciones</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>{params.province}</td>
				<td>{params.year}</td>
				<td><input type = "number" bind:value="{updatedAccvictotal}"></td>
				<td><input type = "number" bind:value="{updatedAccvicinter}"></td>
				<td><input type = "number" bind:value="{updatedAcfall}"></td>
				<td> <Button color="primary" on:click={updateAccstat}>Actualizar dato</Button></td>
			</tr>
		</tbody>
	</Table>
	{/await}
	<!--{#if errorMsg} -->
		<!-- <p style="color: red">ERROR: {errorMsg}</p> -->
	<!-- {#/if} -->
	<Button color="success" on:click="{pop}">Volver atrás</Button>
</main>

