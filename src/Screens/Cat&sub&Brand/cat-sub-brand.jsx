import React, { useEffect, useState } from "react";
import api from "../../api/client";
import { Accordion, Button, Modal, Form } from "react-bootstrap";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import CategoryItem from "./components/categoryItem";
import { toast } from "react-toastify";

function CategoriesPanel() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "category" | "subcategory" | "brand"
  const [editItem, setEditItem] = useState(null);
  const [parentCategoryId, setParentCategoryId] = useState(null); // ✅ track parent for subcategories
  const [inputValue, setInputValue] = useState({ nameEn: "", nameAr: "" });

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    let response = await api.get("/Category/GetAll");
    setCategories(response.data);
  };

  const fetchBrands = async () => {
    let response = await api.get("/Brand/GetAll");
    setBrands(response.data);
  };

  const fetchSubcategories = async (categoryId) => {
    let response = await api.get(`/SubCategory/GetAllSubCategoryByCategory/${categoryId}`);
    return response.data;
  };

  // ✅ Handle save (Add / Edit)
  const handleSave = async () => {
  try {
    if (modalType === "category") {
      if (editItem) {
        await api.put(`/Category/update`, { id: editItem.id, ...inputValue });
      } else {
        await api.post(`/Category/add`, inputValue);
      }
      fetchCategories();
    } 
    
    else if (modalType === "subcategory") {
      if (editItem) {
        await api.put(`/SubCategory/update`, { id: editItem.id, categoryId: parentCategoryId, ...inputValue });
      } else {
        await api.post(`/SubCategory/add`, { categoryId: parentCategoryId, ...inputValue });        
        fetchSubcategories();
    }
    } 
    
    else if (modalType === "brand") {
      if (editItem) {
        await api.put(`/Brand/update`, { id: editItem.id, ...inputValue });
      } else {
        await api.post(`/Brand/add`, inputValue);
      }
      fetchBrands();
    }

    setShowModal(false);
  } catch (err) {
    if(err.response){
        toast.error(err.response.data);
    }
    // console.error(err);
    // alert("Failed to save");
  }
};


  // ✅ Handle delete
  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await api.delete(`/${type}/${id}`);
      if (type === "Category") fetchCategories();
      if (type === "Brand") fetchBrands();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  return (
    <div className="p-4">
      <h2>Categories & Brands Management</h2>
      <Accordion alwaysOpen>
        {/* Categories */}
        <Accordion.Item eventKey="categories">
          <Accordion.Header>
            Categories
            <Button
              variant="success"
              size="sm"
              className="ms-2"
              onClick={() => {
                setModalType("category");
                setEditItem(null);
                setInputValue({ nameEn: "", nameAr: "" });
                setShowModal(true);
              }}
            >
              <FaPlus /> Add Category
            </Button>
          </Accordion.Header>
          <Accordion.Body>
            {categories.map((cat) => (
              <CategoryItem
                key={cat.id}
                category={cat}
                fetchSubcategories={fetchSubcategories}
                onEdit={() => {
                  setModalType("category");
                  setEditItem(cat);
                  setInputValue({ nameEn: cat.nameEn, nameAr: cat.nameAr });
                  setShowModal(true);
                }}
                onDelete={() => handleDelete("Category", cat.id)}
                onAddSub={() => {
                  setModalType("subcategory");
                  setEditItem(null);
                  setParentCategoryId(cat.id);
                  setInputValue({ nameEn: "", nameAr: "" });
                  setShowModal(true);
                }}
                onEditSub={(sub) => {
                  setModalType("subcategory");
                  setEditItem(sub);
                  setParentCategoryId(cat.id);
                  setInputValue({ nameEn: sub.nameEn, nameAr: sub.nameAr });
                  setShowModal(true);
                }}
                onDeleteSub={(subId) => handleDelete("SubCategory", subId)}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>

        {/* Brands */}
        <Accordion.Item eventKey="brands">
          <Accordion.Header>
            Brands
            <Button
              variant="success"
              size="sm"
              className="ms-2"
              onClick={() => {
                setModalType("brand");
                setEditItem(null);
                setInputValue({ nameEn: "", nameAr: "" });
                setShowModal(true);
              }}
            >
              <FaPlus /> Add Brand
            </Button>
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              {brands.map((brand) => (
                <li key={brand.id}>
                  <span>
                    {brand.nameEn} <span className="text-muted">| {brand.nameAr}</span>
                  </span>
                  <FaEdit
                    className="text-primary ms-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setModalType("brand");
                      setEditItem(brand);
                      setInputValue({ nameEn: brand.nameEn, nameAr: brand.nameAr });
                      setShowModal(true);
                    }}
                  />
                  <FaTrash
                    className="text-danger ms-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete("Brand", brand.id)}
                  />
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* CRUD Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editItem ? "Edit" : "Add"} {modalType}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name (English)</Form.Label>
            <Form.Control
              type="text"
              value={inputValue.nameEn}
              onChange={(e) => setInputValue({ ...inputValue, nameEn: e.target.value })}
              placeholder={`Enter ${modalType} English name`}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name (Arabic)</Form.Label>
            <Form.Control
              type="text"
              value={inputValue.nameAr}
              onChange={(e) => setInputValue({ ...inputValue, nameAr: e.target.value })}
              placeholder={`Enter ${modalType} Arabic name`}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// ✅ Subcategory rendering with props

export default CategoriesPanel;
