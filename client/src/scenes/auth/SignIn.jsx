import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { shades } from "../../theme";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Oauth from "./Oauth";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Popover,
} from "@mui/material";
import { login } from "../../state/userSlice";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();

  const initialValues = {
    email: "",
    password: "",
    isPersistent: false,
  };

  const validationSchema = yup.object().shape({
    email: yup.string().trim().email("Invalid email").required("Required"),
    password: yup.string().trim().required("Required"),
  });

  const handleFormSubmit = (values, { setSubmitting }) => {
    dispatch(login(values, setSubmitting, navigate, state?.from));
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema,
  });

  const {
    values,
    errors,
    handleSubmit,
    isSubmitting,
    touched,
    handleBlur,
    handleChange,
  } = formik;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        maxWidth: "400px",
        padding: "20px",
        margin: "30px auto auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography color={shades.primary[400]} fontSize="28px" fontWeight="bold">
        Welcome back
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          error={!!touched.email && !!errors.email} //converting value to a boolean
          helperText={touched.email && errors.email}
          sx={{
            margin: "8px 0",
          }}
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />

        <TextField
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          error={!!touched.password && !!errors.password} //converting value to a boolean
          helperText={touched.password && errors.password}
          sx={{
            margin: "8px 0",
          }}
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isPersistent"
              value={values.isPersistent}
              color="primary"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          }
          label="Keep me signed in."
        />

        <Button
          sx={{
            color: "#4a70c0",
            fontSize: "13px",
            textTransform: "none",
            fontWeight: 400,
            padding: 0,
            ml: "-8px",
            mt: "1px",
          }}
          onClick={handleClick}
        >
          Details
          <ArrowDropDownIcon sx={{ mt: "-1px", color: shades.primary[400] }} />
        </Button>

        {/* popover  */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Box width="300px" p="15px">
            <Typography
              variant="small"
              sx={{
                whiteSpace: "pre-wrap",
                color: shades.primary[400],
              }}
            >
              {`Choosing "Keep me signed in" reduces the number of times you're asked to Sign-In on this device.\nTo keep your account secure, use this option only on your personal devices.`}
            </Typography>
          </Box>
        </Popover>

        <Box
          sx={{
            my: 1,
            position: "relative",
            width: "100%",
            height: "53px",
          }}
        >
          <Button
            sx={{
              height: "100%",
            }}
            fullWidth
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >
            Sign in
          </Button>
          {isSubmitting && (
            <CircularProgress
              size={24}
              sx={{
                color: "#000000",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>

        <Typography color={shades.primary[400]} textAlign="center">
          Don't have an account?{" "}
          <Link
            style={{ color: "#000000", textDecoration: "none" }}
            to="/signup"
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
      <Oauth />
    </Box>
  );
}
