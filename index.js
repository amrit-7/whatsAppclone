const express = require("express");
const qr = require("qrcode");

const data = {
  name: "Amritpal",
  age: "23",
};
const jsonQr = JSON.stringify(data);
qr.toString(jsonQr, { type: "terminal" }, (err, qrString) => {
  if (!err) {
    console.log("🚀 ~ file: index.js:9 ~ qrString:", qrString);
  }
});
qr.toFile("qr.png", jsonQr, { type: "terminal" }, (err, qrString) => {
  if (!err) {
    console.log("🚀 ~ file: index.js:9 ~ qrString:", qrString);
  }
});
