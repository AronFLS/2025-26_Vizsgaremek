import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axios";
import UserInfo from "../../components/account-detail/user-info/UserInfo";
import ActiveOrders, {
  type AccountOrder,
} from "../../components/account-detail/user-orders/UsersActiveOrders";
import PastOrders from "../../components/account-detail/user-orders/UsersPastOrders";
import "./AccountDetail.css";

function AccountDetail() {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery<AccountOrder[]>({
    queryKey: ["current-orders"],
    queryFn: () =>
      axiosInstance.get("/Orders/Current").then((resp) => resp.data),
  });

  const activeOrders = useMemo(
    () => (orders ?? []).filter((order) => order.active === true),
    [orders],
  );

  const pastOrders = useMemo(
    () => (orders ?? []).filter((order) => order.active === false),
    [orders],
  );

  const errorMessage = isError
    ? ((error as { message?: string })?.message ?? "Could not load orders.")
    : "";

  return (
    <main className="account-detail-page">
      <section className="account-detail-hero">
        <h1>Your Account</h1>
        <p>Manage your profile details and review all your orders.</p>
      </section>

      <UserInfo />

      <ActiveOrders
        orders={activeOrders}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />

      <PastOrders
        orders={pastOrders}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </main>
  );
}

export default AccountDetail;

