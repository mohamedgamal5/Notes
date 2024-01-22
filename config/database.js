const mongoose = require("mongoose");
const dbconnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
      console.log(`connect database success :${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(`DB error ${err}`);
      process.exit();
    });
};

module.exports = dbconnection;
