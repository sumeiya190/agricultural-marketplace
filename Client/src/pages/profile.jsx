import { useState } from "react";
import "./profile.css";

function Profile({ user, onBack }) {
    const [formData, setFormData] = useState({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        phone_number: user?.phone_number || "",
    });

    const handleChange = (event) => {
        setFormData({
            ...formData, [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch(
                `http://127.0.0.1:5000/profile/${user?.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user?.access_token}`
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.message || "Failed to update profile");
            }
        } catch {
            alert("Unable to connect to the server");
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
            <h1>My Profile</h1>

            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />

                <label>Last Name</label>
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Phone Number</label>
                <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Save Changes</button>
                <button type="button" onClick={onBack}>
                    Back
                </button>
            </form>
            </div>
        </div>
    );
}

export default Profile;