const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require('child_process');
const path = require('path');
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render(path.join(__dirname, 'index.ejs'), { result: undefined });
});

app.post("/calculate", (req, res) => {
    const number = parseFloat(req.body.number);

    // Spawn a Python process to execute the calculator script
    const pythonProcess = spawn('python', ['./calculator.py', number.toString()]);

    let result = '';

    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python script: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python script exited with code ${code}`);
            res.render(path.join(__dirname, 'index.ejs'), { result: 'Error' });
        } else {
            // Parse the result as float
            const parsedResult = parseFloat(result.trim());
            console.log(parsedResult);
            res.render(path.join(__dirname, 'index.ejs'), { result: parsedResult });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
