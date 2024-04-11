import React from 'react';
import error404 from "../assets/images/error_404.png";


const Error404: React.FC = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <img src={error404} style={{ maxWidth: "60%" }} />
            <p>Oops, the current page cannot be found... RBA</p>
        </div>
    );
};

export default Error404;
