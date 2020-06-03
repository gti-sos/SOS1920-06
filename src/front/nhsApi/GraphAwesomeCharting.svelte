<script>
    
    import bb from "billboard.js";
    async function loadGraph () {
        const BASE_API_URL = "/api/v2/not-hospitalized-stats/Tarragona";
        const resData = await fetch(BASE_API_URL);
		let MyData = await resData.json();   
		var total = [];
		MyData.forEach( (v) => {
			total.push([v.province+" "+v.year,v.total,v.interurban,v.urban])
		});
        
		var chart = bb.generate({
	 		data: {
				columns: total
			},
			grid: {
				x: {
				lines: [
					{
					value: 0,
					text: "Total"
					},
					{
					value: 1,
					text: "Interurban",
					},
					{
					value: 2,
					text: "Urban",
					}
				]
				}
 			},
			bindto: "#lineChart"
		});
	};
    loadGraph();
</script>

<main>
    <div id="lineChart"></div>
</main>
