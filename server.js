const express = require('express');
var ibmdb = require('ibm_db');

const app = express();
app.use(express.json({limit: '50mb', extended: true})); // support json encoded bodies
app.use(express.urlencoded({limit: '50mb', extended: true}));

// ENV Var
DATABASE="BLUDB"
HOSTNAME="dashdb-txn-sbox-yp-dal09-11.services.dal.bluemix.net"
PORT=50000
UID="zft48485"
PWD="pg52md3zdt^4hm83"
TABLE="ZFT48485.FIRERISK"

const connStr = "DATABASE=" + DATABASE + ";HOSTNAME=" + HOSTNAME + ";UID=" + UID + ";PWD=" + PWD + ";PORT=" + PORT + ";PROTOCOL=TCPIP";

/* -------------------- APIs -------------------- */
app.get('/ibm', (req, res) => {
  ibmdb.open(connStr).then(
    conn => {
        const sql = "SELECT * FROM "+ TABLE + ";"
        conn.query(sql).then(data => {
            console.log(data);
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
const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening on port ${port}`));