import { useState } from "react";
import API from "../services/api";
import "./styles/FileUpload.css";

// eslint-disable-next-line react/prop-types
function FileUpload({ onUpload }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const token = localStorage.getItem("token");
            const uploadedFile = await API.post("/api/files/upload", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("File Uploaded:", uploadedFile.data);
            onUpload(uploadedFile.data);
        } catch (error) {
            console.error("Upload failed", error);
        }
    };

    return (
        <div className="fileUpload">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default FileUpload;
