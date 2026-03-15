import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../axios";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { mutateAsync: loginAsync } = useMutation({
    mutationFn: () => {
      return axiosInstance
        .post("/auth/login", { email, password })
        .then((resp) => resp.data);
    },
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const handleLogin = async () => {
    setErrorMessage("");

    try {
      await loginAsync();
    } catch {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };
  return (
    <>
      <p className="label">Email address:</p>
      <input
        className={errorMessage ? "input_error" : "login-input"}
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errorMessage && <p className="login-error">{errorMessage}</p>}
      <p className="label" style={{ marginTop: "10px" }}>
        Password:
      </p>
      <input
        className={errorMessage ? "input_error" : "login-input"}
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        id="signin-button"
        type="button"
        onClick={async () => {
          await handleLogin();
          await queryClient.invalidateQueries();
        }}
        value="Login"
      >
        Sign in
      </button>
      <p className="p-noaccount">
        Don't have an account? <a href="/account">Sign up</a>
      </p>
    </>
  );
}
