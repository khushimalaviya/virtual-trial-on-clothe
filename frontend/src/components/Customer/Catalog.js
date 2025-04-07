import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import "../../styles/Catalog.css";

const Catalog = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(""); // For filtering by brand
  const [search, setSearch] = useState("");

  // ✅ Fetch products & brands from API
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
        const response = await axios.get("http://localhost:5000/api/brands"); // ✅ Updated API endpoint
        setBrands(response.data);
      } catch (error) {
        console.error("❌ Error fetching brands:", error);
      }
    };

    fetchProducts();
    fetchBrands();
  }, []);

  // ✅ Filter products based on selected brand & search input
  const filteredProducts = products.filter((product) => {
    return (
      (selectedBrand ? product.brand_id === selectedBrand : true) &&
      (search ? product.name?.toLowerCase().includes(search.toLowerCase()) : true)
    );
  });

  // ✅ Get brand name using brand_id
  const getBrandName = (brandId) => {
    const brand = brands.find((b) => b.brand_id === brandId);
    return brand ? brand.brandName : "Unknown";
  };

  return (
    <div className="catalog container py-5">
      <br/><br/>
      <h2 className="text-center text-gradient mb-4">Explore Our Stylish Collection</h2>

      {/* 🔍 Search & Filter Panel */}
      <div className="d-flex justify-content-between mb-4 search-panel">
        {/* 🔽 Brand Selection Dropdown */}
        <select
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="form-select w-25 custom-select"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand.brand_id} value={brand.brand_id}>
              {brand.brandName}
            </option>
          ))}
        </select>

        {/* 🔍 Search Bar */}
        {/* <input
          type="text"
          className="form-control w-50"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /> */}
      </div>

      {/* 🛍 Display Products */}
      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="col-md-4">
              <Card className="shadow-lg rounded border-0 product-card">
                {/* 🖼 Product Image */}
                <div className="product-img">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/api/images?path=${encodeURIComponent(product.image_url)}`}
                    alt={product.name || "Clothe Item"}
                    className="img-fluid"
                    onError={(e) => (e.target.src = "http://localhost:5000/clothe-images/default-placeholder.jpg")}
                  />
                </div>

                <Card.Body>
                  {/* 🔹 Brand Name */}
                  <Card.Text className="text-muted">
                    Brand: {getBrandName(product.brand_id)}
                  </Card.Text>

                  {/* 🔹 Category */}
                  <Card.Text className="text-muted">
                    Category: {product.category}
                  </Card.Text>

                  {/* 👗 Try-On Button */}
                  {/* <Button
                    variant="success"
                    className="w-100 try-now-btn"
                    onClick={() => navigate(`/try-on?image=${encodeURIComponent(product.image_url)}`)}
                  >
                    Try Now
                  </Button> */}
                  <Button
                    variant="success"
                    className="w-100 try-now-btn"
                    onClick={() => navigate(`/productpage/${product._id}`)}
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
    </div>
  );
};

export default Catalog;
