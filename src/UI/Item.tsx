import React from 'react';
import {ItemJson, state} from "../api/GW2Api";
import {FishData} from "../api/FishData";

class Item extends React.Component<ItemJson, ItemJson> {

    constructor(props: ItemJson) {
        super(props);
    }

    render() {
        const metadata = FishData.getFishByName(this.props.name);
        return <div className={"fish"}>
            <img src={this.props.icon}/>
            <span>{this.props.name}</span>
            <span>{metadata?.Bait}</span>
            <span>{metadata?.["Open Water"]?"Open Water":""}</span>
        </div>
    }

}

export default Item;