import React, { useState } from "react";
import ImgNewCrop from "./imgNewCrop";

function ImgLoad() {
    const [file, setFile] = useState(null);
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className="App">
            <p className={"mb-0"}>Добавить фото:</p>
            <input type="file" onChange={handleChange} />
            {file ?
                <ImgNewCrop src={file}/>
                :
                <></>
            }
            <img alt={""} src={file} />
        </div>

    );
}

export default ImgLoad;