import React from 'react';
import {ItemJson, state} from "../api/GW2Api";
import {FishData} from "../api/FishData";

type ItemProps = ItemJson & {progress: boolean};

class Item extends React.Component<ItemProps, ItemJson> {

    constructor(props: ItemProps) {
        super(props);
    }

    render() {
        const metadata = FishData.getFishByName(this.props.name);
        return <div className={"fish" + (this.props.progress?" done":" todo")}>
            <img src={this.props.icon}/>
            <span>{this.props.name}</span>
            <span>{metadata?.Bait}</span>
            <span>{metadata?.["Open Water"]?"Open Water":""}</span>
        </div>
    }

}

export default Item;