import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { FlexBox } from "../../components/FlexBox";
import { shades } from "../../theme";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { green } from "@mui/material/colors";
import { logOut } from "../../state/userSlice";
import { Badge, Chip, CircularProgress } from "@mui/material";
import { useState } from "react";
import { resolvePath, STATUS } from "../../utils";

const pages = ["History", "Collections"];

const UserAvatar = ({ user, setEmailVerificationAlert }) => {
  return (
    <>
      {user?.verified ? (
        <Avatar src={resolvePath(user?.avatar)} />
      ) : (
        <Chip
          sx={{ cursor: "pointer" }}
          avatar={<Avatar src={resolvePath(user?.avatar)} />}
          label={
            <Badge
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setEmailVerificationAlert(true);
              }}
              badgeContent="Verify"
              sx={{
                "& .MuiBadge-badge": {
                  color: "#ef7b1b",
                  fontSize: "11px",
                },
                mt: "-1px",
                ml: "16px",
                mr: "10px",
              }}
            />
          }
          variant="outlined"
        />
      )}
    </>
  );
};

const UserAlphaticAvatar = ({ user, setEmailVerificationAlert }) => {
  return (
    <>
      {user?.verified ? (
        <Avatar
          sx={{
            bgcolor: green[500],
            color: "#fff !important",
          }}
        >
          {user.firstName[0].toUpperCase()}
        </Avatar>
      ) : (
        <Chip
          // size="large"
          sx={{ cursor: "pointer" }}
          avatar={
            <Avatar
              sx={{
                bgcolor: green[500],
                color: "#fff !important",
              }}
            >
              {user.firstName[0].toUpperCase()}
            </Avatar>
          }
          label={
            <Badge
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setEmailVerificationAlert(true);
              }}
              badgeContent="Verify"
              sx={{
                "& .MuiBadge-badge": {
                  color: "#ef7b1b",
                  fontSize: "11px",
                },
                mt: "-1px",
                ml: "16px",
                mr: "10px",
              }}
            />
          }
          variant="outlined"
        />
      )}
    </>
  );
};

function Navbar({ setEmailVerificationAlert }) {
  const { user, status } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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
    status !== STATUS.LOADING && setAnchorElUser(null);
  };

  return (
    <FlexBox
      sx={{ borderBottom: `1px solid ${shades.primary[100]}` }}
      p={{ xs: "10px 10px 10px 0", md: "10px 15px" }}
      position="sticky"
      top={0}
      zIndex={200}
      backgroundColor="#fafafc"
    >
      {/* desktop logo */}
      <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
        <Link to="/">
          <img width="100px" src={logo} alt="" />
        </Link>
      </Box>

      {/* pages desktop view */}
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page}
            onClick={handleCloseNavMenu}
            sx={{ display: "block" }}
          >
            <Typography
              fontWeight="bold"
              fontSize="15px"
              color={shades.primary[300]}
              textTransform="none"
            >
              {page}
            </Typography>
          </Button>
        ))}
      </Box>

      {/* Menu icon for mobile */}
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
            "& ul": { padding: 0 },
          }}
        >
          {pages.map((page) => (
            <MenuItem
              sx={{
                p: "12px 24px",
                borderBottom: `1px solid ${shades.secondary[300]}`,
              }}
              key={page}
              onClick={handleCloseNavMenu}
            >
              <Typography fontSize="16px" fontWeight="bold" textAlign="center">
                {page}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Mobile logo */}
      <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1, flexGrow: 1 }}>
        <Link to="/">
          <img width="100px" src={logo} alt="" />
        </Link>
      </Box>

      {/* user settings */}
      <Box sx={{ flexGrow: 0 }}>
        {user ? (
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user?.avatar ? (
                <UserAvatar {...{ user, setEmailVerificationAlert }} />
              ) : (
                <UserAlphaticAvatar {...{ user, setEmailVerificationAlert }} />
              )}
            </IconButton>
          </Tooltip>
        ) : (
          <FlexBox
            sx={{
              columnGap: "10px",
              fontWeight: "bold",
            }}
          >
            <Link to="/signin">
              <Box cursor="pointer" fontSize="12px" padding="5px 10px">
                SIGN IN
              </Box>
            </Link>
            <Link to="/signup">
              <Box
                fontSize="12px"
                padding="5px 10px"
                borderRadius="25px"
                color="#fff"
                backgroundColor={shades.secondary[900]}
              >
                SIGN UP
              </Box>
            </Link>
          </FlexBox>
        )}
        <Menu
          sx={{
            mt: "40px",
            "& ul": {
              padding: 0,
            },
            "> div": {
              borderRadius: "10px",
            },
          }}
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
          {/* Email menu item */}
          <MenuItem
            sx={{
              borderBottom: `1px solid ${shades.secondary[300]}`,
              width: "230px",
              padding: "8px 10px",
            }}
            onClick={handleCloseUserMenu}
          >
            <Link to="/account">
              <FlexBox justifyContent="space-between">
                <Box>
                  <Typography fontWeight="bold" fontSize="13px">
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  <Typography color={shades.primary[300]} variant="small">
                    {user?.email}
                  </Typography>
                </Box>
                <Badge
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (!user?.verified) setEmailVerificationAlert(true);
                  }}
                  badgeContent={user?.verified ? "Verified" : "Verify"}
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "11px",
                      color: "#fff",
                      bgcolor: user?.verified ? "#40a0ed" : "#ff7300",
                    },
                    ml: "40px",
                  }}
                />
              </FlexBox>
            </Link>
          </MenuItem>

          {/* links */}
          <Box sx={{ borderBottom: `1px solid ${shades.secondary[300]}` }}>
            {[
              {
                label: "Read the announcement",
                url: "https://openai.com/dall-e-2/",
              },
              {
                label: "Join the DALL.E Discord",
                url: "https://discord.com/invite/openai",
              },
              { label: "Visit the OpenAI API", url: "https://openai.com/api/" },
            ].map((node, idx) => (
              <MenuItem key={idx} sx={{ p: "8px 10px" }}>
                <a
                  style={{ fontSize: "13px" }}
                  href={node.url}
                  target="__blank"
                >
                  {node.label}
                </a>
              </MenuItem>
            ))}
            {status === STATUS.LOADING ? (
              <MenuItem
                sx={{
                  p: "8px 10px",
                }}
              >
                <CircularProgress size="15px" />
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => {
                  dispatch(logOut(navigate));
                  handleCloseUserMenu();
                }}
                sx={{
                  p: "8px 10px",
                  fontSize: "13px",
                }}
              >
                Sign out
              </MenuItem>
            )}
          </Box>

          {/* footer menu items */}
          <FlexBox justifyContent="start" columnGap="10px" p="10px">
            {[
              { label: "Content policy", url: "policies/content-policy" },
              { label: "Terms", url: "/terms" },
              { label: "About", url: "/about" },
            ].map((node, idx) => (
              <Link key={idx} to={node.url} target="__blank">
                <Typography
                  sx={{
                    cursor: "pointer",
                    fontSize: "12px",
                    color: shades.primary[300],
                  }}
                >
                  {node.label}
                </Typography>
              </Link>
            ))}
          </FlexBox>
        </Menu>
      </Box>
    </FlexBox>
  );
}
export default Navbar;
