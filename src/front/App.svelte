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
	import GraphCovid from './lottery-sales/integrations/GraphCovid.svelte';
	import GraphNotas from './lottery-sales/integrations/GraphNotas.svelte';

    import Accstats from './acc-stats/App.svelte';
	import EditAccstat from './acc-stats/EditAccstat.svelte';
	import GraphAcc1 from './acc-stats/GraphAcc1.svelte';
    import GraphAcc2 from './acc-stats/GraphAcc2.svelte';
	import GraphAcc3 from './acc-stats/GraphAcc3.svelte';
	import GraphElectricity from './acc-stats/integrations/GraphElectricity.svelte';
	import GraphNatality from './acc-stats/integrations/GraphNatality.svelte';
	import GraphVehicle from './acc-stats/integrations/GraphVehicle.svelte';
	import GraphExterna1 from './acc-stats/integrations/GraphExterna1.svelte';
	import GraphExterna2 from './acc-stats/integrations/GraphExterna2.svelte';

    import NotHospitalizedStats from './nhsApi/App.svelte';
	import EditNotHospitalizedStats from './nhsApi/EditNotHospitalizedStats.svelte';
	import GraphHighChart from './nhsApi/GraphHighChart.svelte';
	import GraphAwesomeCharting from './nhsApi/GraphAwesomeCharting.svelte';
	import GraphG4roads from './nhsApi/integrations/GraphG4roads.svelte';
	import GraphG27spcStats from './nhsApi/integrations/GraphG27spcStats.svelte';
	import GraphG22formulaStats from './nhsApi/integrations/GraphG22formulaStats.svelte';
	import GraphG23firesStats from './nhsApi/integrations/GraphG23firesStats.svelte';
	import GraphG09pluginVehiclesStats from './nhsApi/integrations/GraphG09pluginVehiclesStats.svelte';
	import GraphG07imports from './nhsApi/integrations/GraphG07imports.svelte';
	import GraphG05healthPublic from './nhsApi/integrations/GraphG05healthPublic.svelte';
	import GraphG01povertyStats from './nhsApi/integrations/GraphG01povertyStats.svelte';
	import GraphG12overdoseDeaths from './nhsApi/integrations/GraphG12overdoseDeaths.svelte';
	import GraphG02evolutionOfCyclingRoutes from './nhsApi/integrations/GraphG02evolutionOfCyclingRoutes.svelte';
	import GraphG08uclStats from './nhsApi/integrations/GraphG08uclStats.svelte';
	import GraphExt1 from './nhsApi/integrations/GraphExt1.svelte';
	import GraphExt2 from './nhsApi/integrations/GraphExt2.svelte';


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
		"/lottery-sales/graphCovid":GraphCovid,
		"/lottery-sales/graphNotas":GraphNotas,
        "/accstats": Accstats,
		"/accstat/:province/:year" : EditAccstat,
		"/accstats/GraphAcc1" : GraphAcc1,
		"/accstats/GraphAcc2" : GraphAcc2,
		"/accstats/GraphAcc3" : GraphAcc3,		 
		"/accstats/GraphElectricity" : GraphElectricity,
		"/accstats/GraphNatality" : GraphNatality,
		"/accstats/GraphVehicle" : GraphVehicle,
		"/accstats/GraphExterna1" : GraphExterna1,
		"/accstats/GraphExterna2" : GraphExterna2,
        "/not-hospitalized-stats": NotHospitalizedStats,
		"/not-hospitalized-stats/:province/:year": EditNotHospitalizedStats,
		"/not-hospitalized-stats/GraphHighChart":GraphHighChart,
		"/not-hospitalized-stats/GraphAwesomeCharting":GraphAwesomeCharting,
		"/not-hospitalized-stats/GraphG4roads":GraphG4roads,
		"/not-hospitalized-stats/GraphG27spcStats":GraphG27spcStats,
		"/not-hospitalized-stats/GraphG22formulaStats":GraphG22formulaStats,
		"/not-hospitalized-stats/GraphG23firesStats":GraphG23firesStats,
		"/not-hospitalized-stats/GraphG09pluginVehiclesStats":GraphG09pluginVehiclesStats,
		"/not-hospitalized-stats/GraphG07imports":GraphG07imports,
		"/not-hospitalized-stats/GraphG05healthPublic":GraphG05healthPublic,
		"/not-hospitalized-stats/GraphG01povertyStats":GraphG01povertyStats,
		"/not-hospitalized-stats/GraphG12overdoseDeaths":GraphG12overdoseDeaths,
		"/not-hospitalized-stats/GraphG02evolutionOfCyclingRoutes":GraphG02evolutionOfCyclingRoutes,
		"/not-hospitalized-stats/GraphG08uclStats":GraphG08uclStats,
		"/not-hospitalized-stats/GraphExt1":GraphExt1,
		"/not-hospitalized-stats/GraphExt2":GraphExt2,
		"*": NotFound
	};
</script>

<main>
	<Router {routes} />
</main>