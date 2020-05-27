let coord, marcador;
var long, lat, m, poly;
var vector_c = [];
const tileurl = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileurl2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

var map = L.map('map').setView([10.920533, -74.765402], 13);

L.tileLayer(tileurl, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var calendar = document.getElementById("demo");
var btn = document.getElementById("consultar");
console.log(calendar.value)


btn.addEventListener("click", () => {
    var f1 = calendar.value.slice(0, 10)
    var f2 = calendar.value.slice(25, 35)
    var h1 = calendar.value.slice(11, 19)
    var h2 = calendar.value.slice(36, 44)
    vector_c = [];

    let consulta = {
        f1: f1, f2: f2, h1: h1, h2: h2
    }
    console.log(consulta)
    fetch("/htrc", {
        method: 'POST',
        body: JSON.stringify(consulta),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.json();
    }).then(datos => {
        console.log(datos);
        vector_c = [];
        if (poly) {
            map.removeLayer(poly);
        }
        if (datos.length == 0) {
            alert("No hay datos en este intervalo");
        } else {
            datos.map((data, i) => {
                vector_c[i] = {
                    lat: data.lat,
                    lon: data.lon,
                }
            });
            poly = L.polyline(vector_c).addTo(map);
        }


    });


});

var layout = {
    autosize: true,
    title: 'RPM',
    xaxis: {
        title: ' ',
        titlefont: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
        }
    },
    yaxis: {
        title: ' ',
        titlefont: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
        }
    }
};

x1x = [1, 2, 3, 4, 3, 8, 10, 25, 21 , 12, 32];
x2x = [11, 2, 5, 1, 9, 5, 8, 15, 24 , 17, 2];

var trace1 = {
    y: x1x,
    type: 'scatter',
    name: 'Truck #2'
};

var trace2 = {
    y: x2x,
    type: 'scatter',
    name: 'Truck #2'
};


function getData() {
    y: [10, 15, 13, 17];
}
function getData2() {
    y: [10, 15, 13, 17];
}


var data = [trace1, trace2];
Plotly.newPlot('chart', data, layout);
  


var cnt = 0;
setInterval(function () { }, 500);