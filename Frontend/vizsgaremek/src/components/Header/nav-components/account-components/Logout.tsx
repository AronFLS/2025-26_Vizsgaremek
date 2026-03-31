import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../axios";
import { useAccount } from "../../../../hooks/useAccount";
import { Link } from "react-router-dom";

export function Logout() {
  const { data } = useAccount();
  const firstName = data?.firstName ?? "";

  const { mutateAsync: logoutAsync } = useMutation({
    mutationFn: () => {
      return axiosInstance.post("/auth/logout").then((resp) => resp.data);
    },
  });

  const queryClient = useQueryClient();

  return (
    <>
      <div className="account-row">
        <p className="HiName">Hi, {firstName}!</p>
        <Link to="/accountdetail" className="AccountDetailsLink">
          Account details
        </Link>
      </div>
      <input
        id="signout-button"
        type="button"
        value="Logout"
        onClick={async () => {
          await logoutAsync();
          queryClient.invalidateQueries();
        }}
      />
    </>
  );
}
