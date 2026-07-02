import { useState } from "react";
import { toast } from "react-toastify";
import { depositMoney } from "../../services/api";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Deposit.css";

function Deposit() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeposit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    try {
      setLoading(true);

      const response = await depositMoney({
        amount: Number(amount),
        description,
      });

      toast.success(
        response.message || "Amount deposited successfully!"
      );

      setAmount("");
      setDescription("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Deposit failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deposit-layout">

      <Sidebar />

      <div className="deposit-content">

        <div className="deposit-card">

          <h2>Deposit Money</h2>

          <p className="subtitle">
            Deposit money securely into your bank account.
          </p>

          <form onSubmit={handleDeposit}>

            <div className="mb-3">

              <label className="form-label">
                Deposit Amount (₹)
              </label>

              <input
                type="number"
                className="form-control"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

            </div>

            <div className="mb-4">

              <label className="form-label">
                Description
              </label>

              <textarea
                className="form-control"
                rows="4"
                placeholder="Optional description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />

            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Processing..." : "Deposit Now"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Deposit;