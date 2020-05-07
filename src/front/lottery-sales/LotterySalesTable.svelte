<script>
	import {
		onMount
	} from "svelte";

	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	import Input from "sveltestrap/src/Input.svelte";
	import Label from "sveltestrap/src/Label.svelte";
	import FormGroup from "sveltestrap/src/FormGroup.svelte";

	import Swal from 'sweetalert2';

	let sales = [];
	let newSale = {
		"province": "",
		"year": 0,
		"total": 0,
		"xmas":0,
		"kid":0
	};

	let limit = 10;
	let offset = 0;
	let lastPage;
	let firstPage=1;
	let total;
	let actualPage=1;

	//Campos para realizar las busquedas
	let provinceSearch="";
	let yearSearch=0;
	let fromTotal=0;
	let toTotal=0;
	let fromXmas=0;
	let toXmas=0;
	let fromKid=0;
	let toKid=0;

	onMount(search);

	// INSERTAR DATO
	async function insertSale() {
		if(newSale.province!="" && newSale.year!=0){
			//Campo provincia no vacio y year no 0 (error no tratado en back)
			const res = await fetch("/api/v1/lottery-sales", {
				method: "POST",
				body: JSON.stringify(newSale),
				headers: {"Content-Type": "application/json"
				}
			});
			
			if(res.status==201){
				// Si todo es correcto, se inserta en la base de datos y search
				search();
				Swal.fire({
				icon: 'success',
				title: 'La venta de ' + newSale.province + " " + newSale.year + ' ha sido insertada correctamente.'		
			});
			}else{
			//Insertando un dato duplicado o con campos vacíos (errores tratados en el backend)
			Swal.fire({
				icon: 'error',
				title: 'Ha habido un error',
				text: 'Recuerda:\nNINGUN campo puede estar en blanco y no puede haber dos datos para la misma provincia y el mismo año.'
				});
			}
		}else{
			//Campo provincia vacio o campo year 0
			Swal.fire({
				icon: 'error',
				title: 'Ha habido un error',
				text: 'Recuerda:\nEl campo provinvia no puede estar vacío y el año no puede ser 0'
			});
		}
	}

	//BORRAR RECURSO
	async function deleteSale(province,year) {
		const res = await fetch("/api/v1/lottery-sales/" + province + "/" + year, {
			method: "DELETE"
		}).then(function (res) {
			search();
		});
		//Siempre Success ya que el boton de eliminar está ligado al dato.
		Swal.fire({
  			icon: 'success',
  			title: 'La venta de ' + province + " " + year + ' ha sido borrada correctamente.' 		
		});
	}

	//BORRAR TODOS LOS RECURSOS
	async function deleteAll(){
		if(sales.length>=1){
			//Si hay mas de un dato, se hace delete
			const res = await fetch("api/v1/lottery-sales" , {
			method: "DELETE"
		}).then(function (res) {
			search();
		});
		Swal.fire({
  			icon: 'success',
  			title: 'La base de datos se ha borrado correctamente.',
  			text: 'Pulsa en Cargar datos para inicializarla.'		
		});

		}else{
			//Si no hay datos, se informa de que ya estaba vacia
			Swal.fire({
  			icon: 'error',
  			title: 'La base de datos ya esta vacía',
  			text: 'Pulsa en Cargar datos para inicializarla.'		
		});
		}
		
	}

	//CARGAR DATOS INICIALES
	async function loadInitialData(){
		const res = await fetch("api/v1/lottery-sales/loadInitialData");
		if(res.status==400){
			//Si da 400, es que ya hay datos y mostramos error
			Swal.fire({
  			icon: 'error',
  			title: 'La base de datos debe estar vacía para cargarla.'			
		});}
		else{
			//Si no hay datos, llamamos a search() para mostrar lo cargado
			search();
			Swal.fire({
  			icon: 'success',
  			title: 'La base de datos ha sido inicializada.'			
		});

		}
	}

	// Actualizamos offset y pagina actual y hacemos search con los nuevos parametros
	function nextPage(){
		offset = offset + limit;
		actualPage = actualPage +1;
		search();
		
	}
	//Actualizamos offset y pagina actual y hacemos search con los nuevos parametros
	function previousPage(){
		offset = offset - limit;
		actualPage = actualPage -1;
		search();		
	}

	// Si estamos en la ultima pagina se desactivara el boton siguiente, si no, estara activado
	function disableButtonNext(){
		if(actualPage===lastPage | lastPage==0){
			document.getElementById("next").disabled = true;
		}else{
			document.getElementById("next").disabled = false;
		}
	}

	// Si estamos en la primera pagina se desactivara el boton anterior, si no, estara activado
	function disableButtonPrevious(){
		if(actualPage===firstPage){
			document.getElementById("previous").disabled = true;
		}else{
			document.getElementById("previous").disabled = false;
		}
	}

	// Algun campo de las busquedas relleno: True (hay busqueda)
	// Todos los campos de las busquedas vacios: False(no hay busqueda)
	function haybusqueda(){
		if((provinceSearch == "" | provinceSearch == undefined) && 
		(yearSearch == 0 | yearSearch == undefined) && 
		(fromTotal == 0 | fromTotal == undefined) && 
		(toTotal == 0 | toTotal == undefined) && 
		(fromXmas == 0 | fromXmas == undefined) && 
		(toXmas == 0 | toXmas == undefined) && 
		(fromKid == 0 | fromKid == undefined) && 
		(toKid == 0 | toKid == undefined)){
			return false;
		}else{
			return true;
		}
	}


	//FUNCION PRINCIPAL (INCLUYE BUSQUEDAS Y NO BUSQUEDAS)
	async function search(){
		console.log("Searching lottery sales...");
		//Partimos de la ruta base.
		//En caso de entrar en las busquedas, se ira concatenando los parametros y valores a la url
		var url = "/api/v1/lottery-sales";

		if(haybusqueda()){
			//Si hay busquedas, entramos aqui

			//True:Primer parametro a meter en la url de busquedas (se añade ?)
			//False:No es el primer parametro (se añade &)
			var first = true;
			//se almacenan los parametros y valores que estas buscando
			//p.ej: [Provincia: Madrid, Year:2015,..]
			var mapa = new Array();

			if(provinceSearch!="" && provinceSearch!=undefined){
				//Si provinceSearch tiene texto se añade a la url
				url = url + "?province="+provinceSearch;
				first = false;
				//Añadimos al mapa 'provincia:provinceSearch' buscado
				mapa.push("Provincia: " + provinceSearch);
			}
			
			if(yearSearch!=0 && yearSearch!=undefined){
				//Hay algo en el campo yearSearch, luego se añade al mapa año:yearSearch
				mapa.push("Año: "+ yearSearch);
				if(first){
					//Si es el primer parametro de busqueda (?)
					url = url + "?year=" + yearSearch;
					first = false;
				}else{
					//Si no es el primero (&)
					url = url + "&year=" + yearSearch;
				}
			}
			if(fromTotal!=0 && fromTotal!=undefined){
				mapa.push("Ventas totales desde: " + fromTotal);	
				if(first){
					url = url + "?fromtotal=" + fromTotal;
					first = false;
				}else{
					url = url + "&fromtotal=" + fromTotal;
				}
			}
			if(toTotal!=0 && toTotal!=undefined){
				mapa.push("Ventas totales hasta: " + toTotal);
				if(first){
					url = url + "?tototal=" + toTotal;
					first = false;
				}else{
					url = url + "&tototal=" + toTotal;
				}
			}
			if(fromXmas!=0 && fromXmas!=undefined){
				mapa.push("Ventas de navidad desde: " + fromXmas);
				if(first){
					url = url + "?fromxmas=" + fromXmas;
					first = false;
				}else{
					url = url + "&fromxmas=" + fromXmas;
				}
			}
			if(toXmas!=0 && toXmas!=undefined){
				mapa.push("Ventas de navidad hasta: " + toXmas);
				if(first){
					url = url + "?toxmas=" + toXmas;
					first = false;
				}else{
					url = url + "&toxmas=" + toXmas;
				}
			}
			if(fromKid!=0 && fromKid!=undefined){
				mapa.push("Ventas del niño desde: "+fromKid);
				if(first){
					url = url + "?fromkid=" + fromKid;
					first = false;
				}else{
					url = url + "&fromkid=" + fromKid;
				}
			}
			if(toKid!=0 && toKid!=undefined){
				mapa.push("Ventas del niño hasta: " + toKid);
				if(first){
					url = url + "?tokid=" + toKid;
					first = false;
				}else{
					url = url + "&tokid=" + toKid;
				}
			}
		
		//res: url de busqueda + paginacion
		const res = await fetch(url + "&offset=" + offset + "&limit=" + limit);
		//all: url de busqueda solo
		const all = await fetch(url);

		
		if (res.ok) {
			//Si todo esta bien, devuelve los elementos que coinciden con la busqueda (la primera pagina)
			console.log("Ok:");
			const json = await res.json();
			sales = json;
			console.log("Received " + sales.length + " sales.");
			//jsnAll: elementos buscados en total
			const jsonAll = await all.json();
			total = jsonAll.length;
			//Redondeamos x encima el numero de paginas que tendremos
			//(Ej:Si total=1, lastPage=1)(si total=11, lastPage=2)
			lastPage = Math.ceil(total/10);
			//Activamos o desactivamos los botones de Anterior y siguiente dependiendo si estamos en la ultima o primera pagina
			disableButtonNext();
			disableButtonPrevious();			
		} else {
			//res devuelve error
			if(offset>0){
				//Entrara aqui en caso de un 404 pero con offset>0. 
				//Quiere decir que una pag !=1 no tiene elementos, pero la anterior si tendra
				disableButtonNext();
				disableButtonPrevious();
				//Cambiamos el offset, cambiamos de pagina y buscamos de nuevo para devolver la pag anterior.
				offset = offset - limit;
				actualPage = actualPage -1;
				search();
			}else{
				//Entrara aqui en caso de no encontrar elementos que coincidan con la busqueda (404).
				sales = [];
				console.log("ERROR!");
				Swal.fire({
  				icon: 'error',
  				title: 'No hay datos que coincidan con la búsqueda:\n' + mapa		
				});
			}
						
		}
		}else{
			//No hay busquedas, luego tenemos que devolver todos los recursos que haya (paginados)

			//all:todos los recursos
			const all = await fetch("/api/v1/lottery-sales");
			//res: recursos de una pagina concreta
			const res = await fetch("/api/v1/lottery-sales?offset="+ offset +  "&limit=" + limit);

			if (res.ok) {
				//Todo OK, devolvemos la pagina indicada por offset y limit
				console.log("Ok:");
				const json = await res.json();
				sales = json;
				console.log("Received " + sales.length + " sales.");

				//Con jsonAll hacemos un GET a todos los recursos para saber cuantos hay en total y asÃ­ saber cauntas paginas tendremos
				const jsonAll = await all.json();
				total = jsonAll.length;
				lastPage = Math.ceil(total/10);
				//Activamos o desactivamos los botones de Anterior y siguiente dependiendo si estamos en la ultima o primera pagina
				disableButtonNext();
				disableButtonPrevious();
				
			} else {
				//Entrara aqui en caso de que se elimine el ultimo de una pagina.
				//Cambiamos el offset, y pasamos a la pagina anterior.
				if(offset>0){
					disableButtonNext();
					disableButtonPrevious();
					offset = offset - limit;
					actualPage = actualPage -1;
					search();
				}else{
					//No hay elementos en ninguna pagina. 
					//Desactivamos botones de paginacion, y devolvemos conjunto vacio
					document.getElementById("next").disabled = true;
					document.getElementById("previous").disabled = true;
					sales = [];
					console.log("ERROR!");
					/*Swal.fire({
  						icon: 'error',
  						title: 'La base de datos esta vacía'		
					});*/
				}
			}
		}
	}

	//Limpiar los campos de busqueda
	function cleanSearch(){
		provinceSearch ="";
		yearSearch="";
		fromTotal=0;
		toTotal=0;
		fromXmas=0;
		toXmas=0;
		fromKid=0;
		toKid=0;
		search();
	}

	//Limpiar campos de insertar
	function cleanInsert(){
		newSale.province="";
		newSale.year=0;
		newSale.total=0;
		newSale.xmas=0;
		newSale.kid=0;
	}

</script>

<main>

	
	{#await sales}
		Loading sales...
	{:then sales}
	
	<div class="right">
		<table id="tableSearch">
		<thead>
			<tr>
				<td colspan="10"><h3 style="color: #851c1c; text-align: center;">Búsqueda avanzada</h3></td>
			</tr>
		</thead>
		<tbody>
		<tr>
		<td></td>
		<td></td>
		<td><span style="color: #c82828;">Provincia</td>
		<td><span style="color: #c82828;">Año</td>
		<td><span style="color: #c82828;">Totales desde</td>
		<td><span style="color: #c82828;">Totales hasta</td>
		<td><span style="color: #c82828;">Navidad desde</td>
		<td><span style="color: #c82828;">Navidad hasta</td>
		<td><span style="color: #c82828;">Niño desde</td>
		<td><span style="color: #c82828;">Niño hasta</td>	
		</tr>
		<tr>
		<td><Button style="background-color: chocolate " on:click={loadInitialData}>Cargar datos</Button></td>
		<td></td>
		<td><input type="text" bind:value="{provinceSearch}"></td>
		<td><input type="number" bind:value="{yearSearch}"></td>
		<td><input type="number" bind:value="{fromTotal}"></td>
		<td><input type="number" bind:value="{toTotal}"></td>
		<td><input type="number" bind:value="{fromXmas}"></td>
		<td><input type="number" bind:value="{toXmas}"></td>
		<td><input type="number" bind:value="{fromKid}"></td>
		<td><input type="number" bind:value="{toKid}"></td>
		<td><Button outline  color="primary" on:click={search}>Buscar</Button></td>
		<td><Button outline  color="primary" on:click={cleanSearch}>Limpiar</Button></td>
		</tr>
		</tbody>
		</table>

		
	</div>

	
	
	
		<Table bordered>
			<thead>
				<tr>
					<th>Provincia</th>
					<th>Año</th>
					<th>Ventas totales (€)</th>
					<th>Ventas de navidad (€)</th>
					<th>Ventas del niño (€)</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input type="text" bind:value="{newSale.province}"></td>
					<td><input type="number" bind:value="{newSale.year}"></td>
					<td><input type="number" bind:value="{newSale.total}"></td>
					<td><input type="number" bind:value="{newSale.xmas}"></td>
					<td><input type="number" bind:value="{newSale.kid}"></td>
					<td> <Button outline  color="primary" on:click={insertSale}>Insertar</Button>
						<Button outline  color="primary" on:click={cleanInsert}>Limpiar</Button> </td>
				</tr>

				{#each sales as sale}
					<tr>
						<td>
							<a href="#/lottery-sales/{sale.province}/{sale.year}">{sale.province}</a>
						</td>
						<td>{sale.year}</td>
						<td>{sale.total}</td>
						<td>{sale.xmas}</td>
						<td>{sale.kid}</td>
						<td><Button outline color="danger" on:click="{deleteSale(sale.province,sale.year)}">Eliminar dato</Button></td>
					</tr>
				{/each}
			</tbody>
		</Table>
		
	{/await}
	<div class="right">
	<ul id="block">
			<Button id="previous" on:click="{() => previousPage()}">&laquo</Button>
			<Button id="actual">{actualPage}</Button>
			<Button id="next" on:click="{() => nextPage()}">&raquo</Button>
	</ul>
	</div>
	<Button outline color="danger" on:click={deleteAll}>Borrar todos los datos</Button>	

</main>