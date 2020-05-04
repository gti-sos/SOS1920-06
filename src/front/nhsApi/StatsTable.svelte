<script>

	import {
		onMount
	} from "svelte";

	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	
	let stats = [];
	let newStat;

	onMount(getStats);

	async function getStats(){
		console.log("Fetching stats...");
		const res = await fetch("/api/v1/not-hospitalized-stats");

		if(res.ok){
			console.log("Ok:");
			const json = await res.json();
			stats = json;
			console.log("Received "+stats.length+" stats.");
		}else{
			console.log("ERROR!");
		}
	}
	console.log("Before stats...");
	getStats();
	console.log("After stats...");
</script>

<main>
	{#await stats}
		Loading stats...
	{:then stats}

		<Table>
			<thead>
				<tr>
					<th>Province</th>
					<th>Year</th>
					<th>Total</th>
					<th>Interurban</th>
					<th>Urban</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each stats as stat}
					<tr>
						<td>{stat.province}</td>
						<td>{stat.year}</td>
						<td>{stat.total}</td>
						<td>{stat.urban}</td>
						<td>{stat.interurban}</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
</main>
