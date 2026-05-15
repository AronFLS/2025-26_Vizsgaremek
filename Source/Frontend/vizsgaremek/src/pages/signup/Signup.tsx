import { useEffect, useState } from "react";
import "./Signup.css";
import { axiosInstance } from "../../axios";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "../../hooks/useAccount";
import { useNavigate } from "react-router-dom";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{12,24}$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

function Signup() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [confirmPasswordInvalid, setConfirmPasswordInvalid] = useState(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordMatchError, setPasswordMatchError] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [phoneNumberInvalid, setPhoneNumberInvalid] = useState(false);
  const navigate = useNavigate();

  const { mutateAsync: registerAsync, isPending } = useMutation({
    mutationFn: () => {
      return axiosInstance
        .post("/auth/register", {
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
        })
        .then((resp) => resp.data);
    },
  });
  const { data } = useAccount();
  const isLoggedIn = data !== null;

  useEffect(() => {
    document.body.classList.add("account-page");

    return () => {
      document.body.classList.remove("account-page");
    };
  }, []);

  useEffect(() => {
    setEmailError("");
    setEmailInvalid(false);
  }, [email]);

  useEffect(() => {
    setPasswordError("");
    setPasswordMatchError("");
    setPasswordInvalid(false);
    setConfirmPasswordInvalid(false);
  }, [password, confirmPassword]);

  useEffect(() => {
    setPhoneNumberError("");
    setPhoneNumberInvalid(false);
  }, [phoneNumber]);

  useEffect(() => {
    setErrorMessage("");
  }, [firstName, lastName, phoneNumber, email, password, confirmPassword]);

  const handleSignUp = async () => {
    setErrorMessage("");

    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Please enter a valid email address.");
      setEmailInvalid(true);
      return;
    }

    if (!PWD_REGEX.test(password)) {
      setPasswordError(
        "Password must be 12–24 characters and include uppercase, lowercase, a number, and a special character (!@#$%_).",
      );
      setPasswordInvalid(true);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match.");
      setPasswordInvalid(true);
      setConfirmPasswordInvalid(true);
      return;
    }
    if (!PHONE_REGEX.test(phoneNumber)) {
      setPhoneNumberError("Please enter a valid phone number.");
      setPhoneNumberInvalid(true);
      return;
    }

    try {
      await registerAsync();
      navigate("/", { state: { signupSuccess: true } });
      return;
    } catch {
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <p className="p-loggedin">You are logged in.</p>
      ) : (
        <>
          <div className="main-content">
            <p id="title">Create Account</p>
            <p id="alt-title">Fill in your information to register</p>

            <div id="name">
              <div id="firstname">
                <p className="label">First name:</p>
                <input
                  className="signup-input"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div id="lastname">
                <p className="label">Last name:</p>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="signup-input"
                />
              </div>
            </div>

            <p className="label">Email address:</p>
            <input
              type="email"
              form="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={emailInvalid ? "input-error" : "signup-input"}
            />
            {emailError && <p className="email-error">{emailError}</p>}

            <p className="label">Password:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordMatchError("");
                setConfirmPasswordInvalid(false);
              }}
              className={passwordInvalid ? "input-error" : "signup-input"}
            />
            {passwordError && <p className="password-error">{passwordError}</p>}

            <p className="label">Confirm password:</p>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordMatchError("");
                setConfirmPasswordInvalid(false);
              }}
              className={
                confirmPasswordInvalid ? "input-error" : "signup-input"
              }
            />
            {passwordMatchError && (
              <p className="password-error">{passwordMatchError}</p>
            )}

            <p className="label">Phone number:</p>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={phoneNumberInvalid ? "input-error" : "signup-input"}
            />

            {phoneNumberError && (
              <p className="password-error">{phoneNumberError}</p>
            )}

            <button
              id="signup-button"
              onClick={() => {
                void handleSignUp();
              }}
              disabled={isPending}
            >
              {isPending ? "Signing up..." : "Sign up"}
            </button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </>
      )}
    </>
  );
}

export default Signup;
