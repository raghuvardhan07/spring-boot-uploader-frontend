import { useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import Button from "@mui/material/Button";
import Logout from "@mui/icons-material/Logout";
function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            Spring-Uploader
            <Button
                variant="contained"
                color="secondary"
                startIcon={<Logout />}
                onClick={() => handleLogout()}
            />
        </nav>
    );
}

export default Navbar;
