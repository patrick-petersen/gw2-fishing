import React from 'react';
import {ItemJson} from "../api/GW2Api";
import {FishData} from "../api/FishData";

type ItemProps = ItemJson & {progress: boolean};

class Item extends React.Component<ItemProps, ItemJson> {
    render() {
        const metadata = FishData.getFishByName(this.props.name);
        if(metadata) {
            return <div className={"fish" + (this.props.progress?" done":" todo") + (" rarity-" + this.props.rarity)}>
                <img alt={this.props.name + " icon"} src={this.props.icon}/>
                <span className={"name"}><a href={"https://wiki.guildwars2.com/wiki/" + this.props.name} target={"_blank"} rel={"noreferrer"}>{this.props.name}</a></span>
                <span>{metadata?.Bait}</span>
                <span>{metadata?.["Open Water"]?"Open Water":""}</span>
            </div>
        }
        else {
            console.warn("unknown fish: " + this.props.name);
            return <div className={"fish"}>
                <img alt={this.props.name + " icon"} src={this.props.icon}/>
                <span className={"name"}><a href={"https://wiki.guildwars2.com/wiki/" + this.props.name} target={"_blank"} rel={"noreferrer"}>{this.props.name}</a></span>
            </div>
        }
    }

}

export default Item;