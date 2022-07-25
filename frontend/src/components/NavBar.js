import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";

import { useUser } from "../auth/useUser";
import { NavMenu, PRIMARY_BLUE } from "./StyledComponents";

export default function NavBar() {
    const user = useUser();
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const logOut = () => {
        localStorage.removeItem("token");
        navigate("/login");       
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <NavMenu position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        <img
                            src={require("../assets/logo.png")}
                            alt="logo"
                            style={{ width: "15rem" }}
                        />
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            <Link to="/">
                                <MenuItem>
                                    <Typography
                                        textAlign="center"
                                        sx={{
                                            color: PRIMARY_BLUE,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        All Playlists
                                    </Typography>
                                </MenuItem>
                            </Link>
                            <Link to="/playlist/create">
                                <MenuItem>
                                    <Typography
                                        textAlign="center"
                                        sx={{
                                            color: PRIMARY_BLUE,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Create Playlist
                                    </Typography>
                                </MenuItem>
                            </Link>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        <img
                            src={require("../assets/logo.png")}
                            alt="logo"
                            style={{ width: "10rem" }}
                        />
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Link to="/">
                            <MenuItem>
                                <Typography
                                    textAlign="center"
                                    sx={{
                                        color: PRIMARY_BLUE,
                                        fontWeight: "bold",
                                    }}
                                >
                                    All Playlists
                                </Typography>
                            </MenuItem>
                        </Link>
                        <Link to="/playlist/create">
                            <MenuItem>
                                <Typography
                                    textAlign="center"
                                    sx={{
                                        color: PRIMARY_BLUE,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Create Playlist
                                </Typography>
                            </MenuItem>
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {!user && (
                            <Link
                                style={{
                                    textDecoration: "none",
                                    margin: "auto",
                                    marginRight: "15px",
                                    color: PRIMARY_BLUE,
                                }}
                                to="/login"
                            >
                                <Button sx={{color: PRIMARY_BLUE}}>Login</Button>
                            </Link>
                        )}
                        {user && (
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                                color="inherit"
                            >
                                <AccountCircle fontSize="large" sx={{color: PRIMARY_BLUE}} />
                            </IconButton>
                        )}

                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <Link to="/profile">
                                <MenuItem onClick={handleCloseUserMenu}>
                                    Profile
                                </MenuItem>
                            </Link>
                            <MenuItem onClick={logOut}>Log Out</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </NavMenu>
    );
};