import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

export default function PartnersManagement() {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [formData, setFormData] = useState({
    company_name: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    status: "active",
    });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fetch partners
  const fetchPartners = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3002/api/partners");
      console.log("Response status:", response.status);
      if (!response.ok) throw new Error("Failed to fetch vendors");
      const data = await response.json();
      console.log("API DATA:", data);
      setPartners(data);
      setFilteredPartners(data);
    } catch (err) {
      setError("Failed to load vendors");
      console.error(err);
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // Search filter
  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      setFilteredPartners(partners);
    } else {
      const filtered = partners.filter(
        (p) =>
          p.company_name.toLowerCase().includes(term) ||
          p.name.toLowerCase().includes(term) ||
          p.email.toLowerCase().includes(term) ||
          p.phone.includes(term)
      );
      setFilteredPartners(filtered);
    }
  }, [searchTerm, partners]);

  // Open modal for add/edit
  const openModal = (partner = null) => {
    if (partner) {
      setEditingPartner(partner);
     setFormData({
  user_id: partner.user_id,
  company_name: partner.company_name,
  name: partner.name,
  phone: partner.phone,
  email: partner.email,
  address: partner.address || "",
  status: partner.status,
});
    } else {
      setEditingPartner(null);
      setFormData({
        company_name: "",
        name: "",
        phone: "",
        password: "",
        email: "",
        address: "",
        status: "active",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPartner(null);
    setFormData({
      company_name: "",
      name: "",
      phone: "",
      password: "",
      email: "",
      address: "",
      status: "active",
    });
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save partner (add or edit)
const handleSave = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  if (
    !formData.company_name ||
    !formData.name ||
    !formData.email ||
    !formData.phone ||
    (!editingPartner && !formData.password)
  ) {
    alert("Please fill all required fields.");
    setIsSubmitting(false);
    return;
  }

  try {
   const url = editingPartner
  ? `http://localhost:3002/api/partners/${editingPartner.user_id}`
  : "http://localhost:3002/api/partners";

const method = editingPartner ? "PATCH" : "POST";

const dataToSend = editingPartner
  ? {
      user_id: formData.user_id,
      company_name: formData.company_name,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      status: formData.status,
    }
  : formData;

const response = await fetch(url, {
  method,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(dataToSend),
});

    const result = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", result);

    if (!response.ok) {
      throw new Error(result.message || "Failed to save partner");
    }

    await fetchPartners();
    closeModal();
  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setIsSubmitting(false);
  }
};

  // Delete partner
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const response = await fetch(
        `http://localhost:3002/api/partners/${deleteTarget.id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete partner");

      await fetchPartners();
      setDeleteTarget(null);
      setShowDeleteConfirm(false);
    } catch (err) {
      alert("Failed to delete partner.");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent flex items-center gap-3">
              <Building2 className="w-8 h-8 text-purple-600" />
              Maintenance Partners
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage all your maintenance partners in one place. Add, edit, or remove partners as needed.
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-200/50 transition-all hover:-translate-y-0.5 font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Partner
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
                placeholder="Search by company, owner, email, or mobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
            <div className="text-sm text-gray-500 whitespace-nowrap">
              {filteredPartners.length} partner{filteredPartners.length !== 1 ? "s" : ""} found
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-6">
              <TableSkeleton />
            </div>
          ) : filteredPartners.length === 0 ? (
            <div className="text-center py-16">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600">No partners found</h3>
              <p className="text-sm text-gray-400 mt-1">
                {searchTerm ? "Try adjusting your search" : "Click 'Add Partner' to get started"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Workshop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Address
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
                  {filteredPartners.map((partner) => (
                    <tr
                      key={partner.id}
                      className="hover:bg-purple-50/30 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{partner.company_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{partner.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            {partner.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            {partner.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {partner.address || "—"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={partner.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openModal(partner)}
                            className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteTarget(partner);
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
                    <span className="font-semibold text-gray-700">{deleteTarget.company_name}</span>?
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
                  {editingPartner ? "Edit Partner" : "Add New Partner"}
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
                    Workshop <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter owner name"
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
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter mobile number"
                  />
                </div>

                {!editingPartner && (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Password <span className="text-red-500">*</span>
    </label>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
      placeholder="Enter password"
    />
  </div>
)}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter address (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:shadow-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {editingPartner ? "Update Partner" : "Add Partner"}
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