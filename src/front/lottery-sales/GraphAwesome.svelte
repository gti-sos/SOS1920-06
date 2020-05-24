<script>
    
    import Button from "sveltestrap/src/Button.svelte";
    import ApexCharts from 'apexcharts';
    import {pop} from "svelte-spa-router";

    async function loadGraph(){
        var ctg = [];
        var salesTotal = [];
        var salesXmas = [];
        var salesKid = [];
        const all = await fetch("/api/v1/lottery-sales");
        const json  =await all.json();
        for (var i in json) {
            if(json[i]["province"]=="Madrid"){
               ctg.push(json.map(function(d) { return d["year"]})[i]);
               salesTotal.push(json.map(function(d) { return d["total"] })[i]);
               salesXmas.push(json.map(function(d) { return d["xmas"] })[i]);
               salesKid.push(json.map(function(d) { return d["kid"] })[i]);
            }       
        }
        
        /*
        for (var i in json) {
                ctg.push(json.map(function(d) { return d["province"] + " " + d["year"]})[i]);
                salesTotal.push(json.map(function(d) { return d["total"] })[i]);
                salesXmas.push(json.map(function(d) { return d["xmas"] })[i]);
                salesKid.push(json.map(function(d) { return d["kid"] })[i]);       
        }
        */
        var options = {
                series: [
                            {
                                name: "Ventas totales",
                                data: salesTotal
                            }, 
                            {
                                name: "Ventas de navidad",
                                data: salesXmas
                            }, 
                            {
                                name: "Ventas del niño",
                                data: salesKid
                            }
                        ],
                chart: {
                            type: "bar",
                            height: 600,
                            stacked: true,
                            toolbar: {
                                        show: true
                                    }
                        },
                dataLabels: {
                            enabled: true,
                            formatter: function(val) {
                            return val + "€";
                            },
                            style: {
                            fontSize: "12px",
                            colors: ["#304758"]
                            }
                        },
                responsive: [
                                {
                                    breakpoint: 480,
                                    options: {
                                                legend: {
                                                            position: 'bottom',
                                                            offsetX: 0,
                                                            offsetY: 0
                                                        }
                                            }
                                }
                            ],
                plotOptions: {
                                bar: {
                                        horizontal: false,
                                    },
                            },
                xaxis: {
                        categories: ctg,
                        },
                legend: {
                            position: 'right',
                            offsetY: 80
                        }, 
                fill: {
                        opacity: 1
                        },
                title: {
                        text: "Ventas de lotería en la provincia de Madrid",
                        floating: 0,
                        align: "center",
                        style: {
                                color: "#444"
                                }
                }
            };

        var chart = new ApexCharts(document.querySelector("#chartAwesome"), options);
        chart.render();
    }
    /*
        var options = {
                    chart: {
                                type: 'bar'
                           },
                    series: [
                                {
                                    name: 'sales',
                                    data: salesTotal
                                }
                            ],
                    xaxis: {
                                categories: ctg
                            }
        }

        var chart = new ApexCharts(document.querySelector('#chartAwesome'), options);
        chart.render();
    }
    */
    loadGraph();

    

</script>
<svelte:head>


</svelte:head>
<main>
    
    <h1>
        Apexchart 
    </h1>
    <div id="chartAwesome"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>

</main>

