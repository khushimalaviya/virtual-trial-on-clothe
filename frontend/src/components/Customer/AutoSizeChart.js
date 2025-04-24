import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import '../../styles/AutoSizeChart.css';


const AutoSizeChart = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [chartImage, setChartImage] = useState('');

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const [loadingImage, setLoadingImage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/brands')
      .then(res => setBrands(res.data))
      .catch(err => console.error('Error fetching brands:', err));
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.userId) {
        setUserId(parsedUser.userId);
        setLoading(false);
      } else {
        setError("User ID missing in stored data.");
        setLoading(false);
      }
    } else {
      setError("User not found. Please login again.");
      setLoading(false);
    }
  }, []);


  const handleBrandChange = (e) => {
    const brandCustomId = e.target.value;
    const selectedBrandObj = brands.find(b => b.brand_id === brandCustomId);

    if (selectedBrandObj) {
      const brandObjectId = selectedBrandObj._id;
      setSelectedBrand(brandCustomId);
      setSelectedCategory('');
      setSelectedSize('');
      setSelectedColor('');
      setSizes([]);
      setColors([]);

      axios.get(`http://localhost:5000/api/brandcategories/by-brand/${brandObjectId}`)
        .then(res => setCategories(res.data))
        .catch(err => console.error('Error fetching categories:', err));
    } else {
      setSelectedBrand('');
      setCategories([]);
    }
  };

  const handleCategoryChange = (e) => {
    const categoryObjectId = e.target.value;
    setSelectedCategory(categoryObjectId);
    setSelectedSize('');
    setSelectedColor('');
    setColors([]);
  
    const selectedBrandObj = brands.find(b => b.brand_id === selectedBrand);
    const brandObjectId = selectedBrandObj ? selectedBrandObj._id : '';
  
    if (categoryObjectId && brandObjectId) {
      axios.get(`http://localhost:5000/api/size-mappings/by-brand-category/${brandObjectId}/${categoryObjectId}`)
        .then(res => {
          const fetchedSizes = Array.isArray(res.data) ? res.data : res.data.sizes || [];
          setSizes(fetchedSizes);
        })
        .catch(err => console.error('Error fetching sizes by brand and category:', err));
    } else {
      setSizes([]);
    }
  };
  

  const handleSizeChange = (e) => {
    const sizeId = e.target.value;
    setSelectedSize(sizeId);
    setSelectedColor('');
  
    const selectedBrandObj = brands.find(b => b.brand_id === selectedBrand);
    const brandObjectId = selectedBrandObj ? selectedBrandObj._id : '';
  
    if (brandObjectId && sizeId && selectedCategory) {
      axios.get(`http://localhost:5000/api/color-mappings/by-brand-category-size/${brandObjectId}/${selectedCategory}/${sizeId}`)
        .then(res => setColors(res.data))
        .catch(err => console.error('Error fetching colors:', err));
    } else {
      setColors([]);
    }
  };
  
  

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const getBrandName = () => brands.find(b => String(b.brand_id) === String(selectedBrand))?.brandName || '';
  const getCategoryName = () => categories.find(c => String(c._id) === String(selectedCategory))?.cat_name || '';
  const getSizeLabel = () => sizes.find(s => String(s._id) === String(selectedSize))?.size_id || '';
  const getColorName = () => colors.find(c => String(c.colorId) === String(selectedColor))?.color_name || '';

  useEffect(() => {
    if (selectedBrand && selectedCategory && selectedSize && selectedColor) {
      const selectedBrandObj = brands.find(b => b.brand_id === selectedBrand);
      const brandObjectId = selectedBrandObj ? selectedBrandObj._id : '';

      if (brandObjectId) {
        setLoadingImage(true);
        axios.get(`http://localhost:5000/api/image-mappings/by-selection`, {
          params: {
            brand_id: brandObjectId,
            category_id: selectedCategory,
            size_id: selectedSize,
            color_id: selectedColor
          }
        })
          .then(res => {
            if (res.data && res.data.image_url) {
              setChartImage(res.data.image_url);
            } else {
              setChartImage('');
            }
            setLoadingImage(false);
          })
          .catch(err => {
            console.error('Error fetching chart image:', err);
            setChartImage('');
            setLoadingImage(false);
          });
      }
    } else {
      setChartImage('');
    }
  }, [selectedBrand, selectedCategory, selectedSize, selectedColor, brands]);

  return (

    <div className="container mt-4">
      <br /><br />
      <h2 className="text-center mb-4">Auto Size Chart</h2>

      <div className="row">
        {/* Selection Form */}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label label-brown">Brand</label>
            <select className="form-select" value={selectedBrand} onChange={handleBrandChange}>
              <option value="">-- Select Brand --</option>
              {brands.map((brand, idx) => (
                <option key={idx} value={brand.brand_id}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label label-brown">Category</label>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
              disabled={!selectedBrand}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat._id}>
                  {cat.cat_name}
                </option>
              ))}
            </select>
          </div>

          {selectedCategory && (
            <div className="mb-3">
              <label className="form-label label-brown">Size</label>
              <select className="form-select" value={selectedSize} onChange={handleSizeChange}>
                <option value="">-- Select Size --</option>
                {sizes.map((size, idx) => (
                  <option key={idx} value={size._id}>
                    {size.size_id}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedSize && (
            <div className="mb-3">
              <label className="form-label label-brown">Color</label>
              <select className="form-select" value={selectedColor} onChange={handleColorChange}>
                <option value="">-- Select Color --</option>
                {colors.map((color, idx) => (
                  <option key={idx} value={color.colorId}>
                    {color.color_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedBrand && selectedCategory && selectedSize && selectedColor && (
            <div className="alert alert-info mt-4 custom-alert-text">
              <strong>Product selected:</strong><br />
              Brand: {getBrandName()}<br />
              Category: {getCategoryName()}<br />
              Size: {getSizeLabel()}<br />
              Color: {getColorName()}
            </div>
          )}
        </div>

        {/* Image/Loader Section */}
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          {loadingImage && (
            <div className="text-center mt-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {chartImage && !loadingImage && (
            <div className="text-center mt-4">
              <h5>Image Preview</h5>
              <img
                src={chartImage}
                alt="Chart"
                className="img-thumbnail"
                style={{ maxWidth: '250px', cursor: 'pointer' }}
                onClick={() => setShowModal(true)}
              />
              {/* <p className="text-muted">Click image to enlarge</p> */}

              <div className="mt-3">
                {userId && (
                  <button
                    className="btn btn-warning me-3"
                    onClick={() =>
                      navigate(
                        `/try-on?image=${encodeURIComponent(chartImage)}&userId=${userId}&categoryId=${selectedCategory}&sizeId=${selectedSize}`
                      )
                    }
                  >
                    Try Now
                  </button>
                )}

              </div>
            </div>
          )}
          
          {!loadingImage && !chartImage && selectedColor && (
            <div className="alert alert-warning mt-4 text-center">
              No size chart available for the selected combination.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          onClick={() => setShowModal(false)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Full Size Chart</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body text-center">
                <img src={chartImage} alt="Chart Full" className="img-fluid" width={300}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoSizeChart;
