import { useAccount } from "../../hooks/useAccount";
import "./userinfo.css";

function UserInfo() {
  const { data } = useAccount();
  const firstName = data?.firstName ?? "-";
  const lastName = data?.lastName ?? "-";
  const email =
    (data as Record<string, string | string[] | undefined> | null)?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ] ?? "-";

  return (
    <section className="account-userinfo-section">
      <div className="account-section-header">
        <p className="account-section-title">Account Information</p>
        <p className="account-section-subtitle">
          Basic personal details linked to your account.
        </p>
      </div>

      <div className="userinfo-grid">
        <div className="userinfo-row">
          <span>First name</span>
          <strong>{firstName}</strong>
        </div>
        <div className="userinfo-row">
          <span>Last name</span>
          <strong>{lastName}</strong>
        </div>
        <div className="userinfo-row">
          <span>Email</span>
          <strong>{typeof email === "string" ? email : "-"}</strong>
        </div>
        <div className="userinfo-row">
          <span>Password</span>
          <strong>************</strong>
        </div>
      </div>
    </section>
  );
}

export default UserInfo;
