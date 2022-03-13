import React from 'react';
import {ItemJson, state} from "./GW2Api";
import {FishData} from "./FishData";

class Item extends React.Component<ItemJson, ItemJson> {

    constructor(props: ItemJson) {
        super(props);
    }

    render() {
        //FishData.getFishByName(this.props.name)
        return <p><img src={this.props.icon}/>{this.props.name}</p>
    }

}

export default Item;
