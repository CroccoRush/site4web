import React from 'react';

const ContentSpace = ({contentName}) => {
    //"/80a9c310-af39-4082-90bc-626765c8a359.jpg"
    return (
        <div className={"d-flex justify-content-around"} style={{height: "60vh", width: "100%"}}>
            <img
                alt="CONTENT"
                src={contentName}
                className="d-block h-100"
            />{''}
        </div>
    );
};

export default ContentSpace;