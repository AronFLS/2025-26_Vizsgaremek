import { useEffect, useState } from "react";
import "./account.css";
import { axiosInstance } from "../../axios";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "../../hooks/useAccount";

function Account() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

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

  const handleSignUp = async () => {
    setErrorMessage("");
    setSuccessMessage("");

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

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      await registerAsync();
      setSuccessMessage("Account created successfully.");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch {
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <p>You are logged in.</p>
      ) : (
        <>
          <div className="main-content">
            <p id="title">Create Account</p>
            <p id="alt-title">Fill in your information to register</p>

            <div id="name">
              <div id="firstname">
                <p className="label">First name:</p>
                <input
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
                />
              </div>
            </div>

            <p className="label">Email address:</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p className="label">Password:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p className="label">Confirm password:</p>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <p className="label">Phone number:</p>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <button
              id="signup-button"
              onClick={handleSignUp}
              disabled={isPending}
            >
              {isPending ? "Signing up..." : "Sign up"}
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

export default Account;
