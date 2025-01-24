import { Box, IconButton, Button, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import PropTypes from "prop-types"; // Import PropTypes for validation

const Header = ({ onToggleSidebar }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "white",
        color: "black",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {isMobile && (
          <IconButton onClick={onToggleSidebar} sx={{ color: "black" }}>
            <MenuIcon />
          </IconButton>
        )}
        <img src="../public/logo.png" alt="Logo" style={{ marginLeft: 8 }} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton sx={{ color: "black" }}>
          <LightModeIcon />
        </IconButton>
        {isAuthenticated ? (
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{ color: "white" }}>
            Logout
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            sx={{ color: "white" }}
            href="/login">
            Login
          </Button>
        )}
      </Box>
    </Box>
  );
};

Header.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired, 
};

export default Header;
