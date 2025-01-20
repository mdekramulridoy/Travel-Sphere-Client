import React, { useEffect, useState } from "react";
import Select from "react-select";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = "https://travel-sphere-server-nu.vercel.app";

  const roleOptions = [
    { value: "", label: "All" },
    { value: "admin", label: "Admin" },
    { value: "tourist", label: "Tourist" },
  ];

  // Fetch all users from the server
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

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-8">Manage Users</h1>
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
              <table className="table-auto w-full bg-white rounded shadow-md">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="text-center border-b hover:bg-gray-100"
                    >
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2 capitalize">{user.role}</td>
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
