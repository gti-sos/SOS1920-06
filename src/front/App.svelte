<script>
	import Router from 'svelte-spa-router';

	import Home from './Home.svelte';
	import LotterySales from './lottery-sales/App.svelte';
	import EditLotterySales from './lottery-sales/EditLotterySales.svelte';
	
	import Graph from './lottery-sales/Graph.svelte';
	import Graph2 from './lottery-sales/Graph2.svelte';

    import Accstats from './acc-stats/App.svelte';
    import EditAccstat from './acc-stats/EditAccstat.svelte';
    import GraphAcc1 from './acc-stats/GraphAcc1.svelte';
    import GraphAcc2 from './acc-stats/GraphAcc2.svelte';


    import NotHospitalizedStats from './nhsApi/App.svelte';
	import EditNotHospitalizedStats from './nhsApi/EditNotHospitalizedStats.svelte';

	import NotFound from './NotFound.svelte';

	const routes = {
		"/": Home,
		"/lottery-sales": LotterySales,
		"/lottery-sales/:province/:year": EditLotterySales,
		"/lottery-sales/graph":Graph,
		"/lottery-sales/graph2":Graph2,

        "/accstats": Accstats,
		"/accstat/:province/:year" : EditAccstat, 
		"/accstats/GraphAcc1" : GraphAcc1,
		"/accstats/GraphAcc2" : GraphAcc2,

        "/not-hospitalized-stats": NotHospitalizedStats,
		"/not-hospitalized-stats/:province/:year": EditNotHospitalizedStats,
		"*": NotFound
	};
</script>

<main>
	<Router {routes} />
</main>