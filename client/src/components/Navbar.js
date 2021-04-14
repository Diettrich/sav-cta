import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchBar from "material-ui-search-bar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import { AccountContext, RequestContext } from "../contexts";

export default function SearchAppBar() {
  const classes = useStyles();
  const menuId = "primary-search-account-menu";
  const globalSearch = useContext(RequestContext);
  const { logoutUser } = useContext(AccountContext);
  const history = useHistory();
  const [valueSearch, setValueSearch] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const onSearch = (value) => {
    globalSearch.onGlobalSearch(value);
  };
  const handleLogout = () => {
    logoutUser();
    history.push("/");
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Typography onClick={handleLogout} variant="button">
          Déconnecter
        </Typography>
      </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.backgroundColor}>
        <Toolbar>
          <img src="/logo-electroplanet.svg" alt="logo-Electroplanet" />
          <Typography
            className={classes.title}
            variant="h6"
            component="h6"
            noWrap
          >
            Platforme - CTA
          </Typography>

          <div className={classes.search}>
            <SearchBar
              placeholder="Recherche…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
                icon: classes.searchIcon,
              }}
              value={valueSearch}
              onChange={(newValue) => setValueSearch(newValue)}
              onRequestSearch={onSearch}
            />
          </div>
          <div className={classes.alignRight}>
            <Typography
              variant="caption"
              style={{ fontSize: "14px", fontWeight: "bold" }}
              noWrap
            >
              {localStorage.getItem("userName")}
            </Typography>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: "#ffffff",
    textAlign: "left",
    marginLeft: "25px",
  },
  search: {
    position: "relative",
    borderRadius: "20px",
    marginRight: "25px",
    backgroundColor: "rgba(0,0,0,0.1)",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    color: "#ffffff",
  },
  inputRoot: {
    color: "inherit",
    background: "transparent",
    boxShadow: "none",
    height: "36px",
  },
  inputInput: {
    color: "#ffffff",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + -10px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "24ch",
      "&:focus": {
        width: "32ch",
      },
    },
  },
  userName: {
    textTransform: "uppercase",
    margin: "0 8px",
  },
  backgroundColor: {
    backgroundColor: "#DC0710",
  },
}));
