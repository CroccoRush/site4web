import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Pagination} from "react-bootstrap";

const Pages = observer(({roomsCount, limit}) => {
    const {room} = useContext(Context)
    const pageCount = Math.ceil(roomsCount / limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-auto">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={room.selectedPage === page}
                    onClick={() => room.setSelectedPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;