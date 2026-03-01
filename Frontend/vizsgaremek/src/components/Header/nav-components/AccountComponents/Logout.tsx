import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../axios";

export function Logout() {
  const { mutateAsync: logoutAsync } = useMutation({
    mutationFn: () => {
      return axiosInstance.post("/auth/logout").then((resp) => resp.data);
    },
  });

  const queryClient = useQueryClient();

  return (
    <input
      type="button"
      value="Logout"
      onClick={async () => {
        await logoutAsync();
        queryClient.invalidateQueries();
      }}
    />
  );
}
