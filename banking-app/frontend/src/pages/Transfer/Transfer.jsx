import { useState } from "react";
import { toast } from "react-toastify";
import { transferMoney } from "../../services/api";
import "./Transfer.css";

function Transfer() {
  const [formData, setFormData] = useState({
    beneficiaryName: "",
    receiverAccountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    bank: "",
    transferType: "IMPS",
    amount: "",
    description: "",
  });

  // Moved inside the Transfer function component

  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [pendingTransfer, setPendingTransfer] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);

  // Helper function to clear form after success
  // Reset Form
  const clearForm = () => {
    setFormData({
      beneficiaryName: "",
      receiverAccountNumber: "",
      confirmAccountNumber: "",
      ifscCode: "",
      bank: "",
      transferType: "IMPS",
      amount: "",
      description: "",
    });
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Form Submit
  const handle = (e) => {
    e.preventDefault();

    if (!formData.beneficiaryName) {
      return toast.error("Please enter beneficiary name.");
    }

    if (!formData.receiverAccountNumber) {
      return toast.error("Please enter receiver account number.");
    }

    if (formData.receiverAccountNumber !== formData.confirmAccountNumber) {
      return toast.error("Account numbers do not match.");
    }

    if (!formData.ifscCode) {
      return toast.error("Please enter IFSC code.");
    }

    if (!formData.bank) {
      return toast.error("Please select a bank.");
    }

    if (!formData.amount) {
      return toast.error("Please enter amount.");
    }

    if (Number(formData.amount) <= 0) {
      return toast.error("Amount must be greater than zero.");
    }

    if (formData.transferType === "RTGS" && Number(formData.amount) < 200000) {
      return toast.error("Minimum RTGS amount is ₹2,00,000.");
    }

    setPendingTransfer({
      receiverAccountNumber: formData.receiverAccountNumber,
      amount: Number(formData.amount),
      description: formData.description,
    });

    setShowOtpModal(true);
  };

  const verifyOtp = async () => {
    if (otp !== "123456") {
      return toast.error("Invalid OTP");
    }
    try {
      setLoading(true);
      const res = await transferMoney(pendingTransfer);
      toast.success(res.message || "Transfer Successful");

      const transaction = {
        transactionId: "TXN" + Date.now(),
        beneficiary: formData.beneficiaryName,
        account: formData.receiverAccountNumber,
        bank: formData.bank,
        amount: Number(formData.amount),
        transferType: formData.transferType,
        remarks: formData.description,
        date: new Date().toLocaleString(),
      };
      setReceipt(transaction);
      setShowReceipt(true);
      setShowOtpModal(false);
      setOtp("");
      clearForm();
    } catch (err) {
      toast.error(err.response?.data?.message || "Transfer Failed");
    } finally {
      setLoading(false);
    }
  };

  const beneficiaries = [
    {
      id: 1,
      name: "Rahul Sharma",
      account: "XXXXXXXX4567",
      bank: "State Bank of India",
    },
    { id: 2, name: "Priya Patel", account: "XXXXXXXX7894", bank: "HDFC Bank" },
    { id: 3, name: "Amit Kumar", account: "XXXXXXXX2345", bank: "ICICI Bank" },
  ];

  const selectBeneficiary = (person) => {
    setFormData((prev) => ({
      ...prev,
      beneficiaryName: person.name,
      receiverAccountNumber: person.account,
      confirmAccountNumber: person.account,
      bank: person.bank,
    }));
  };

  return (
    <div className="transfer-page">
      <div className="container">
        <div className="row">
          {/* LEFT SIDE */}
          <div className="col-lg-8">
            <form onSubmit={handle}>
              <div className="mb-3">
                <label className="form-label">Beneficiary Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="beneficiaryName"
                  value={formData.beneficiaryName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Receiver Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="receiverAccountNumber"
                  value={formData.receiverAccountNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="confirmAccountNumber"
                  value={formData.confirmAccountNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">IFSC Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Bank</label>

                <select
                  className="form-select"
                  name="bank"
                  value={formData.bank}
                  onChange={handleChange}
                >
                  <option value="">Select Bank</option>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Punjab National Bank</option>
                  <option>Canara Bank</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Transfer Type</label>

                <select
                  className="form-select"
                  name="transferType"
                  value={formData.transferType}
                  onChange={handleChange}
                >
                  <option>IMPS</option>
                  <option>NEFT</option>
                  <option>RTGS</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Amount</label>

                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Remarks</label>

                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Proceed
              </button>
            </form>
          </div>
          {/* RIGHT SIDE */}
          <div className="col-lg-4">
            <div className="summary-card">
              <h4>Transaction Summary</h4>

              <hr />

              <div className="summary-item">
                <span>Beneficiary</span>
                <strong>{formData.beneficiaryName || "--"}</strong>
              </div>

              <div className="summary-item">
                <span>Bank</span>
                <strong>{formData.bank || "--"}</strong>
              </div>

              <div className="summary-item">
                <span>Transfer Type</span>
                <strong>{formData.transferType}</strong>
              </div>

              <div className="summary-item">
                <span>Amount</span>
                <strong>
                  ₹
                  {formData.amount
                    ? Number(formData.amount).toLocaleString()
                    : 0}
                </strong>
              </div>
            </div>
            <div className="beneficiary-card">
              {beneficiaries.map((person) => (
                <div
                  key={person.id}
                  className="beneficiary-item"
                  onClick={() => selectBeneficiary(person)}
                >
                  <div>
                    <h6>{person.name}</h6>
                    <small>{person.bank}</small>
                  </div>
                  <button type="button" className="btn btn-sm btn-primary">
                    {" "}
                    Select{" "}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* OTP MODAL */}
      {showOtpModal && (
        <div className="otp-overlay">
          <div className="otp-card">
            <h3>OTP Verification</h3>
            <p>Enter the 6-digit OTP sent to your registered mobile number.</p>
            <input
              type="text"
              maxLength={6}
              className="form-control"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="otp-buttons">
              <button
                className="btn btn-secondary"
                onClick={() => setShowOtpModal(false)}
              >
                {" "}
                Cancel{" "}
              </button>
              <button
                className="btn btn-success"
                onClick={verifyOtp}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECEIPT MODAL */}
      {showReceipt && receipt && (
        <div className="receipt-overlay">
          <div className="receipt-card">
            <div className="success-icon">✅</div>
            <h2>Transfer Successful</h2>
            <hr />
            <div className="receipt-row">
              <span>Transaction ID</span>
              <strong>{receipt.transactionId}</strong>
            </div>
            <div className="receipt-row">
              <span>Beneficiary</span>
              <strong>{receipt.beneficiary}</strong>
            </div>
            <div className="receipt-row">
              <span>Bank</span>
              <strong>{receipt.bank}</strong>
            </div>
            <div className="receipt-row">
              <span>Amount</span>
              <strong>₹{receipt.amount.toLocaleString()}</strong>
            </div>
            <div className="receipt-row">
              <span>Date</span>
              <strong>{receipt.date}</strong>
            </div>
            <button
              className="btn btn-success w-100 mt-4"
              onClick={() => setShowReceipt(false)}
            >
              {" "}
              Done{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transfer;
