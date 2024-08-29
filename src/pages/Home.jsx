// import { useState } from "react";
import Navbar from "../components/Navbar";
import FileList from "../components/FileList";
import "./styles/Home.css";

function Home() {
    return (
        <div className="home">
            <Navbar />
            <FileList />
        </div>
    );
}

export default Home;
