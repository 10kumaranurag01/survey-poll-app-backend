const express = require("express")
const bodyParser = require("body-parser")
const surveyRouter = require("./routes/surveyRoutes")

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/surveys', surveyRouter);
app.listen(port, () => {
    console.log(`running on ${port}`)
})