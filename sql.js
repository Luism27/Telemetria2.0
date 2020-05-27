var mysql = require('mysql');
var con = mysql.createConnection({
  host: "design.ck9qlt1qutiu.us-east-1.rds.amazonaws.com",
  user: "dark",
  password: "mr01121998",
  database: 'design'
});

if (con){   
    var sql = "UPDATE dark SET idsy = 'HXS313' WHERE rpm = '0' ";
    con.query(sql,function(err,result){
        if (err) throw err;
        console.log(result)
    })

}else{
    console.log("Error conection with db")
}
// con.connect(function(err) {
//     if (err) throw err;
//     var sql = "DELETE FROM dark WHERE rpm = '410C11B6'";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Number of records deleted: " + result.affectedRows);
//     });
//   });