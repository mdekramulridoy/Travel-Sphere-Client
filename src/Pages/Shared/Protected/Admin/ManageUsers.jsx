import React, { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = "https://travel-sphere-server-nu.vercel.app";

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "guide", label: "Guide" },
    { value: "tourist", label: "Tourist" },
  ];

  // Fetch users from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${baseUrl}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search query and role
  useEffect(() => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (roleFilter && roleFilter.value) {
      filtered = filtered.filter((user) => user.role === roleFilter.value);
    }

    setFilteredUsers(filtered);
  }, [searchQuery, roleFilter, users]);

  // Handle Role Update with SweetAlert Confirmation
  const handleRoleChange = async (userId, newRole) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the role to "${newRole}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (!result.isConfirmed) {
      toast.info("Role change cancelled");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );

      Swal.fire("Updated!", "User role has been updated.", "success");
    } catch (error) {
      console.error("Error updating user role", error);
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  // Handle User Deletion with SweetAlert Confirmation
  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) {
      toast.info("User deletion cancelled");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      Swal.fire("Deleted!", "User has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting user", error);
      Swal.fire("Error", "Failed to delete user", "error");
    }
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Manage Users
      </h1>

      {loading ? (
        <p className="text-center text-blue-500">Loading users...</p>
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
            <input
              type="text"
              placeholder="Search by name or email"
              className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2 focus:outline-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="w-full md:w-1/3">
              <Select
                options={roleOptions}
                placeholder="Filter by role"
                value={roleFilter}
                onChange={(selectedOption) => setRoleFilter(selectedOption)}
                isClearable
              />
            </div>
          </div>

          {/* User Table */}
          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded shadow-md border">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 text-left">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-100">
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">
                        <Select
                          options={roleOptions}
                          value={roleOptions.find(
                            (option) => option.value === user.role
                          )}
                          onChange={(selectedOption) =>
                            handleRoleChange(user._id, selectedOption.value)
                          }
                          isSearchable={false}
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500">No users found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ManageUsers;
