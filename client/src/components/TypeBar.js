import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Badge, Button, ListGroup} from "react-bootstrap";
import {getContentTypesCount, getContentTypes} from "../http/RoomAPI";
import {Context} from "../index";

const TypeBar = observer(() => {
    const {room} = useContext(Context)
    const [types, setTypes] = useState([])
    useEffect(() => {
        getContentTypes().then(data => {
            for (let i in data) {
                getContentTypesCount(data[i].id).then(count => {
                    data[i]['count'] = count
                    if (++i === data.length) { setTypes(data) }
                })
            }
        })
    }, [])


    return (
        <div>
            <Button
                style={{cursor: 'pointer', color: "#212529", borderColor: "lightgray"}}
                onClick={() => room.setSelectedTypeId(null)}
                as="li"
                className="d-flex justify-content-between align-items-center bg-white mb-1"

            >
                <div className="ms-2 me-auto fw-bold" >
                    Без фильтра
                </div>
                <Badge
                    className={null === room.selectedTypeId ?
                        "mt-auto bg-warning text-black m-1 mb-0"
                        :
                        "mt-auto bg-primary text-white m-1 mb-0"}
                    pill
                >
                    ⦿
                </Badge>
            </Button>

            <ListGroup as="ol" numbered>
                {types.map(type =>
                    <ListGroup.Item
                        style={{cursor: 'pointer'}}
                        key={type.id}
                        onClick={() => room.setSelectedTypeId(type.id)}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto fw-bold" >
                            {type.name}
                        </div>
                        <Badge
                            className={type.id === room.selectedTypeId ?
                                `mt-auto bg-warning text-black`
                                :
                                "mt-auto bg-primary text-white"}
                            pill
                        >
                            {type.count}
                        </Badge>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
});

export default TypeBar;