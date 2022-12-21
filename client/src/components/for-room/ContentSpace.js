import React from 'react';

const ContentSpace = ({contentName}) => {
    return (
        <div className={"d-flex justify-content-around mt-1"} style={{height: "60vh", width: "100%"}}>
            <img
                alt="CONTENT"
                src={contentName}
                className="d-block h-100"
                style={{maxWidth: "600px", maxHeight: "600px"}}
            />{''}
        </div>
    );
};

export default ContentSpace;