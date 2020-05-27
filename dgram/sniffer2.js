const { server } = require('../index');
const { con } = require('../index');
var mensaje;
var PUERTO = 5003;
var DIRECCION="192.168.0.6";
var longitud, latitud, fech,Hora,Fecha, rpm, id;

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
  });
  server.on('message', (msg, rinfo) => {
     mensaje = msg.toString('utf8');
     mensaje1 = mensaje.split(',');
    fecha=mensaje1[1];
    latitud = mensaje1[2];
    longitud = mensaje1[3];
    ids=mensaje1[5].slice(3, mensaje1[5].length-1);
    var RandomNumber = Math.floor(Math.random() * 1000) + 999;
    if (ids == "HXS313"){

      rpm = 0;
    }else{
      rpm = RandomNumber;
    }
    //console.log(RandomNumber)
    fech = new Date(parseFloat(fecha)-18000000);
    Fecha = `${fech.getFullYear()}-${fech.getMonth() + 1}-${fech.getDate()}`;
    Hora = `${fech.getHours()}:${fech.getMinutes()}:${fech.getSeconds()}`;
    console.log('El mensaje es: ',mensaje);
    console.log('La fecha es: ',Fecha);
    console.log('La hora es: ',Hora);
    console.log('La latitud es: ',latitud);
    console.log('La longitud es: ',longitud);
    console.log('Los rpm es: ',rpm);
    console.log('La id es: ',ids);
    if(con){

      var sql = "INSERT INTO dark (fecha,hora,lat,lon,rpm,idsy) VALUES ? ";
      var values =[[Fecha,Hora,latitud,longitud,rpm,ids]];
      con.query(sql,[values],function(err,result){
        if (err)throw err;
        //console.log("data insert");
        
      });
    
    }else{
      console.log("Error connection with db")
    }
  });
  server.bind(PUERTO, DIRECCION);