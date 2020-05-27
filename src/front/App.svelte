<script>
	import Router from 'svelte-spa-router';

	import Analytics from './Analytics.svelte';
	import Integrations from './Integrations.svelte';

	import Home from './Home.svelte';
	import LotterySales from './lottery-sales/App.svelte';
	import EditLotterySales from './lottery-sales/EditLotterySales.svelte';
	import GraphWheel from './lottery-sales/GraphWheel.svelte';
	import GraphAwesome from './lottery-sales/GraphAwesome.svelte';
	import GraphEmigrant from './lottery-sales/integrations/GraphEmigrant.svelte';
	import GraphRenewable from './lottery-sales/integrations/GraphRenewable.svelte';
	import GraphVehicles from './lottery-sales/integrations/GraphVehicles.svelte';
	import GraphDriving from './lottery-sales/integrations/GraphDriving.svelte';

    import Accstats from './acc-stats/App.svelte';
	import EditAccstat from './acc-stats/EditAccstat.svelte';
	
    import NotHospitalizedStats from './nhsApi/App.svelte';
	import EditNotHospitalizedStats from './nhsApi/EditNotHospitalizedStats.svelte';

	import NotFound from './NotFound.svelte';

	const routes = {
		"/": Home,
		"/analytics": Analytics,
		"/integrations":Integrations,
		"/lottery-sales": LotterySales,
		"/lottery-sales/:province/:year": EditLotterySales,
		"/lottery-sales/graphWheel":GraphWheel,
		"/lottery-sales/graphAwesome":GraphAwesome,
		"/lottery-sales/graphEmigrant":GraphEmigrant,
		"/lottery-sales/graphRenewable":GraphRenewable,
		"/lottery-sales/graphVehicles":GraphVehicles,
		"/lottery-sales/graphDriving":GraphDriving,
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