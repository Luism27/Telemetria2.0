let coord, marcador,rpms,rpm;
var long, lat, m;
const tileurl = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileurl2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

var map = L.map('map').setView([10.93,-74.85], 20);

L.tileLayer(tileurl, {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var icono = new L.Icon({
  iconUrl: '../static/images/camion.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 50]
});
marcador = L.marker([100000, 100000], { icon: icono });
marcador.addTo(map);
let marcador2 = L.marker([100000, 100000], { icon: icono });
marcador2.addTo(map);
var polyline, polyline2;
function actual_data() {
  fetch('/datos').then(res => {
    return res.json()
  }).then(mensaje => {

    m = mensaje;
    console.log(m)
    var long, lat, date, hora, rpms, ids;

    lat = m.lat;
    long = m.lon;
    date = (m.fecha).slice(0, 10);
    console.log('la fecha es: ', date);
    hora = m.hora;
    rpms = m.rpm;
    ids = m.idsy;

    // console.log('La latitud es: ', lat);
    // console.log('La longitud es: ', long);
    // console.log('La fecha es: ', date);
    // console.log('La hora es: ', hora);
    // console.log('Los rpm son: ', rpms);
    // console.log('La id es: ', ids);

    var variable = [lat, long, date, hora];
    if (ids == 'HXR 313' || ids == 'HXR313' || ids == 'hxr313' || ids == 'hxr 313') {
      //map 
      let Newlatlong = new L.LatLng(lat, long);
      marcador.setLatLng(Newlatlong);
      marcador.bindPopup(`${variable}`);
      rpm = m.rpm
      if (!polyline) {
        polyline = L.polyline([{ lat: lat, lon: long }]).addTo(map);
      }
    polyline.addLatLng(Newlatlong);
      //map.setView(Newlatlong)
    } else {
      //map 
      let Newlatlong2 = new L.LatLng(lat, long);
      marcador2.setLatLng(Newlatlong2);
      marcador2.bindPopup(`${variable}`);
      if (!polyline2) {
        polyline2 = L.polyline([{ lat: lat, lon: long }]).addTo(map);
      }
    polyline2.addLatLng(Newlatlong2);

      //map.setView(Newlatlong2)
    }
  });
}




//-------------------------------------------------
//-------------------------------------------------



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



function getData() {
  return rpm;
}
function getData2() {
  return 0;
}
var data = [getData(), getData2()];
Plotly.plot('chart', [{
  y: [ parseInt(getData()) ],
  type: 'line',
  name: 'Truck #1'
}, {
  y: [getData2()],
  type: 'line',
  name: 'Truck #2'
}], layout);


var cnt = 0;
setInterval(function () {
  Plotly.extendTraces('chart', { y: [[getData()], [getData2()]] }, [0, 1]);
  cnt++;
  if (cnt > 500) {
    Plotly.relayout('chart', {
      xaxis: {
        range: [cnt - 500, cnt]
      }
    });
  }
}, 15);

//-------------------------------------------------
//----------------CAMBIAR POR CHART.JS---------------
//-------------------------------------------------


// google.charts.load('current', { 'packages': ['corechart'] });
// google.charts.setOnLoadCallback(drawChart);
// function drawChart() {
//   var data = google.visualization.arrayToDataTable([
//     ['Time', 'Truck #1', 'Truck #2'],
//     ['1', 1000, 400],
//     ['2', 1170, 460],
//     ['3', 660, 1120],
//     ['4', 1030, 540]
//   ]);

//   var options = {
//     title: 'Trucks RPM',
//     curveType: 'function',
//     legend: { position: 'bottom', },
//     'width': '%',
//     'height': '550',
//     'position': 'bottom',
//     // chartArea:{left:0,top:0,width:"100%",height:"100%"}
//   };

//   var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

//   chart.draw(data, options);
// }



//-------------------------------------------------
//-------------------------------------------------



let actualizar = setInterval(actual_data, 200)
// let actualizar = setInterval(drawChart, 200)





// google.charts.load('current', { 'packages': ['corechart'] });
// google.charts.setOnLoadCallback(drawChart);
// function drawChart() {
//   var data = google.visualization.arrayToDataTable([
//     ['Time', 'Truck #1', 'Truck #2'],
//     ['1', 1000, 400],
//     ['2', 1170, 460],
//     ['3', 660, 1120],
//     ['4', 1030, 540]
//   ]);

//   var options = {
//     title: 'Trucks RPM',
//     curveType: 'function',
//     legend: { position: 'bottom', },
//     'width': '%',
//     'height': '550',
//     'position': 'bottom',
//     // chartArea:{left:0,top:0,width:"100%",height:"100%"}
//   };

//   var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

//   chart.draw(data, options);