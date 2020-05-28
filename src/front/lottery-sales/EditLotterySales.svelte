<script>
    import {
        onMount
    } from "svelte";

    import {
        pop
    } from "svelte-spa-router";


    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    import Swal from 'sweetalert2';

    export let params = {};
    let sale = {};
    let updatedTotal = 0;
    let updatedXmas = 0;
    let updatedKid = 0;
    let errorMsg = "";

    onMount(getSale);

    async function getSale() {

        console.log("Fetching sale...");
        const res = await fetch("/api/v2/lottery-sales/" + params.province + "/" + params.year);

        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            sale = json;
            updatedTotal = sale.total;
            updatedXmas = sale.xmas;
            updatedKid = sale.kid;
            console.log("Received sale.");
        } else {
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }


    async function updatedSale() {

        console.log("Updating sale...");

        const res = await fetch("/api/v2/lottery-sales/" + params.province + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                "province": params.province,
                "year": parseInt(params.year),
                "total": updatedTotal,
                "xmas": updatedXmas,
                "kid": updatedKid
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(res.ok){
            //Backend 201, se actualiza
            getSale();
            Swal.fire({
  			icon: 'success',
  			title: 'La venta de ' + params.province + ' ' + params.year + ' ha sido actualizada'		
		});
        }else{
            //Backend error, no se actualiza
            Swal.fire({
  			icon: 'error',
  			title: 'La venta no se ha podido actualizar.',
  			text: 'Revise los datos introducidos.'		
		});
        }



    }
</script>
<main>
    <h3>Actualizar venta de <strong>{params.province + " " + params.year}</strong></h3>
    {#await sale}
        Loading sales...
    {:then sale}
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
                    <td>{params.province}</td>
                    <td>{params.year}</td>
                    <td><input type="number" bind:value="{updatedTotal}"></td>
                    <td><input type="number" bind:value="{updatedXmas}"></td>
                    <td><input type="number" bind:value="{updatedKid}"></td>
                    <td> <Button outline  color="primary" on:click={updatedSale}>Actualizar</Button> </td>
                </tr>
        </tbody>
        </Table>
    {/await}
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>