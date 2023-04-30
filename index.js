const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const toolsRouters = require("./routes/toolsApi");
const errorHandelar = require("./middleware/errorHandelar");
const { connectToServer } = require("./utils/dbConnect");

app.use(cors());
app.use(express.json());


connectToServer((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log(`<p> Example app listening on port <a href="http://localhost:${port}">live</a> </p>`);
        })
    } else{
        console.log(err)
    }
})

// dbCannect()

app.use(errorHandelar)

app.use("/tools", toolsRouters)

async function run() {
    await connect();
}

run().catch(console.dir);


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// all route 
app.all("*", (req, res) => {
    res.send("No Route Found");
});


// global error handel

process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
        process.exit(1);
    });
});

