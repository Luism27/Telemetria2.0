let coord, marcador, fecha;
var long, lat, m, poly, marker, circle, radius, resultados, valor_range;
var vector_c = [];
var vector_h= [];
var vector_rpm = []
fecha = document.getElementById("demo")
const tileurl = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileurl2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
var map = L.map('map').setView([10.983167, -74.802561], 15);
radius = document.getElementById("r");
btn = document.getElementById("consultar");
resultados = document.getElementById("result");
range = document.getElementById("myRange");
console.log(range.value);
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
function cambio(){
    valor_range = range.value
    
    let Hora = secondsToString(valor_range);
    console.log(Hora);
    let index_h = vector_h.findIndex(Element => Element == Hora)
    document.getElementById("insert3").innerHTML = Hora
       
        console.log(index_h);
        // if (Element.hora == Hora){
            marcador5.setLatLng([vector_c[index_h].lat,vector_c[index_h].lon])
            //var popup = L.popup().setLatLng([vector_c[index_h].lat,vector_c[index_h].lon]).setContent( `${vector_rpm}` )
            document.getElementById("insert4").innerHTML = [vector_c[index_h].lat,vector_c[index_h].lon]
            document.getElementById("insert5").innerHTML = "RPM= "+vector_rpm[index_h]
        // }
    
}
function secondsToString(seconds) {
    var hour = Math.floor(seconds / 3600);
    hour = (hour < 10)? '0' + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10)? '0' + minute : minute;
    var second = seconds % 60;
    second = (second < 10)? '0' + second : second;
    return hour + ':' + minute + ':' + second;
  }
//////////////////////////////////////////////////////
L.tileLayer(tileurl, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var icono = new L.Icon({
    iconUrl: '../static/images/fast-delivery.svg',
    iconSize: [50, 50],
    iconAnchor: [25, 50]
})

marcador5= L.marker([100000,100000]).addTo(map);
marker = L.marker([10.983167, -74.802561], { draggable: 'true', icon: icono }).addTo(map);
circle = L.circle([10.983167, -74.802561], { radius: 100, color: 'red' }).addTo(map);

fetch('/datos').then(res => {
    return res.json();
}).then(mensaje => {
//////////////////////////////////////////////////////
    var last_element = mensaje.fecha[mensaje.length - 1];
    var first_element = mensaje.fecha[0];

    range = document.getElementById("myRange");
    range2 = document.getElementById("myRange2");
//////////////////////////////////////////////////////
    map.removeLayer(marker);
    map.removeLayer(circle);
    let lat = mensaje.lat;
    let long = mensaje.lon;
    var newlatln = new L.LatLng(lat, long);
    marker = L.marker(newlatln, { draggable: 'true', icon: icono }).addTo(map);
    map.setView(newlatln)
    circle = L.circle(newlatln, { radius: 100 }).addTo(map);
});

map.on("click", Onclickmap)
function Onclickmap(e) {
    marcador5.setLatLng([10000,1000000])
    if (poly) {
        map.removeLayer(poly);
    }
    radio = radius.value;
    //console.log(radio)
    if (radius.value.length == 0) {
        radio = 100;

    }
    marker.on("drag", mover)
    marker.setLatLng(e.latlng);
    circle.setLatLng(e.latlng);
    circle.setRadius(radio);
}


function mover(e) {
    marcador5.setLatLng([10000,1000000])
    if (poly) {
        map.removeLayer(poly);
    }
    //resultados.innerHTML = "Esperando consulta..."
    radio = radius.value;
    //console.log(radio)
    if (radius.value.length == 0) {
        radio = 100;

    }
    circle.setRadius(radio);
    var marker = e.target;
    var position = marker.getLatLng();
    console.log(position)
    marker.setLatLng(new L.LatLng(position.lat, position.lng), { draggable: 'true' });

    circle.setLatLng([position.lat, position.lng])

}
var camion = document.getElementById("camion")
btn.addEventListener("click", () => {
    let option_es = camion.value;
    console.log(option_es);
    var f1 = fecha.value.slice(0, 10)
    var f2 = fecha.value.slice(13, 23)
    console.log(f1, f2)

    radio = radius.value;
    console.log(radio)
    if (radius.value.length == 0) {
        radio = 100;

    }
    circle.setRadius(radio);
    let latt = circle.getLatLng().lat;
    let lonn = circle.getLatLng().lng;
    let radiuss = circle.getRadius() / 1000;
    consulta2 = {
        lat1: latt, lon: lonn, lat2: latt, radio: radiuss, f1: f1, idsy:option_es
    }
    console.log(consulta2)
    fetch("/htrc2", {
        method: 'POST',
        body: JSON.stringify(consulta2),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.json();
    }).then(datos => {
        console.log(datos);
        vector_c = [];
        vector_h=[];
        marcador5.setLatLng([100000,10000000])
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
                    fecha: data.fecha.slice(0, 10),
                    hora: data.hora
                }
                vector_h[i]= data.hora;
                vector_rpm[i]= data.rpm;
            });
            poly = L.polyline(vector_c).addTo(map);
            let min_d = [vector_c[0].lat,vector_c[0].lon]
            document.getElementById("insert").innerHTML = min_d
            let max_d = [vector_c[vector_c.length-1].lat,vector_c[vector_c.length-1].lon]
            document.getElementById("insert2").innerHTML = max_d
            let valor_min = StringtoSecond(vector_h[0]);
            let valor_max = StringtoSecond(vector_h[vector_h.length-1]);
            
            range.max = valor_max
            range.min = valor_min;
        }



    });


});
function StringtoSecond(string){
    let qwerty = string.split(':');
    let hora =  parseInt(qwerty[0])*3600;
    let min = parseInt(qwerty[1])* 60;
    let sec = parseInt(qwerty[2]);
    let horat = hora+min+sec;
    return horat;
}

