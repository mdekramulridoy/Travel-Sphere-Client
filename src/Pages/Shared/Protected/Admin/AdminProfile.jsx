import React, { useContext, useState } from "react";
import { imageUpload, saveUser } from "../../../../api/utils";
import { AuthContext } from "../../../../Provider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import AdminStats from "./AdminStats";

// Modal Component
const Modal = ({
  onClose,
  onSave,
  photo,
  name,
  setName,
  handlePhotoChange,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Your name"
        />
        <input type="file" onChange={handlePhotoChange} className="mb-4" />
        <div className="flex justify-end gap-4">
          <button
            onClick={onSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminProfile = () => {
  const { user, role, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [newPhoto, setNewPhoto] = useState(null);

  const handleEditClick = () => setIsEditing(true);

  const handleCloseModal = () => setIsEditing(false);

  const handleSaveChanges = async () => {
    try {
      if (newPhoto) {
        const imageUrl = await imageUpload(newPhoto);
        await updateUserProfile(name, imageUrl);
        await saveUser({ ...user, displayName: name, photoURL: imageUrl });
      } else {
        await updateUserProfile(name, photo);
        await saveUser({ ...user, displayName: name, photoURL: photo });
      }

      // Show success SweetAlert2
      Swal.fire({
        title: "Success!",
        text: "Profile updated successfully!",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        // Close the modal after success
        setIsEditing(false);
      });
    } catch (err) {
      // Show error SweetAlert2
      Swal.fire({
        title: "Error!",
        text: "Error updating profile. Please try again.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhoto(file);
      setPhoto(URL.createObjectURL(file)); // To show the preview
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-4">
        Welcome, {user?.displayName}
      </h1>
      <div className="flex flex-col items-center mb-6">
        <img
          src={photo}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        {!isEditing && (
          <div className="text-center">
            <p className="text-lg text-gray-600">Name: {name}</p>
            <p className="text-lg text-gray-600">Email: {user?.email}</p>
            <p className="text-lg text-gray-600">Role: {role}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleEditClick}
          className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
        >
          Edit
        </button>
      </div>
      <AdminStats></AdminStats>

      {isEditing && (
        <Modal
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
          photo={photo}
          name={name}
          setName={setName}
          handlePhotoChange={handlePhotoChange}
        />
      )}
    </div>
  );
};

export default AdminProfile;
