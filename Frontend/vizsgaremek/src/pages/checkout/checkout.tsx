import { useEffect, useState } from "react";
import "./chekout.css";
import { axiosInstance } from "../../axios";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "../../hooks/useAccount";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function Order() {
  const radioSx = {
    ml: 2,
    p: 0.5,
    "&.Mui-checked": {
      color: "#f63049",
    },
  };

  const radioLabelSx = {
    "& .MuiFormControlLabel-label": {
      color: "#292929",
    },
  };

  const [status, setStatus] = useState<string>("pending");
  const [addressLine, setAddressLine] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [paymentMethod, setPaymentMethod] =
    useState<string>("Cash on delivery");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const { mutateAsync: registerAsync, isPending } = useMutation({
    mutationFn: () => {
      return axiosInstance
        .post("/Orders", {
          paymentMethod,
          status,
          addressLine,
          city,
          zipcode,
        })
        .then((resp) => resp.data);
    },
  });
  const { data } = useAccount();
  const isLoggedIn = data !== null;

  useEffect(() => {
    document.body.classList.add("checkout-page");

    return () => {
      document.body.classList.remove("checkout-page");
    };
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [addressLine, city, zipcode, paymentMethod]);

  const handleSignUp = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!addressLine || !city || !zipcode || !paymentMethod) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      await registerAsync();
      setSuccessMessage("Order placed successfully.");
      setAddressLine("");
      setCity("");
      setZipcode("");
      setPaymentMethod("Cash on delivery");
      setStatus("pending");
    } catch {
      setErrorMessage("Order failed. Please try again.");
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <p className="checkout-loggedin-message">You are logged in.</p>
      ) : (
        <>
          <div className="checkout-main-content">
            <p id="checkout-title">Checkout</p>
            <p id="checkout-alt-title">
              Fill in your delivery details to proceed with the checkout.
            </p>

            <p className="checkout-label">Payment method</p>
            <FormControl>
              <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                defaultValue="Cash on delivery"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Cash on delivery"
                  control={<Radio sx={radioSx} />}
                  label="Cash on delivery"
                  sx={radioLabelSx}
                />
                <FormControlLabel
                  value="Credit card"
                  control={<Radio sx={radioSx} />}
                  label="Credit card"
                  sx={radioLabelSx}
                />
                <FormControlLabel
                  value="PayPal"
                  control={<Radio sx={radioSx} />}
                  label="PayPal"
                  sx={radioLabelSx}
                />
                <FormControlLabel
                  value="Apple Pay"
                  control={<Radio sx={radioSx} />}
                  label="Apple Pay"
                  sx={radioLabelSx}
                />
              </RadioGroup>
            </FormControl>

            <p className="checkout-label">Address line</p>
            <input
              type="text"
              className="checkout-input"
              value={addressLine}
              onChange={(e) => {
                setAddressLine(e.target.value);
              }}
            />

            <div id="checkout-location-row">
              <div id="checkout-city-field">
                <p className="checkout-label">City</p>
                <input
                  type="text"
                  className="checkout-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div id="checkout-zipcode-field">
                <p className="checkout-label">Zip code</p>
                <input
                  type="text"
                  className="checkout-input"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                />
              </div>
            </div>

            <button
              id="checkout-submit-button"
              onClick={handleSignUp}
              disabled={isPending}
            >
              {isPending ? "Processing..." : "Place Order"}
            </button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Order;
