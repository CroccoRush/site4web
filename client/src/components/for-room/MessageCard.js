import React from 'react';
import {observer} from "mobx-react-lite";
import {CardImg} from "react-bootstrap";

const MessageCard = observer(({message, myMessage}) => {
    return (
        <div
            style={{
                border: "3px solid #000", borderRadius: "5px", borderColor:"#0D6EFD",
                margin: "5px 20px",
                backgroundColor:"#ccc"
            }}
            className = {
                myMessage ?
                    "align-self-end"
                    :
                    "align-self-start"
            }
        >
            <div
                style={{
                    border: "3px solid #000", borderRadius: "5px 5px 0 0", borderColor:"#ccc",
                    padding: "5px",
                    height: '2.5rem',
                    backgroundColor:"#0D6EFD",
                }}
                className={"d-flex pe-3"}
            >
                <div className={"d-flex"}>
                <CardImg
                    style={{ height: '1.5rem'}}
                    src={"/messageIcon.svg"}
                />
                <h1 style={{fontSize:"16px", margin: "auto 0 auto 0", color:"#eee", fontWeight: "bold"}}>
                    {message.senderName}
                </h1>
                </div>
            </div>
            <div
                style={{
                    border: "3px solid #000", borderRadius: "0 0 5px 5px", borderColor:"#ccc",
                    padding: "5px",
                    fontSize: "24px",
                    backgroundColor:"#fefefe"
                }}
            >
                {message.text}
            </div>
        </div>
    );
});

export default MessageCard;