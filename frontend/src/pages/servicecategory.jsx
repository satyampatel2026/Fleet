import React, { useEffect, useMemo, useState } from 'react';

// ------------------- API Service (inline) -------------------
const API_BASE = 'http://localhost:3000/api/servicecategory';

const parseResponse = async (res) => {
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Something went wrong');
  }

  return result;
};

const categoryApi = {
  getAll: () => fetch(API_BASE).then(parseResponse),

  create: (data) =>
    fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(parseResponse),

  update: (id, data) =>
    fetch(`${API_BASE}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(parseResponse),

  delete: (id) =>
    fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    }).then(parseResponse),
};

// ------------------- Sub-components -------------------
const FilterBar = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow">
      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleChange}
        placeholder="Search by name..."
        className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      />

      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Status</option>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>

      <button
        type="button"
        onClick={() => onFilterChange({ search: '', status: 'all' })}
        className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        Clear Filters
      </button>
    </div>
  );
};

const CategoryForm = ({ initialData, onSubmit, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    category_name: '',
    description: '',
    status: 'ACTIVE',
  });

  useEffect(() => {
    setFormData({
      category_name: initialData?.category_name || '',
      description: initialData?.description || '',
      status: initialData?.status || 'ACTIVE',
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category Name *
        </label>
        <input
          type="text"
          name="category_name"
          value={formData.category_name}
          onChange={handleChange}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {isEditing ? 'Update' : 'Add'} Category
        </button>
      </div>
    </form>
  );
};

const CategoryRow = ({ category, serialNumber, onEdit, onDelete }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="px-4 py-3">{serialNumber}</td>
    <td className="px-4 py-3 font-medium">{category.category_name}</td>
    <td className="px-4 py-3">{category.description || '-'}</td>
    <td className="px-4 py-3">
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${
          category.status === 'ACTIVE'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {category.status}
      </span>
    </td>
    <td className="px-4 py-3">
      <button
        onClick={() => onEdit(category)}
        className="mr-2 text-sm text-yellow-600 hover:text-yellow-800"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(category.category_id)}
        className="text-sm text-red-600 hover:text-red-800"
      >
        Delete
      </button>
    </td>
  </tr>
);

// ------------------- Main Component -------------------
export default function ServiceCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', status: 'all' });
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [modalMode, setModalMode] = useState('add');

  const fetchCategories = async () => {
    setLoading(true);

    try {
      const data = await categoryApi.getAll();

      // Supports APIs returning either an array or { data: [...] }.
      const categoryList = Array.isArray(data) ? data : data.data || [];
      setCategories(categoryList);
    } catch (error) {
      console.error('Fetch error:', error);
      alert(error.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Client-side filtering guarantees that search and status work even when
  // the backend currently ignores query parameters.
  const filteredCategories = useMemo(() => {
    const searchText = filters.search.trim().toLowerCase();

    return categories.filter((category) => {
      const matchesSearch =
        !searchText ||
        category.category_name?.toLowerCase().includes(searchText) ||
        category.description?.toLowerCase().includes(searchText);

      const matchesStatus =
        filters.status === 'all' || category.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [categories, filters]);

  const handleAdd = async (data) => {
    try {
      const result = await categoryApi.create(data);
      alert(result.message || 'Category added successfully');
      setShowModal(false);
      await fetchCategories();
    } catch (error) {
      alert(error.message || 'Add failed');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleUpdate = async (data) => {
    try {
      const result = await categoryApi.update(
        editingCategory.category_id,
        data
      );
      alert(result.message || 'Category updated successfully');
      setShowModal(false);
      setEditingCategory(null);
      await fetchCategories();
    } catch (error) {
      alert(error.message || 'Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;

    try {
      const result = await categoryApi.delete(id);
      alert(result.message || 'Category deleted successfully');
      await fetchCategories();
    } catch (error) {
      alert(error.message || 'Delete failed');
    }
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setModalMode('add');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  const activeCount = categories.filter(
    (category) => category.status === 'ACTIVE'
  ).length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Service Categories
        </h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          + Add New
        </button>
      </div>

      {/* Inactive card removed */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-semibold">{categories.length}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-semibold text-green-600">
            {activeCount}
          </p>
        </div>
      </div>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Sr. No
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : filteredCategories.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                  No categories found
                </td>
              </tr>
            ) : (
              filteredCategories.map((category, index) => (
                <CategoryRow
                  key={category.category_id}
                  category={category}
                  serialNumber={index + 1}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {modalMode === 'add'
                ? 'Add New Category'
                : 'Edit Category'}
            </h2>
            <CategoryForm
              initialData={editingCategory}
              onSubmit={modalMode === 'add' ? handleAdd : handleUpdate}
              onCancel={closeModal}
              isEditing={modalMode === 'edit'}
            />
          </div>
        </div>
      )}
    </div>
  ); }