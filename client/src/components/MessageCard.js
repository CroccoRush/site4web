import React from 'react';
import {observer} from "mobx-react-lite";

const MessageCard = observer(({message, myMessage}) => {
    return (
        <div
            style={{border: "3px solid #000", borderRadius: "5px", margin: "5px 20px 5px 20px"}}
            className = {
                myMessage ?
                    "align-self-end"
                    :
                    "align-self-start"
            }
        >
            <div style={{border: "3px solid #000", borderRadius: "5px 5px 0 0", padding: "5px"}}>
                {message.senderName}
            </div>
            <div style={{border: "3px solid #000", borderRadius: "0 0 5px 5px", padding: "5px", fontSize: "24px"}}>
                {message.text}
            </div>
        </div>
    );
});

export default MessageCard;