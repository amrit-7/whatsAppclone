const express = require("express");
const app = express();
const ejs = require("ejs");
const qrc = require("qrcode");
const qrcode = require("qrcode-terminal");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
const { Client } = require("whatsapp-web.js");
const client = new Client();

app.get("/", (req, res) => {
  // console.log(qrcode);
  client.on("qr", (qr) => {
    qrc.toDataURL(qr, (err, url) => {
      if (err) {
        console.log("hello", err);
      } else {
        res.render("home.ejs", { code: url });
      }
    });
  });
  client.on("ready", () => {
    console.log("Client is ready!");
  });

  client.on("message", (message) => {
    console.log(message.body);
  });
  client.on("message", (message) => {
    if (message.body === "!ping") {
      message.reply("pong");
    }
  });

  client.initialize();

  // const data = {
  //   name: "Amritpal",
  //   age: "23",
  // };
  // const jsonQr = JSON.stringify(data);
  // qr.toString(jsonQr, { type: "terminal" }, (err, qrString) => {
  //   if (!err) {
  //     console.log("🚀 ~ file: index.js:9 ~ qrString:", qrString);
  //   }
  // });
  // const newQR = await qr.toDataURL(
  //   "qr.png",
  //   jsonQr,
  //   { type: "terminal" },
  //   (err) => {
  //     if (err) {
  //       console.log("🚀 ~ file: index.js:9 ~ ERROR:", err);
  //     }
  //   }
  // );
  // console.log("🚀 ~ file: index.js:23 ~ newQR ~ newQR:", newQR);
});

app.listen(3000, () => {
  console.log("Server at 3000");
});
