import { useEffect, useState } from "react";
import "./Accounts.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getAccounts } from "../../services/api";
import { toast } from "react-toastify";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await getAccounts();

      // Handle different response formats
      if (Array.isArray(res)) {
        setAccounts(res);
      } else if (Array.isArray(res.accounts)) {
        setAccounts(res.accounts);
      } else if (res.data && Array.isArray(res.data)) {
        setAccounts(res.data);
      } else {
        setAccounts([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to load accounts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4" style={{ marginLeft: "250px" }}>
        <h2 className="fw-bold mb-4">My Accounts</h2>

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : accounts.length === 0 ? (
          <div className="alert alert-info">
            No accounts found.
          </div>
        ) : (
          <div className="row">
            {accounts.map((account) => (
              <div
                key={account._id}
                className="col-lg-4 col-md-6 mb-4"
              >
                <div className="card shadow border-0 h-100">

                  <div className="card-body">

                    <h5 className="card-title">
                      {account.accountType || "Savings Account"}
                    </h5>

                    <hr />

                    <p>
                      <strong>Account No :</strong>
                      <br />
                      {account.accountNumber}
                    </p>

                    <p>
                      <strong>Balance :</strong>
                    </p>

                    <h3 className="text-success">
                      ₹
                      {Number(account.balance).toLocaleString()}
                    </h3>

                    <span className="badge bg-success">
                      Active
                    </span>

                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Accounts;