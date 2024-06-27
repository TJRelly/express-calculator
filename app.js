const express = require("express");
const { calcMean, calcMedian, calcMode } = require("./helpers");
const ExpressError = require("./expressError");

const app = express();

app.use(express.json());

app.get("/", function (req, res) {
    res.redirect("/");
});

app.get("/mean", (req, res, next) => {
    try {
        if (!req.query.nums)
            throw new ExpressError(
                "You must pass a query key of nums with a comma-separated list of numbers.",
                400
            );

        let nums = req.query.nums.split(",").map(Number);

        if (!nums.every(Number)) {
            throw new ExpressError("Must only enter numbers", 400);
        } else if (!nums) throw new ExpressError("Nums cannot be empty", 400);

        return res.json({
            operation: "mean",
            value: calcMean(nums),
        });
    } catch (err) {
        next(err);
    }
});

app.get("/median", (req, res, next) => {
    try {
        if (!req.query.nums)
            throw new ExpressError(
                "You must pass a query key of nums with a comma-separated list of numbers.",
                400
            );

        let nums = req.query.nums.split(",").map(Number);

        if (!nums.every(Number)) {
            throw new ExpressError("You must only enter numbers", 400);
        }

        res.json({
            operation: "median",
            value: calcMedian(nums),
        });
    } catch (e) {
        next(e);
    }
});

app.get("/mode", (req, res, next) => {
    try {
        if (!req.query.nums)
            throw new ExpressError(
                "You must pass a query key of nums with a comma-separated list of numbers.",
                400
            );

        let nums = req.query.nums.split(",").map(Number);

        if (!nums.every(Number)) {
            throw new ExpressError("Must only enter numbers", 400);
        }

        res.json({
            operation: "mode",
            value: calcMode(nums),
        });
    } catch (e) {
        next(e);
    }
});

// If no other route matches, respond with a 404
app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404);
    next(e);
});

// Error handler
app.use(function (err, req, res, next) {
    //Note the 4 parameters!
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.msg;

    // set the status and alert the user
    return res.status(status).json({
        error: { message, status },
    });
});

app.listen(3000, function () {
    console.log("App on port 3000");
});
