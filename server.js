const fs = require("fs");

const path = require("path");

const express = require("express");

const serveIndex = require("serve-index");

const log = (function () {
  try {
    return console.log;
  } catch (e) {
    return function () {};
  }
})();

const env = path.resolve(__dirname, ".env");

if (!fs.existsSync(env)) {
  throw new Error(`File ${env} doesn't exist`);
}

require("dotenv").config({
  path: env,
});

function check(val, name) {
  if (typeof val !== "string") {
    throw new Error(`${name} is not a string`);
  }

  if (!val.trim()) {
    throw new Error(`${name} is an empty string`);
  }
}

check(process.env.HOST1, "HOST1");
check(process.env.PORT1, "PORT1");

check(process.env.HOST2, "HOST2");
check(process.env.PORT2, "PORT2");

const host1 = process.env.HOST1;
const port1 = process.env.PORT1;

const host2 = process.env.HOST2;
const port2 = process.env.PORT2;

const web = path.resolve(__dirname);

server(host1, port1, true);

server(host2, port2);

function server(host, port, report) {
  const app = express();

  app.use(express.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`);

    next();
  });

  app.use(express.urlencoded({ extended: false }));

  app.use(express.json());

  app.use(
    express.static(web, {
      // http://expressjs.com/en/resources/middleware/serve-static.html
      // maxAge: 60 * 60 * 24 * 1000 // in milliseconds
      maxAge: "356 days", // in milliseconds max-age=30758400
    }),
    serveIndex(web, { icons: true })
  );

  app.listen(port, host, () => {
    if (report) {
      console.log(`\n 🌎  Server is running http://${host}:${port}\n`);
    }
  });
}
