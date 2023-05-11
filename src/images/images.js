import React from "react";
import img1 from '../images/IMG_20220501_072194_962.jpg';
import img2 from '../images/chatty.jpg'

/**
 * @module images
 * @returns {object}
 */
function images() {
    return(
        <div>
            <img className="img-responsive" src={img1} alt="" />
            <img className="img-responsive" src={img2} alt="" />
        </div>
    )
};

export default images;