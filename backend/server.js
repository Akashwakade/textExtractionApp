const express = require("express");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });


// OCR endpoint
app.post("/api/ocr", upload.single("image"), (req, res) => {
    const imagePath = req.file.path;

    Tesseract.recognize(
        imagePath,
        "eng", // Replace "eng" with the desired language code for multilingual support
        {
            logger: (info) => console.log(info),
        }
    )
        .then(({ data: { text } }) => {
            res.json({ text });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "OCR failed" });
        });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
