<script>
	import Router from 'svelte-spa-router';

	import Home from './Home.svelte';
	import LotterySales from './lottery-sales/App.svelte';
    import EditLotterySales from './lottery-sales/EditLotterySales.svelte';
    import Accstats from './acc-stats/App.svelte';
    import EditAccstat from './acc-stats/EditAccstat.svelte';
    import NotHospitalizedStats from './nhsApi/App.svelte';
	import EditNotHospitalizedStats from './nhsApi/EditNotHospitalizedStats.svelte';

	import NotFound from './NotFound.svelte';

	const routes = {
		"/": Home,
		"/lottery-sales": LotterySales,
        "/lottery-sales/:province/:year": EditLotterySales,
        "/accstats": Accstats,
		"/accstat/:province/:year" : EditAccstat, 
        "/not-hospitalized-stats": NotHospitalizedStats,
		"/not-hospitalized-stats/:province/:year": EditNotHospitalizedStats,
		"*": NotFound
	};
</script>

<main>
	<Router {routes} />
</main>