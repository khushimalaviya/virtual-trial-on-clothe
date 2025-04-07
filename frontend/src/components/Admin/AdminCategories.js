import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import "../../styles/Admin/AdminCategories.css";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState(null);

  const handleImageUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        isEdit ? setEditImage(reader.result) : setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addCategory = () => {
    if (!newCategory || !newImage) {
      alert("⚠ Please enter a category name and select an image.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      name: newCategory,
      image: newImage,
    };

    setCategories([...categories, newEntry]);
    setNewCategory("");
    setNewImage(null);
  };

  const deleteCategory = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  const startEditing = (category) => {
    setEditCategory(category.id);
    setEditName(category.name);
    setEditImage(category.image);
  };

  const updateCategory = (id) => {
    if (!editName || !editImage) {
      alert("⚠ Please enter a category name and select an image.");
      return;
    }

    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, name: editName, image: editImage } : category
      )
    );
    setEditCategory(null);
  };

  return (
    <div className="admin-categories">
      <h2>Manage Clothing Categories</h2>

      <div className="add-category">
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} />
        {newImage && <img src={newImage} alt="Preview" className="preview-image" />}
        <button className="add-button" onClick={addCategory}>
          <FaPlus /> ADD
        </button>
      </div>

      <div className="categories-container">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            {editCategory === category.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} />
                {editImage && <img src={editImage} alt="Preview" className="preview-image" />}
                <div className="edit-buttons">
                  <button onClick={() => updateCategory(category.id)} className="save-button">
                    <FaSave /> SAVE
                  </button>
                  <button onClick={() => setEditCategory(null)} className="cancel-button">
                    <FaTimes /> CANCEL
                  </button>
                </div>
              </>
            ) : (
              <>
                <img src={category.image} alt={category.name} className="category-image" />
                <p className="category-name">{category.name}</p>
                <div className="button-group">
                  <button onClick={() => startEditing(category)} className="edit-button">
                    <FaEdit /> EDIT
                  </button>
                  <button onClick={() => deleteCategory(category.id)} className="delete-button">
                    <FaTrash /> DELETE
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;