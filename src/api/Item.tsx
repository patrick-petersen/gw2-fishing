import React from 'react';
import {ItemJson, state} from "./GW2Api";
import {FishData} from "./FishData";

class Item extends React.Component<ItemJson, ItemJson> {

    constructor(props: ItemJson) {
        super(props);
    }

    render() {
        return <p><img src={this.props.icon}/>{this.props.name}<p>{FishData.getFishByName(this.props.name)?.toString()}</p></p>
    }

}

export default Item;
