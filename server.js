const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

let orders = [];

/* HOME PAGE */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* SAVE ORDER */
app.post("/order", (req, res) => {

  const newOrder = {
    fullname: req.body.fullname,
    mobile: req.body.mobile,
    whatsapp: req.body.whatsapp,
    email: req.body.email,
    service: req.body.service,
    delivery: req.body.delivery,
    payment: req.body.payment,
    description: req.body.description
  };

  orders.push(newOrder);

  res.send("Order Submitted Successfully");

});

/* ADMIN PANEL */
app.get("/admin", (req, res) => {

  let html = `
  <html>
  <head>
  <title>Admin Panel</title>

  <style>

  body{
    background:#0f172a;
    color:white;
    font-family:sans-serif;
    padding:20px;
  }

  .card{
    background:#1e293b;
    padding:20px;
    margin-bottom:20px;
    border-radius:15px;
  }

  h1{
    color:#00e5ff;
  }

  </style>

  </head>
  <body>

  <h1>WorldService Admin Panel</h1>
  `;

  orders.forEach((order, index) => {

    html += `

    <div class="card">

    <h2>Order ${index + 1}</h2>

    <p><b>Full Name:</b> ${order.fullname}</p>

    <p><b>Mobile:</b> ${order.mobile}</p>

    <p><b>WhatsApp:</b> ${order.whatsapp}</p>

    <p><b>Email:</b> ${order.email}</p>

    <p><b>Service:</b> ${order.service}</p>

    <p><b>Delivery:</b> ${order.delivery}</p>

    <p><b>Payment:</b> ${order.payment}</p>

    <p><b>Description:</b> ${order.description}</p>

    </div>

    `;
  });

  html += `
  </body>
  </html>
  `;

  res.send(html);

});

/* START SERVER */
app.listen(3000, () => {
  console.log("WorldService Running");
});
