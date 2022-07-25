import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreIcon from "@mui/icons-material/MoreVert";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";
import { useUser } from "../auth/useUser";
import { NavMenu } from "./StyledComponents";

export default function NavBar() {
    const user = useUser();

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const logOut = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link to="/profile">
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            </Link>
            <MenuItem onClick={logOut}>Log Out</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem
                onClick={logOut}
                sx={{ display: "flex", justifyContent: "center" }}
            >
                Log Out
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <NavMenu position="static">
                <Toolbar>
                    <Link style={{ textDecoration: "none" }} to="/">
                        <img
                            src={require("../assets/logo.png")}
                            alt="logo"
                            style={{ width: "15rem" }}
                        />
                    </Link>
                    <Link to="/">
                        <MenuItem>
                            <Typography textAlign="center" sx={{ color: "#3072FE", fontWeight: 'bold' }}>
                                All Playlists
                            </Typography>
                        </MenuItem>
                    </Link>
                    <Link to="/playlist/create">
                        <MenuItem>
                            <Typography
                                textAlign="center"
                                sx={{ color: "#3072FE", fontWeight: "bold" }}
                            >
                                Create Playlist
                            </Typography>
                        </MenuItem>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        {!user && (
                            <Link
                                style={{
                                    textDecoration: "none",
                                    margin: "auto",
                                }}
                                to="/login"
                            >
                                <Button color="inherit">Login</Button>
                            </Link>
                        )}

                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </NavMenu>
            {user && renderMobileMenu}
            {user && renderMenu}
        </Box>
    );
}
