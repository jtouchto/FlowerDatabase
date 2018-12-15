const io = require('socket.io')();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('flowers.db');

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });

  client.on('getFlowers', () => {
    var flowers;
    db.all("SELECT * From flowers", (err, row) => {
      client.emit('flowers', row);
       console.log(row);
    })
  });

  client.on('getRecent', (comname) => {
    var flowers;
    db.all("SELECT * From sightings where name = ? order by Sighted desc Limit 10", [comname], (err, row) => {
      client.emit('recent', row);
       console.log(row);
    })
  });

  client.on('update', (oldr, newr) => {
    db.run("Update Flowers set GENUS = ?, SPECIES = ?, COMNAME=? Where GENUS = ?  AND SPECIES = ? And COMNAME = ?",
    [newr.GENUS, newr.SPECIES, newr.COMNAME, oldr.GENUS, oldr.SPECIES, oldr.COMNAME]);
  });

  client.on('insert', (newr) => {
    db.run("insert into SIGHTINGS (NAME, PERSON, LOCATION, SIGHTED) values (?,?,?,?)",
    [newr.Name, newr.Person, newr.Location, newr.Sighted]);
  });

});




const port = 8000;
io.listen(port);
console.log('listening on port ', port);
