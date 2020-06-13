const express = require('express');
var ibmdb = require('ibm_db');
const path = require('path');

const app = express();
app.use(express.json({limit: '50mb', extended: true})); // support json encoded bodies
app.use(express.urlencoded({limit: '50mb', extended: true}));

// ENV Var
const DATABASE=process.env.DATABASE;
const HOSTNAME=process.env.HOSTNAME;
const PORT=50000;
const UID=process.env.UID_IBM;
const PWD=process.env.PWD_IBM;
const TABLE=process.env.TABLE_IBM;

const connStr = "DATABASE=" + DATABASE + ";HOSTNAME=" + HOSTNAME + ";UID=" + UID + ";PWD=" + PWD + ";PORT=" + PORT + ";PROTOCOL=TCPIP";
console.log('>>>> CUSTOM_ENV_VAR: ', connStr)
'DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-11.services.dal.bluemix.net;UID=zft48485;PWD=/app;PORT=50000;PROTOCOL=TCPIP'
/* -------------------- APIs -------------------- */
app.get('/ibm', (req, res) => {
  ibmdb.open(connStr).then(
    conn => {
        const sql = "SELECT * FROM "+ TABLE + ";"
        conn.query(sql).then(data => {
            // console.log(data);
            res.send(data)
            conn.closeSync();
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err)
    }
  );
})

/* -------------------- Run Server -------------------- */
const port = process.env.PORT || 5000;
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(port, () => console.log(`Listening on port ${port}`));