import { useEffect, useState } from "react";
import "./Transactions.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getTransactions } from "../../services/api";
import { toast } from "react-toastify";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    const result = transactions.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredTransactions(result);
  }, [search, transactions]);

  const loadTransactions = async () => {
    try {
      const data = await getTransactions();

      if (Array.isArray(data)) {
        setTransactions(data);
        setFilteredTransactions(data);
      } else if (Array.isArray(data.transactions)) {
        setTransactions(data.transactions);
        setFilteredTransactions(data.transactions);
      } else {
        setTransactions([]);
        setFilteredTransactions([]);
      }
    } catch (err) {
      toast.error("Unable to load transactions");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-page">
      <Sidebar />

      <div className="transaction-content">
        <div className="transaction-header">
          <h2>Transaction History</h2>

          <input
            type="text"
            placeholder="Search Transaction..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loader">Loading Transactions...</div>
        ) : filteredTransactions.length === 0 ? (
          <div className="empty">No Transactions Found</div>
        ) : (
          <div className="table-responsive">
            <table className="table transaction-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map((item, index) => (
                  <tr key={item._id || index}>
                    <td>{index + 1}</td>

                    <td>{item.type}</td>

                    <td className="amount">₹ {item.amount}</td>

                    <td>
                      <span
                        className={`badge ${
                          item.status === "SUCCESS"
                            ? "bg-success"
                            : item.status === "FAILED"
                              ? "bg-danger"
                              : "bg-warning"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transactions;
