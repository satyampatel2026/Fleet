import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  RotateCcw,
  X,
  Users,
  User,
  Mail,
  Shield,
  CheckCircle,
  XCircle,
  Loader2,
  Filter,
} from "lucide-react";

const API_BASE = "http://localhost:3000/api/users";
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

export default function UserControl() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role_id: "",
    status: "ACTIVE",
  });

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_BASE, {
  headers: getHeaders(),
});
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch users");
      }

      setUsers(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error("Fetch users error:", err);
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    setRolesLoading(true);

    try {
     const response = await fetch(`${API_BASE}/roles`, {
  headers: getHeaders(),
});;
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch roles");
      }

      const roleList = Array.isArray(result.data) ? result.data : [];
      setRoles(roleList);

      if (roleList.length > 0) {
        setFormData((previous) => ({
          ...previous,
          role_id: previous.role_id || String(roleList[0].role_id),
        }));
      }
    } catch (err) {
      console.error("Fetch roles error:", err);
      setError(err.message || "Failed to load roles");
    } finally {
      setRolesLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return users.filter((userItem) => {
      const matchesSearch =
        !term ||
        userItem.full_name?.toLowerCase().includes(term) ||
        userItem.email?.toLowerCase().includes(term) ||
        userItem.role_name?.toLowerCase().includes(term);

      const matchesRole =
        roleFilter === "all" ||
        String(userItem.role_id) === String(roleFilter);

      const matchesStatus =
        statusFilter === "all" || userItem.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const summary = useMemo(() => ({
    total: users.length,
    active: users.filter((u) => u.status === "ACTIVE").length,
    admins: users.filter((u) => u.role_name === "ADMIN").length,
    partners: users.filter((u) => u.role_name === "PARTNER").length,
    fleetOwners: users.filter((u) => u.role_name === "FLEET_OWNER").length,
  }), [users]);

  const resetForm = () => {
    setFormData({
      full_name: "",
      email: "",
      password: "",
      role_id: roles.length > 0 ? String(roles[0].role_id) : "",
      status: "ACTIVE",
    });
  };

  const openAddModal = () => {
    setEditingUser(null);
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (userItem) => {
    setEditingUser(userItem);
    setFormData({
      full_name: userItem.full_name || "",
      email: userItem.email || "",
      password: "",
      role_id: String(userItem.role_id || ""),
      status: userItem.status || "ACTIVE",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    setEditingUser(null);
    resetForm();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (
      !formData.full_name.trim() ||
      !formData.email.trim() ||
      !formData.role_id ||
      (!editingUser && !formData.password.trim())
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const url = editingUser
        ? `${API_BASE}/${editingUser.user_id}`
        : API_BASE;
      const method = editingUser ? "PATCH" : "POST";

      const payload = {
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        role_id: Number(formData.role_id),
        status: formData.status,
      };

      if (formData.password.trim()) payload.password = formData.password;

      const response = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to save user");

      alert(result.message || "User saved successfully");
      await fetchUsers();
      setIsModalOpen(false);
      setEditingUser(null);
      resetForm();
    } catch (err) {
      console.error("Save user error:", err);
      alert(err.message || "Failed to save user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setActionLoadingId(deleteTarget.user_id);

    try {
      const response = await fetch(`${API_BASE}/${deleteTarget.user_id}`, {
  method: "DELETE",
  headers: getHeaders(),
});
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to deactivate user");

      alert(result.message || "User deactivated successfully");
      await fetchUsers();
      setDeleteTarget(null);
      setShowDeleteConfirm(false);
    } catch (err) {
      alert(err.message || "Failed to deactivate user");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRestore = async (userItem) => {
    setActionLoadingId(userItem.user_id);

    try {
      const response = await fetch(`${API_BASE}/${userItem.user_id}/restore`, {
  method: "PATCH",
  headers: getHeaders(),
});
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to restore user");

      alert(result.message || "User restored successfully");
      await fetchUsers();
    } catch (err) {
      alert(err.message || "Failed to restore user");
    } finally {
      setActionLoadingId(null);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setStatusFilter("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
              <Users className="h-8 w-8 text-blue-600" />
              User Control
            </h1>
            <p className="mt-1 text-sm text-gray-500">Manage admins, partners and fleet owners.</p>
          </div>

          <button
            onClick={openAddModal}
            disabled={rolesLoading || roles.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
          >
            <Plus className="h-4 w-4" /> Add User
          </button>
        </div>

        {error && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <span>{error}</span>
            <button onClick={() => setError("")}><X className="h-5 w-5" /></button>
          </div>
        )}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <SummaryCard label="Total Users" value={summary.total} />
          <SummaryCard label="Active Users" value={summary.active} />
          <SummaryCard label="Admins" value={summary.admins} />
          <SummaryCard label="Partners" value={summary.partners} />
          <SummaryCard label="Fleet Owners" value={summary.fleetOwners} />
        </div>

        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Filter className="h-4 w-4 text-blue-600" /> Search and Filters
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email or role..."
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
            >
              <option value="all">All Roles</option>
              {roles.map((role) => (
                <option key={role.role_id} value={role.role_id}>
                  {role.role_name.replaceAll("_", " ")}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
            >
              <option value="all">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-gray-500">{filteredUsers.length} users found</p>
            <button onClick={clearFilters} className="rounded-lg bg-gray-100 px-4 py-2 text-sm">Clear Filters</button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-16 text-center text-gray-500">No users found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <Th>Sr. No.</Th><Th>Name</Th><Th>Email</Th><Th>Role</Th><Th>Status</Th><Th>Created At</Th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredUsers.map((userItem, index) => (
                    <tr key={userItem.user_id} className="hover:bg-blue-50/30">
                      <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4"><div className="flex items-center gap-2"><User className="h-4 w-4 text-gray-400" />{userItem.full_name}</div></td>
                      <td className="px-6 py-4"><div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-gray-400" />{userItem.email}</div></td>
                      <td className="px-6 py-4"><RoleBadge roleName={userItem.role_name} /></td>
                      <td className="px-6 py-4"><StatusBadge status={userItem.status} /></td>
                      <td className="px-6 py-4 text-sm text-gray-500">{formatDate(userItem.created_at)}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openEditModal(userItem)} className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"><Edit className="h-4 w-4" /></button>
                          {userItem.status === "ACTIVE" ? (
                            <button onClick={() => { setDeleteTarget(userItem); setShowDeleteConfirm(true); }} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                          ) : (
                            <button onClick={() => handleRestore(userItem)} className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50">
                              {actionLoadingId === userItem.user_id ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex justify-between">
              <h2 className="text-xl font-bold">{editingUser ? "Edit User" : "Add New User"}</h2>
              <button onClick={closeModal}><X className="h-6 w-6" /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <Input label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} required />
              <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
              <Input label={editingUser ? "Password (optional)" : "Password"} type="password" name="password" value={formData.password} onChange={handleChange} required={!editingUser} />

              <div>
                <label className="mb-1 block text-sm font-medium">Role *</label>
                <select name="role_id" value={formData.role_id} onChange={handleChange} required className="w-full rounded-xl border px-4 py-2.5">
                  <option value="">Select role</option>
                  {roles.map((role) => <option key={role.role_id} value={role.role_id}>{role.role_name.replaceAll("_", " ")}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-xl border px-4 py-2.5">
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 rounded-xl bg-gray-100 px-4 py-2.5">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-white disabled:opacity-60">
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingUser ? "Update User" : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold">Deactivate User</h3>
            <p className="mt-2 text-sm text-gray-500">Deactivate <b>{deleteTarget.full_name}</b>? You can restore this user later.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="rounded-xl bg-gray-100 px-4 py-2">Cancel</button>
              <button onClick={handleDelete} className="rounded-xl bg-red-600 px-4 py-2 text-white">Deactivate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value }) {
  return <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>;
}

function Th({ children }) {
  return <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">{children}</th>;
}

function Input({ label, ...props }) {
  return <div><label className="mb-1 block text-sm font-medium">{label}{props.required && " *"}</label><input {...props} className="w-full rounded-xl border px-4 py-2.5" /></div>;
}

function RoleBadge({ roleName }) {
  const styles = {
    ADMIN: "bg-purple-100 text-purple-700",
    PARTNER: "bg-blue-100 text-blue-700",
    FLEET_OWNER: "bg-green-100 text-green-700",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${styles[roleName] || "bg-gray-100 text-gray-700"}`}><Shield className="h-3.5 w-3.5" />{roleName?.replaceAll("_", " ") || "NO ROLE"}</span>;
}

function StatusBadge({ status }) {
  const active = status === "ACTIVE";
  return <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${active ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>{active ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}{status}</span>;
}

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}