import React, { useState } from "react";
import axios from "axios";

const App = () => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!image) {
            alert("Please select an image first");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await axios.post("http://localhost:3000/api/ocr", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setText(response.data.text);
        } catch (error) {
            console.error(error);
            alert("OCR failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h1>OCR Text Extraction</h1>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Processing..." : "Extract Text"}
            </button>
            <div style={{ marginTop: "20px" }}>
                <h3>Extracted Text:</h3>
                <p>{text || "No text extracted yet."}</p>
            </div>
        </div>
    );
};

export default App;
