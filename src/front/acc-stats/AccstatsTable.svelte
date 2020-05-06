<script>
	
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	/** Paginación **/
	import {Pagination, PaginationItem, PaginationLink} from "sveltestrap";
	import FormGroup from "sveltestrap/src/FormGroup.svelte";
	/** Búsquedas **/
	import Input from "sveltestrap/src/Input.svelte";
	import Label from "sveltestrap/src/Label.svelte";
	/** Alertas **/
	import {Alert} from "sveltestrap";
	let visible = true;

	let accstats = [];
	let newAccstat = {
		province: "",
		year: "",
		accvictotal: "",
		accvicinter: "",
		accfall: ""
	};

	let currentProvince = "";
	let provinces = [];
	let years = [];
	let currentYear = "";

	//Paginación
	let numberElementsPages = 10; //Podemos observar que al tener 15 datos no nos va a salir la siguiente página (al cambiarlo a 5 sí)
	let offset = 0;
	let currentPage = 1;
	let moreData = true;

	//Variables búsqueda
	let campo="";
	let value="";

	//Alertas
	let exitoMsg;


	onMount(getAccstats);

	// - - - - - - - FUNCIÓN OBTENER ACCSTATS - - - - - - - //
	async function getAccstatsBasic(){
		console.log("Fetching accstats...");
		const res = await fetch("/api/v1/accstats");

		if (res.ok){
			console.log("Ok");
			const json = await res.json();
			accstats = json;
			console.log("Received "+accstats.length+" accstats");
		}else{
			console.log("Error");
		}
	}
	async function getAccstats(){
		console.log("Fetching accstats...");
		const res = await fetch("/api/v1/accstats?offset=" + numberElementsPages * offset + "&limit=" + numberElementsPages);
		const resNext = await fetch("/api/v1/accstats?offset=" + numberElementsPages * (offset+1) + "&limit=" + numberElementsPages);

		if (res.ok && resNext.ok){
			console.log("Ok");
			const json = await res.json();
			const jsonNext = await resNext.json();
			accstats = json;
			if (jsonNext.length == 0){
				moreData = false;
			}else{
				moreData = true;
			}
			console.log("Received "+accstats.length+" accstats");
		}else if(res.status == 404){
			console.log("Error");
			window.alert("No se han encontrado ningún dato");
		}
	}
	
		// - - - - - - - FUNCIÓN INSERTAR ACCSTATS - - - - - - - //

	async function insertAccstat(){
		console.log("Inserting accstat ...");
		if (newAccstat.province == "" 
			|| newAccstat.province == null
			|| newAccstat.year == ""
			|| newAccstat.year == null) {

			window.alert("¡Tienes que poner el nombre de la provincia y el año!");
		}else{
			const res = await fetch("/api/v1/accstats", {
				method: "POST", 
				body: JSON.stringify(newAccstat),
				headers: {
					"Content-type": "application/json"
				}
			}).then(function(res){
				if (res.ok){
					getAccstatsBasic();
					window.alert("Insertado con éxito");
					//insertAlert();
				}else{
					window.alert("Error al insertar el elemento");
				}
			});
		}
	}

		// - - - - - - - FUNCIÓN ELIMINAR ACCSTAT EN CONCRETO - - - - - - - //

	async function deleteAccstat(province,year){
		console.log("Deleting accstat ...");
		const res = await fetch("/api/v1/accstats/"+ province + "/" + year, {
			method: "DELETE"
		}).then(function(res){
			if (res.ok) {
			getAccstats();
			window.alert("Dato eliminado con éxito");
		}else if(res.status == 404){
			window.alert("Se ha intentado borrar algo que no existía");
		}else{
			window.alert("Error interno del servidor al borrar un elemento en concreto");
		}
		});
	}

		// - - - - - - - FUNCIÓN ELIMINAR TODOS LOS ACCSTATS - - - - - - - //	

	async function deleteAccstats(){
		console.log("Deleting all accstats . . .");
		const res = await fetch("/api/v1/accstats/",{
			method: "DELETE"
		}).then(function(res){
			if (res.ok) {
			getAccstats();
			location.reload();//Se ha añadido esta autorecarga para el ALERT
			window.alert("Pulsa el botón 'Aceptar' para eliminar todos los datos");
		}else if(res.status == 404){
			window.alert("Se ha producido un error al borrar los elementos");
		}else{
			window.alert("Error interno del servidor al borrar un elemento en concreto");
		}
		});
	}

	// - - - - - - - FUNCIÓN CARGAR DATOS - - - - - - - //
	async function uploadAccstats(){
		console.log("Uploading accstats . . .");
		const res = await fetch("/api/v1/accstats/loadInitialData",{
			method: "GET"
		}).then(function(res){
			window.alert("Pulsa el botón 'Aceptar' para cargar todos los datos");
			getAccstats();
		});
	}

	// - - - - - - - FUNCIÓN OFFSET - - - - - - - //
	async function incrementOffset(value){
		offset += value;
		currentPage += value;
		getAccstats();
	}

	
	// - - - - - - - FUNCIÓN BUSCAR - - - - - - - //
	async function search(campo, value){
		console.log("Searching accstats: " + campo + "/" + value);
		var url = "/api/v1/accstats";

		if (campo != "" && value!= ""){
			url = url + "?" + campo + "=" + value;
		}
		console.log(url);
		const res = await fetch(url);
		if (res.ok){
			console.log("Ok");
			const json = await res.json();
			accstats = json;
			console.log("Found" + accstats.length + "accstats");
		}else{
			console.log("ERROR");
		}
	}
	
</script>
<head>
	<script src="https://kit.fontawesome.com/1f3b8a66d3.js" crossorigin="anonymous"></script>
</head>
<main>
	<h1 style="text-align: center">🚗 Accidents Stats 🚗 </h1>
	<h6 style="text-align: center">API REST - Sistemas Orientados a Servicios</h6>
	<div id="SvelteApp"></div>

	{#await accstats}
		Loading accstats . . .
	{:then accstats}

	<!-- ********* B U S Q U E D A *********-->
	<FormGroup style="width: 20%">
		<Label> Elige una opción </Label>
		<Input type="select" name="inputCampo" id="inputCampo" bind:value="{campo}">
				<option disabled selected></option>
				<option value="province">Provincia</option>
				<option value="year">Año</option>
				<option value="accvictotal">Accvictotal</option>
				<option value="accvicinter">Accvicinter</option>
				<option value="accfall">Accfall</option>
		</Input>
	</FormGroup>

	<FormGroup style="width: 20%">
		<Label> Valor: </Label>
		<Input type="text" name="inputCampo" id="inputCampo" bind:value="{value}"></Input>
	</FormGroup>
	<Button color="info" on:click="{search(campo, value)}"><i class="fas fa-search"></i>Buscar</Button>


	<!-- ********* TABLA CON LOS DATOS *********-->
	<Table hover bordered>
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
				<td><input type = "text" bind:value="{newAccstat.province}"></td>
				<td><input type = "number" bind:value="{newAccstat.year}"></td>
				<td><input type = "number" bind:value="{newAccstat.accvictotal}"></td>
				<td><input type = "number" bind:value="{newAccstat.accvicinter}"></td>
				<td><input type = "number" bind:value="{newAccstat.accfall}"></td>
				<td> <Button color="primary" on:click={insertAccstat}><i class="fas fa-plus-circle"></i> Insertar dato</Button></td>
			</tr>

			{#each accstats as accstat}
			<tr>
				<td>
					<a href="#/accstat/{accstat.province}/{accstat.year}">{accstat.province}</a>
				</td>
				<td>{accstat.year}</td>
				<td>{accstat.accvictotal}</td>
				<td>{accstat.accvicinter}</td>
				<td>{accstat.accfall}</td>
				<td><Button color="danger" on:click={deleteAccstat(accstat.province, accstat.year)}><i class="fas fa-minus-circle"></i> Eliminar dato</Button></td>
			</tr>
			{/each}
		</tbody>
	</Table>
	{/await}

	<!--- Paginación inicio  ¡¡¡OJO!!! Colocar en href el #/accstats cuando se parametrice-->

	<Pagination style="padding-left: 43%" ariaLabel="Cambio de página">
		<PaginationItem class="{currentPage === 1 ? 'disabled' : ''}">
			 <PaginationLink previous href="#/" on:click="{() => incrementOffset(-1)}" />
		</PaginationItem>

		<!-- Si no estás en la primera página ... -->
		{#if currentPage != 1}
		<PaginationItem>
			<PaginationLink href="#/accstats" on:click="{() => incrementOffset(-1)}" >{currentPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}
		<PaginationItem active>
			<PaginationLink href="#/accstats" >{currentPage}</PaginationLink>
		</PaginationItem>

		<!-- Si hay más elementos ...-->
		{#if moreData}
		<PaginationItem >
			<PaginationLink href="#/accstats" on:click="{() => incrementOffset(1)}">{currentPage + 1}</PaginationLink>
		</PaginationItem>
		{/if}

		<PaginationItem class="{moreData ? '' : 'disabled'}">
		  <PaginationLink next href="#/accstats" on:click="{() => incrementOffset(1)}"/>
		</PaginationItem>

	</Pagination>

	<!--- Paginación fin -->

	<Button color="warning" on:click={uploadAccstats} ><i class="fas fa-sync"></i> Cargar datos </Button> 
	<Button color="danger" on:click={deleteAccstats}><i class="fa fa-trash"></i> Borrar todos los datos </Button>
	
</main>

<style>
	table{
		border: 1px solid black;
	}
</style>