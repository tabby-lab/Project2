//requiring our dependencies
const mysql = require("mysql");

//create our conneciton to the database
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "jw0ch9vofhcajqg7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "b7d3if8lvdr272fx",
        password: "rea4k5v54koe4z9h",
        database: "	x8m5r80pdkjp57fn"
    });
}
connection.connect();
module.exports = connection;

//