import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Users,
  User,
  Mail,
  Phone,
  Shield,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password_hash: "",
    role: "user",
    status: "active",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      console.log("Users:", data);
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError("Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search filter
  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (u) =>
          u.name.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term) ||
          u.phone.includes(term) ||
          u.role.toLowerCase().includes(term)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  // Open modal for add/edit
  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        // password is not sent back, so we leave it empty
        password_hash: "",
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        password_hash: "",
        role: "",
        status: "active"
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password_hash: "",
      role: "user",
      status: "active",
      password_hash: "",
    });
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save user (add or edit)
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.phone || (!editingUser && !formData.password_hash)) {
      alert("Please fill all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const url = editingUser
        ? `http://localhost:3001/api/users/${editingUser.id}`
        : "http://localhost:3001/api/users";
      const method = editingUser ? "PATCH" : "POST";

      // For editing, we don't send password if empty
      const dataToSend = {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  status: formData.status,
  role: formData.role
};
      if (editingUser && !dataToSend.password_hash) {
        delete dataToSend.password_hash;
      }
     
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save user");
      }

      await fetchUsers();
      closeModal();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete user
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/${deleteTarget.id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete user");

      await fetchUsers();
      setDeleteTarget(null);
      setShowDeleteConfirm(false);
    } catch (err) {
      alert("Failed to delete user.");
      console.error(err);
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const isActive = status === "active";
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
          isActive
            ? "bg-emerald-100 text-emerald-700"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {isActive ? (
          <CheckCircle className="w-3 h-3" />
        ) : (
          <XCircle className="w-3 h-3" />
        )}
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  };

  // Role badge component
  const RoleBadge = ({ roles }) => {
    const colorMap = {
       admin: "bg-purple-100 text-purple-700",
       partner: "bg-blue-100 text-blue-700",
       user: "bg-green-100 text-green-700",
    };
    const bgClass = colorMap[roles] || "bg-gray-100 text-gray-700";
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${bgClass}`}>
        <Shield className="w-3 h-3 mr-1" />
        {roles.charAt(0).toUpperCase() + roles.slice(1)}
      </span>
    );
  };

  // Table skeleton loader
  const TableSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded mb-4"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-14 bg-gray-100 rounded mb-2"></div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              Manage system accounts, roles and access permissions
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage workshops and service providers
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200/50 transition-all hover:-translate-y-0.5 font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            Add User
          </button>
        </div>

        {/* Error alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Search bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div className="text-sm text-gray-500 whitespace-nowrap">
              {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""} found
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-6">
              <TableSkeleton />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600">No users found</h3>
              <p className="text-sm text-gray-400 mt-1">
                {searchTerm ? "Try adjusting your search" : "Click 'Add User' to get started"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Roles
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-blue-50/30 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            {user.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <RoleBadge roles={user.roles} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openModal(user)}
                            className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteTarget(user);
                              setShowDeleteConfirm(true);
                            }}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl mx-4 animate-in fade-in zoom-in duration-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Confirm Delete</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-gray-700">{deleteTarget.name}</span>?
                    This action cannot be undone.
                  </p>
                </div>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-3 mt-6 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl mx-auto animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingUser ? "Edit User" : "Add New User"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter mobile number"
                  />
                </div>

                {!editingUser && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password_hash"
                      value={formData.password_hash}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter password"
                    />
                  </div>
                )}

                {editingUser && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password (leave blank to keep current)
                    </label>
                    <input
                      type="password"
                      name="password_hash"
                      value={formData.password_hash}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="New password (optional)"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Roles <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="role"
                    value={formData.roles}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="admin">Admin</option>
                    <option value="partner">MaintenancePartner</option>
                    <option value="user">Fleet Owner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {editingUser ? "Update User" : "Add User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}