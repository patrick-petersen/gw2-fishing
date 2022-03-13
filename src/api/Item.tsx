import React from 'react';
import {ItemJson, state} from "./GW2Api";

class Item extends React.Component<ItemJson, ItemJson> {

    constructor(props: ItemJson) {
        super(props);
    }

    render() {
        return <p><img src={this.props.icon}/>{this.props.name}</p>
    }

}

export default Item;
