import React from 'react';
import error403 from "../assets/images/error_403.png";


const Error403: React.FC = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <img src={error403} style={{ maxWidth: "60%" }} />
            <p>Oops, you don't have permission, please contact the administrator... RBA</p>
        </div>
    );
};

export default Error403;
