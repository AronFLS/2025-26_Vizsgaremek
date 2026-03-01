import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../../../axios";
import { Link } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutateAsync: loginAsync } = useMutation({
    mutationFn: () => {
      return axiosInstance
        .post("/auth/login", { email, password })
        .then((resp) => resp.data);
    },
  });
  const queryClient = useQueryClient();
  return (
    <>
      <p className="label">Email address:</p>
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className="label" style={{ marginTop: "10px" }}>
        Password:
      </p>
      <input
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
          await loginAsync();
          queryClient.invalidateQueries();
        }}
        value="Login"
      >
        Sign in
      </button>
      <p className="p-noaccount">
        Don't have an account? <Link to="/account">Sign up</Link>
      </p>
    </>
  );
}
