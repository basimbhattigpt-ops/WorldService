const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// HOME PAGE
app.get("/", (req, res) => {
res.sendFile(__dirname + "/public/index.html");
});

// SAVE ORDER
app.post("/order", (req, res) => {

const data = `

========================

Full Name: ${req.body.name}

Mobile: ${req.body.mobile}

WhatsApp: ${req.body.whatsapp}

Email: ${req.body.email}

Country: ${req.body.country}

Service: ${req.body.service}

Delivery: ${req.body.delivery}

Price: ${req.body.price}

Payment Method: ${req.body.payment}

Details:
${req.body.details}

========================

`;

fs.appendFileSync("orders.txt", data);

res.send(`

<html><head><title>Order Success</title><style>

body{
background:#0f172a;
font-family:Arial;
text-align:center;
padding-top:100px;
color:white;
}

h1{
color:#22c55e;
font-size:40px;
}

p{
font-size:20px;
}

</style></head><body><h1>✔️ Order Submitted Successfully</h1><p>WorldService Team Will Contact You Soon.</p></body></html>`);

});

// ADMIN PANEL
app.get("/admin", (req, res) => {

const password = req.query.pass;

if(password !== "world123"){

return res.send("<h1 style='color:red;text-align:center;margin-top:100px;'>Access Denied ❌</h1>");

}

let data = "No Orders Yet";

if(fs.existsSync("orders.txt")){

data = fs.readFileSync("orders.txt","utf8");

}

res.send(`

<html><head><title>WorldService Admin</title><style>

body{
background:#111827;
color:white;
font-family:Arial;
padding:20px;
}

h1{
color:#22c55e;
}

pre{
background:#1f2937;
padding:20px;
border-radius:10px;
white-space:pre-wrap;
}

</style></head><body><h1>🔐 WorldService Admin Panel</h1><pre>${data}</pre></body></html>`);

});

// SERVER
app.listen(3000, () => {

console.log("WorldService Running On Port 3000");

});
