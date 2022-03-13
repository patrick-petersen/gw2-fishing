import React from 'react';

type ItemProps = {
    id: Number
}

function Item(props: ItemProps) {
    return (
        <span>{props.id}</span>
    );
}

export default Item;
