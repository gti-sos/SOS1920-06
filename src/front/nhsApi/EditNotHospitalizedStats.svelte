<script>

    import {
		onMount
    } from "svelte";
    import {
         pop
     } from "svelte-spa-router";

    import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

    export let params = {};
    let stat  = {};
    let updatedProvince = "";
    let updatedYear = "";
    let updatedTotal = "";
    let updatedInterurban = "";
    let updatedUrban = "";
    let errorMsg = "";


    onMount(getStat);

	async function getStat(){
		console.log("Fetching stat...");
		const res = await fetch("/api/v1/not-hospitalized-stats/"+params.province+"/"+params.year);

		if(res.ok){
			console.log("Ok:");
			const json = await res.json();
            stat = json;
            updatedProvince = stat.province;
            updatedYear = stat.year;
            updatedTotal = stat.total;
            updatedInterurban = stat.interurban;
            updatedUrban = stat.urban;
			console.log("Received stats.");
		}else{
            errorMsg = " El tipo de error es: " + res.status + ", y quiere decir: " + res.statusText;
			console.log("ERROR!");
		}
	}

    async function updateStat(){
        console.log("Updating stat..."+JSON.stringify(params.province));
		const res = await fetch("/api/v1/not-hospitalized-stats/"+params.province+"/"+params.year,{
			method: "PUT",
			body: JSON.stringify({
                province : params.province,
                year : Number(params.year),
                total : Number(updatedTotal),
                interurban : Number(updatedInterurban),
                urban : Number(updatedUrban)
            }),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(function (res){
			getStat();
		});
	};

</script>
<main>
    <h3>Editando elemento <strong>{params.province}{params.year}</strong> </h3>
    {#await stat}
		Loading stat...
	{:then stat}
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
					<td>{updatedProvince}</td>
					<td>{updatedYear}</td>
					<td><input bind:value = "{updatedTotal}"></td>
					<td><input bind:value = "{updatedInterurban}"></td>
					<td><input bind:value = "{updatedUrban}"></td>
					<td><Button outline color="primary" on:click={updateStat}>Actualizar</Button></td>
				</tr>
			</tbody>
		</Table>
    {/await}
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Volver</Button>
</main>