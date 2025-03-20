import {Message} from "./type";
import express from "express";
const app = express();
const port = 8000;
const Vigenere = require('caesar-salad').Vigenere;

app.use(express.json());

app.post(`/encode`, (req, res) => {
    const message: Message = {
        password: req.body.password,
        message: req.body.message,
    };

    const encode = Vigenere.Cipher(message.password).crypt(message.message);
    res.send({encode: encode});
});

app.post(`/decode`, (req, res) => {
    const message: Message = {
        password: req.body.password,
        message: req.body.message,
    };
    const decode = Vigenere.Decipher(message.password).crypt(message.message);
    res.send({decode: decode});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

