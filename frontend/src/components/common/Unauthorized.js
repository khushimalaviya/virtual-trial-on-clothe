// src/components/common/Unauthorized.js
import React from "react";

const Unauthorized = () => {
    return (
        <div style={{ padding: "4rem", textAlign: "center" }}>
            <h1>🚫 Unauthorized Access</h1>
            <p>You do not have permission to view this page.</p>
        </div>
    );
};

export default Unauthorized;
