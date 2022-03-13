import React from 'react';

type ItemProps = {
    name: string
}

function Item(props: ItemProps) {
    return (
        <span>{props.name}</span>
    );
}

export default Item;
