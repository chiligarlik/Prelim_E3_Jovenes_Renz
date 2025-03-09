import React, { useState, useEffect } from "react";

function Profile() {
  const [name, setName] = useState(localStorage.getItem("userName") || "Guest");
  const [newName, setNewName] = useState("");
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || null
  );

  useEffect(() => {
    localStorage.setItem("userName", name);
  }, [name]);

  useEffect(() => {
    if (profileImage) {
      localStorage.setItem("profileImage", profileImage);
    }
  }, [profileImage]);

  const handleChangeName = () => {
    if (newName.trim() !== "") {
      setName(newName);
      setNewName("");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Convert image to base64 and store it
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2>Profile Page</h2>
      <p>Welcome, {name}!</p>

      {/* Profile Picture */}
      <div style={{ marginBottom: "10px" }}>
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <p>No Profile Picture</p>
        )}
      </div>

      {/* Upload Button */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {/* Name Input */}
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Enter new name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handleChangeName}>Change Name</button>
      </div>
    </div>
  );
}

export default Profile;
