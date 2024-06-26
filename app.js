const express = require("express");
const { calcMean, calcMedian, calcMode } = require("./operations");

const app = express();

app.use(express.json());

app.get("/mean", (req, res) => {
    let mean = calcMean(req.query.nums);

    res.json({
        operation: "mean",
        value: mean,
    });
});

app.get("/median", (req, res) => {
    let median = calcMedian(req.query.nums);

    res.json({
        operation: "median",
        value: median,
    });
});

app.get("/mode", (req, res) => {
    let mode = calcMode(req.query.nums);

    res.json({
        operation: "mode",
        value: mode,
    });
});

app.listen(3000, function () {
    console.log("App on port 3000");
});
