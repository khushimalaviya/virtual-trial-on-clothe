// import { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "../styles/ProductPage.css";


// const ProductPage = () => {
//   const product = {
//     title: "Casual Regular Sleeves Printed Women Dark Blue, White, Black Top",

//     images: [
//       "/images/product1.jpg",
//       "/images/product2.jpg",
//       "/images/product3.jpg",
//       "/images/product4.jpg",
//     ],
//     sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//     colors: ["/images/color1.jpg", "/images/color2.jpg", "/images/color3.jpg"],
//   };

//   const [selectedImage, setSelectedImage] = useState(product.images[0]);

//   return (
//     <div className="container py-5">
//       <br/><br/>
//       <div className="row">
//         {/* Left - Image Section */}
//         <div className="col-md-4">
//           <img src={selectedImage} alt="Product" className="img-fluid rounded shadow-sm" />
//           <div className="d-flex mt-3">
//             {product.images.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt="Thumbnail"
//                 className="img-thumbnail me-2"
//                 style={{ width: "60px", height: "60px", cursor: "pointer" }}
//                 onClick={() => setSelectedImage(img)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Right - Product Details */}
//         <div className="col-md-8">
//           <h2 className="fw-bold text-">{product.title}</h2>
//           {/* <div className="d-flex align-items-center mt-2">
//             <span className="text-success fw-bold fs-5">₹{product.price}</span>
//             <span className="text-muted text-decoration-line-through ms-2">₹{product.originalPrice}</span>
//             <span className="text-danger ms-2">{product.discount}% off</span>
//           </div> */}

//           {/* <p className="mt-2 text-secondary">{product.rating} ⭐ ({product.reviews} reviews)</p> */}

//           {/* Color Options */}
//           <h5 className="mt-4">Color</h5>
//           <div className="d-flex mt-2">
//             {product.colors.map((color, index) => (
//               <img key={index} src={color} alt="Color Option" className="img-thumbnail me-2" style={{ width: "50px", height: "50px", cursor: "pointer" }} />
//             ))}
//           </div>

//           {/* Size Options */}
//           <h5 className="mt-4">Size</h5>
//           <div className="d-flex mt-2">
//             {product.sizes.map((size, index) => (
//               <button key={index} className="btn btn-outline-secondary me-2">{size}</button>
//             ))}
//           </div>

//           {/* Offers */}
//           {/* <h5 className="mt-4">Available Offers</h5>
//           <ul className="mt-2 text-secondary">
//             <li>✅ 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</li>
//             <li>✅ 10% off on BOB EMI Transactions, up to ₹1,500</li>
//             <li>✅ Extra 8% off (cashback/coupon)</li>
//           </ul>

//           {/* Delivery Info */}
//           {/* <h5 className="mt-4">Delivery</h5>
//           <input type="text" placeholder="Enter Pincode" className="form-control w-50 mt-2" /> */} 

//           {/* Add to Cart / Buy Buttons */}
//           <div className="mt-4">
//             <button className="btn btn-warning me-3">Try Now</button>
//             {/* <button className="btn btn-primary">Buy Now</button> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/ProductPage.css";
import { useNavigate, useParams } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/clothes/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product details:", err));

    fetch("http://localhost:5000/api/colors")
      .then((res) => {
        console.log("Raw Response:", res);
        return res.json(); // Convert response to JSON
      })
      .then((data) => {
        console.log("Fetched Colors Data:", data); // Log the array
        setColors(data); // ✅ Assign `data` directly since it's already an array
        console.log("Colors State Updated:", data);
      })
      .catch((err) => {
        console.error("Error fetching colors:", err);
      });

    fetch("http://localhost:5000/api/sizes")
      .then((res) => res.json())
      .then((data) => {
        console.log("Sizes API Response:", data); // Debugging
        setSizes(data?.data || []); // Ensure it's an array
      })
      .catch((err) => {
        console.error("Error fetching sizes:", err);
        setSizes([]);
      });
  }, []);


  return (
    <div className="container py-5">
      <br /><br />
      {!product ? (
        <p>Loading product details...</p> // ✅ Show loading message
      ) : (
        <div className="row">
          {/* Left - Image Section */}
          <div className="col-md-4">
            <img
              src={product.image_url || "/images/default.jpg"}
              alt="Product"
              className="img-fluid rounded shadow-sm"
             
              width={200}
            />
          </div>

          {/* Right - Product Details */}
          <div className="col-md-8">
            <h2 className="fw-bold">{product.name}</h2>

            {/* Color Options */}
            <h5 className="mt-4">Color</h5>
            <div className="d-flex mt-2">
              {colors.length > 0 ? (
                colors.map((color) => (
                  <div
                    key={color._id}
                    style={{
                      backgroundColor: color.hex,
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      margin: "5px",
                      border: "2px solid #000"
                    }}
                    title={color.name}
                  ></div>
                ))
              ) : (
                <p>No colors available.</p>
              )}
            </div>

            {/* Size Options */}
            <h5 className="mt-4">Size</h5>
            <div className="d-flex mt-2">
              {sizes.length > 0 ? (
                sizes.map((size) => (
                  <button key={size._id} className="btn btn-outline-secondary me-2">
                    {size.size_id}
                  </button>
                ))
              ) : (
                <p>No sizes available.</p>
              )}
            </div>

            {/* Try Now Button */}
            {/* <div className="mt-4">
              <button className="btn btn-warning me-3">Try Now</button>
            </div> */}
            <div className="mt-4">
            <button
              className="btn btn-warning me-3"
              onClick={() => navigate(`/try-on?image=${encodeURIComponent(product.image_url)}`)}
            >
              Try Now
            </button>
</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductPage;
