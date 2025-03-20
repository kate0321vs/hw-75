import {DecodedMessage, EncodedMessage} from "./type";
import express from "express";
const app = express();
const port = 8000;
const Vigenere = require('caesar-salad').Vigenere;
import cors from 'cors';

app.use(express.json());
app.use(cors());


app.post(`/encode`, (req, res) => {
    const message: EncodedMessage = {
        password: req.body.password,
        encodeMessage: req.body.message,
    };

    const encoded = Vigenere.Cipher(message.password).crypt(message.encodeMessage);
    res.json({encoded: encoded});
});

app.post(`/decode`, (req, res) => {
    const message: DecodedMessage = {
        password: req.body.password,
        decodeMessage: req.body.message
    };
    const decoded = Vigenere.Decipher(message.password).crypt(message.decodeMessage);
    res.json({decoded: decoded});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

