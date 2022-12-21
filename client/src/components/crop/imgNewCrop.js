import React, {useState} from 'react';
import ReactCrop from 'react-image-crop'

const ImgNewCrop = ({ src }) => {
    const [crop, setCrop] = useState({
        unit: 'px', // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50
    })
    return (
        <ReactCrop crop={crop} onChange={c => setCrop(c)}>
            <img alt={""} src={src} />
        </ReactCrop>
    );
};

export default ImgNewCrop;