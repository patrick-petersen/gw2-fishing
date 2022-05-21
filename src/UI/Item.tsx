import React from 'react';
import {ItemJson} from "../api/GW2Api";
import {FishData} from "../api/FishData";

type ItemProps = ItemJson & {progress: boolean};

class Item extends React.Component<ItemProps, ItemJson> {
    render() {
        const metadata = FishData.getFishByName(this.props.name);
        return <div className={"fish" + (this.props.progress?" done":" todo") + (" rarity-" + this.props.rarity)}>
            <img alt={this.props.name + " icon"} src={this.props.icon}/>
            <span className={"name"}>{this.props.name}</span>
            <span>{metadata?.Bait}</span>
            <span>{metadata?.["Open Water"]?"Open Water":""}</span>
        </div>
    }

}

export default Item;