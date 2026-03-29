import Slide from "../../components/Home/Slide/Slide";
import DiscountSlide from "../../components/Home/DiscountSlide/DiscountSlide";
import ProductCard from "../../components/Home/ProductCards/productcard";
import "./Home.css";
import RandomProducts from "../../components/Home/RandomProducts/randomproducts";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import type { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import IconButton from "@mui/material/IconButton";

interface HomeLocationState {
  signupSuccess?: boolean;
}

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSignupSuccess, setShowSignupSuccess] = useState(false);

  useEffect(() => {
    const state = location.state as HomeLocationState | null;

    if (state?.signupSuccess) {
      setShowSignupSuccess(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.pathname, location.state, navigate]);

  const handleCloseSnackbar = (
    _event: Event | React.SyntheticEvent,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSignupSuccess(false);
  };
  const loginSnackbarAction = (
    <React.Fragment>
      <IconButton
        size="medium"
        aria-label="close"
        onClick={handleCloseSnackbar}
      >
        <IoCloseOutline />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Slide />
      <ProductCard />
      <DiscountSlide />
      <RandomProducts />
      <Snackbar
        open={showSignupSuccess}
        autoHideDuration={3500}
        onClose={handleCloseSnackbar}
        action={loginSnackbarAction}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Your sign up was successful.
        </Alert>
      </Snackbar>
    </>
  );
}

export default Home;
