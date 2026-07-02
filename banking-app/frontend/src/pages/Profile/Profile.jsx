import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { AuthContext } from "../../context/AuthContext";
import { getProfile, updateProfile } from "../../services/api";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar/Sidebar";

function Profile() {
  const { user, setUser } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();

      setProfile({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
      });

      setLoading(false);
    } catch (error) {
      toast.error("Unable to load profile");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const updated = await updateProfile(profile);

      setUser(updated.user);

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="profile-layout">
      <Sidebar />

      <div className="profile-content">
        <div className="container-fluid">
          <div className="profile-card shadow">
            <div className="row align-items-center">
              {/* LEFT PROFILE */}

              <div className="col-lg-4">
                <div className="profile-sidebar">
                  <div className="profile-avatar">
                    {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
                  </div>

                  <h3>{profile.name}</h3>

                  <p>{profile.email}</p>

                  <span className="badge bg-success">✔ KYC Verified</span>

                  <div className="profile-info">
                    <div>
                      <strong>Customer ID</strong>

                      <p>SB20260001</p>
                    </div>

                    <div>
                      <strong>Account Type</strong>

                      <p>Savings Account</p>
                    </div>

                    <div>
                      <strong>Member Since</strong>

                      <p>January 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT */}

              <div className="col-lg-8">
                <div className="profile-details">
                  <h4 className="mb-4">Personal Information</h4>
                  <hr />

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>Name</label>

                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={profile.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label>Email</label>

                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={profile.email}
                          disabled
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label>Phone</label>

                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          value={profile.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label>Address</label>

                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={profile.address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <button className="btn btn-primary px-4" disabled={saving}>
                      {saving ? "Updating..." : "Update Profile"}
                    </button>

                    {/* ================= ACCOUNT INFORMATION ================= */}

                    <hr className="my-5" />

                    <h4 className="mb-4">Account Information</h4>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="info-box">
                          <h6>Account Number</h6>
                          <p>XXXX XXXX 4587</p>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="info-box">
                          <h6>Current Balance</h6>
                          <p>₹1,25,000</p>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="info-box">
                          <h6>Branch</h6>
                          <p>Main Branch</p>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="info-box">
                          <h6>Status</h6>
                          <p className="text-success">Active</p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
