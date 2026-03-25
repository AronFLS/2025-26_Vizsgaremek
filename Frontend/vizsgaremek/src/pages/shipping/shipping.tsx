import { useEffect, useState } from "react";
import "./shipping.css";
import { axiosInstance } from "../../axios";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "../../hooks/useAccount";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";

function Shipping() {
  const navigate = useNavigate();

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
        .post("/OrderDrafts", {
          paymentMethod,
          addressLine,
          city,
          zipCode: zipcode,
        })
        .then((resp) => resp.data);
    },
  });
  const { data } = useAccount();
  const isLoggedIn = data !== null;

  useEffect(() => {
    document.body.classList.add("shipping-page");

    return () => {
      document.body.classList.remove("shipping-page");
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
    } catch (error) {
      const axiosError = error as AxiosError<string>;
      setErrorMessage(
        axiosError.response?.data ?? "Order failed. Please try again.",
      );
    }
  };

  const handleShippingClick = () => {
    void handleSignUp();
    navigate("/checkout");
  };

  return (
    <>
      {!isLoggedIn ? (
        <p className="shipping-loggedin-message">
          Please log in to place an order.
        </p>
      ) : (
        <>
          <div className="shipping-main-content">
            <p id="shipping-title">Shipping</p>
            <p id="shipping-alt-title">
              Fill in your delivery details to proceed with the shipping.
            </p>

            <p className="shipping-label">Payment method</p>
            <FormControl>
              <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                defaultValue="Cash on delivery"
                name="radio-buttons-group"
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
              >
                <FormControlLabel
                  value="Cash on delivery"
                  control={<Radio sx={radioSx} />}
                  label="Cash on delivery"
                  sx={radioLabelSx}
                />
                <FormControlLabel
                  value="Credit card"
                  disabled
                  control={<Radio sx={radioSx} />}
                  label="Credit card"
                  sx={radioLabelSx}
                />
                <FormControlLabel
                  value="PayPal"
                  disabled
                  control={<Radio sx={radioSx} />}
                  label="PayPal"
                  sx={radioLabelSx}
                />
                <FormControlLabel
                  value="Apple Pay"
                  disabled
                  control={<Radio sx={radioSx} />}
                  label="Apple Pay"
                  sx={radioLabelSx}
                />
              </RadioGroup>
            </FormControl>

            <p className="shipping-label">Address line</p>
            <input
              type="text"
              className="shipping-input"
              value={addressLine}
              onChange={(e) => {
                setAddressLine(e.target.value);
              }}
            />

            <div id="shipping-location-row">
              <div id="shipping-city-field">
                <p className="shipping-label">City</p>
                <input
                  type="text"
                  className="shipping-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div id="shipping-zipcode-field">
                <p className="shipping-label">Zip code</p>
                <input
                  type="text"
                  className="shipping-input"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                />
              </div>
            </div>

            <button
              id="shipping-submit-button"
              onClick={handleShippingClick}
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

export default Shipping;
