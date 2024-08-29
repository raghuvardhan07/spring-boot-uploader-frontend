import { useEffect, useState } from "react";
import API from "../services/api";
import "./styles/FileList.css";
import "./styles/SearchBar.css";
import FileUpload from "./FileUpload";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

function FileList() {
    const [files, setFiles] = useState([]);
    const [query, setQuery] = useState("");

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await API.get(
                "/api/files/search",
                { params: { query: query } },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);

            setFiles(response.data);
        } catch (error) {
            console.error("Search failed", error);
        }
    };

    const fetchFiles = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await API.get("/api/files/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFiles(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Failed to fetch files", error);
        }
    };

    const handleDelete = async (filename) => {
        try {
            const token = localStorage.getItem("token");
            await API.delete(`/api/files/delete/${filename}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchFiles(); // Refresh file list after deletion
        } catch (error) {
            console.error("Failed to delete file", error);
        }
    };

    const handleDownload = async (filename) => {
        try {
            const token = localStorage.getItem("token");
            const response = await API.get(`/api/files/download/${filename}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/pdf",
                },
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename); // Use the provided filename
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url); // Release memory
        } catch (error) {
            console.error("Failed to download file", error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <div className="fileContainer">
            <div className="searchBar">
                <input
                    type="text"
                    placeholder="Search files"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <FileUpload onUpload={(newFile) => setFiles([newFile, ...files])} />
            <div className="fileList">
                <h2>Files</h2>
                <ul>
                    {files.map((file) => (
                        <li key={file.fileId}>
                            {file.fileName} - {file.createdAt}
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDelete(file.fileId)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<DownloadIcon />}
                                onClick={() => handleDownload(file.fileId)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FileList;
