<script>
    async function loadGraph(){
        var total = [];
        let MyData = [];
        const resData = await fetch("/api/v2/not-hospitalized-stats/Tarragona");
        MyData = await resData.json();
        for (var i in MyData) {
            var aux = [];
            aux.push(MyData.map(function(d) { return d["year"]})[i]);
            aux.push(MyData.map(function(d) { return d["interurban"]})[i]);
            aux.push(MyData.map(function(d) { return d["urban"]})[i]);
            total.push(aux); 
            console.log(aux);
            
        }
        console.log("Este es el total");
        console.log(total);
        var day_data = total;
        console.log(day_data);
        Morris.Line({
            element: 'myfirstchart',
            data: day_data,
            xkey: 'year',
            ykeys: ['interurban', 'urban'],
            labels: ['INTERURBAN', 'URBAN']
        }).on('click', function(i, row){
            console.log(i, row);
        });
    }

</script>
<svelte:head>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"  on:load="{loadGraph}"></script>
</svelte:head>
<main>
    <div id="myfirstchart" style="height: 250px;"></div>
</main>