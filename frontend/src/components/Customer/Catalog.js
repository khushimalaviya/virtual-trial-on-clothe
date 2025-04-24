import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "../../styles/Catalog.css";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Clothe");
        setProducts(response.data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/brands");
        setBrands(response.data);
      } catch (error) {
        console.error("❌ Error fetching brands:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchBrands();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((product) => {
    const productName = product.name?.toLowerCase() || "";
    const searchTerm = search.toLowerCase();

    const matchBrand =
      selectedBrand === "" || product.brand_id === selectedBrand || product.brand_id?._id === selectedBrand;

    const matchCategory =
      selectedCategory === "" ||
      product.category_id === selectedCategory ||
      product.category_id?._id === selectedCategory;

    const matchSearch = search === "" || productName.includes(searchTerm);

    return matchBrand && matchCategory && matchSearch;
  });

  const getBrandName = (brandId) => {
    const brand = brands.find((b) => b._id === (brandId?._id || brandId));
    return brand ? brand.brandName : "Unknown";
  };

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const getImageUrl = (imageUrl) => {
    if (imageUrl && !imageUrl.startsWith("http")) {
      return `http://localhost:5000${imageUrl}`;
    }
    return imageUrl;
  };

  return (
    <div className="catalog container py-5">
      <h2 className="text-center text-gradient mb-4">Explore Our Stylish Collection</h2>

      {/* 🔍 Search & Filter Panel */}
      <div className="d-flex flex-wrap gap-3 justify-content-start mb-4 search-panel">
        {/* 🔽 Brand Dropdown */}
        <select
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="form-select w-25 custom-select"
          value={selectedBrand}
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.brandName}
            </option>
          ))}
        </select>

        {/* 🔽 Category Dropdown */}
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="form-select w-25 custom-select"
          value={selectedCategory}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.cat_name}
            </option>
          ))}
        </select>

        {/* 🔍 Search Input */}
        {/* <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control w-50"
          placeholder="Search by product name"
        /> */}
      </div>

      {/* 🛍 Products */}
      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="col-md-4">
              <Card className="shadow-lg rounded border-0 product-card">
                <div className="product-img">
                  <Card.Img
                    variant="top"
                    src={getImageUrl(product.image_url)}
                    alt={product.name || "Clothe Item"}
                    className="img-fluid"
                    onError={(e) => (e.target.src = "http://localhost:5000/clothe-images/default-placeholder.jpg")}
                  />
                </div>
                <Card.Body>
                  <Card.Text className="text-muted">
                    Brand: {getBrandName(product.brand_id)}
                  </Card.Text>
                  <Card.Text className="text-muted">
                    Category: {product.category_id?.cat_name}
                  </Card.Text>
                  <Button
                    variant="success"
                    className="w-100 try-now-btn"
                    onClick={() => handleShowModal(product)}
                  >
                    View More
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>

      {/* 🖼 Product Detail Modal */}
      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="product-details">
              <img
                src={getImageUrl(selectedProduct.image_url)}
                alt={selectedProduct.name}
                className="img-fluid mb-3"
                onError={(e) => (e.target.src = "http://localhost:5000/clothe-images/default-placeholder.jpg")}
              />
              <p><strong>Brand:</strong> {getBrandName(selectedProduct.brand_id)}</p>
              <p><strong>Category:</strong> {selectedProduct.category_id?.cat_name}</p>
              <p><strong>Size:</strong> {selectedProduct.size_id?.size}</p>
              <p><strong>Chest:</strong> {selectedProduct.size_id?.chest}</p>
              <p><strong>Waist:</strong> {selectedProduct.size_id?.waist}</p>
              <p><strong>Fit:</strong> {selectedProduct.size_id?.fit}</p>
              <p><strong>Color:</strong> {selectedProduct.color_id?.name} (Hex: {selectedProduct.color_id?.hex})</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="success" onClick={() => console.log("Try-on functionality goes here!")}>
              Try Now
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Catalog;
