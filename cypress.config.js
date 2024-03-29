const { defineConfig } = require("cypress");
const mysql = require("mysql");

module.exports = defineConfig({
  watchForFileChanges: false,
  env: {
    db: {
      host: "db4free.net",
      user: "kostagdansk",
      password: "qwertyui",
      database: "ksopot",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        queryDb: (query) => {
          return queryTestDb(query, config);
        },
      });
    },
  },
});

function queryTestDb(query, config) {
  const connection = mysql.createConnection(config.env.db);
  connection.connect();
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        connection.end();
        return resolve(results);
      }
    });
  });
}
