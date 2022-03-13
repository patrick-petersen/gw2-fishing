import React from 'react';
import {AchievementJson, GW2Api, ItemJson, state} from "../api/GW2Api";
import Item from "./Item";
import {FishData, TimeOfDay} from "../api/FishData";

import "./Item.scss";

type ItemsProps = {
    ids: Number[]
}

type ItemsState = {
    state: state,
    json?: ItemJson[]
    error?: string
}

class Items extends React.Component<ItemsProps, ItemsState> {
    constructor(props: ItemsProps) {
        super(props);

        this.state = {
            state: state.LOADING,
        }
    }

    componentDidMount() {
        GW2Api.getItems(this.props.ids)
            .then((response) => this.setState({
                state: state.LOADED,
                json:response
            })).catch(reason => {
            this.setState({
                state: state.ERROR,
                error: reason
            })
        });
    }

    render() {
        switch (this.state.state) {
            case state.LOADING:
                return (
                    <div className="Items">
                        <header className="Items-header">
                            <span>Loading Items: {this.props.ids}</span>
                        </header>
                    </div>
                );
            case state.LOADED:
                return (
                    <div className="Items">
                        <header className="Items-header">
                            <span>Items:</span>
                        </header>
                        <section className={"Items-section"}>
                            <table>
                                {(() => {
                                    //TODO: Even I cant read this, refactor!
                                    const t = this.state.json?.map(value => {
                                        return {
                                            item: value,
                                            metadata: FishData.getFishByName(value.name)
                                        }
                                    }).reduce(function (r, a) {
                                        if(a.metadata) {
                                            const hole = a.metadata["Fishing Hole"];
                                            const time = a.metadata["Time of Day"];
                                            r[hole] = r[hole] || [];
                                            r[hole][time] = r[hole][time] || [];
                                            r[hole][time].push(a);
                                        }

                                        return r;
                                    }, Object.create(null));

                                    return [
                                        <thead key={"head"}><tr key={"headline"}><th key={"empty"}></th>
                                        {
                                            Object.values(TimeOfDay).map(value => <th key={value}>{value}</th>)
                                        }
                                        </tr></thead>,
                                        <tbody key={"body"}>
                                            {
                                                Object.entries(t).map((hole) => {
                                                    const key = hole[0];
                                                    const times : any = hole[1];

                                                    return (<tr key={key}><td key={"name"}>{key}</td>
                                                        {
                                                            // @ts-ignore
                                                            Object.keys(TimeOfDay).map(time => <td key={time}>{times[time]?.map(onefish => <Item key={onefish.item.name} {...onefish.item}/>)}</td>)
                                                        }
                                                    </tr>)
                                                })
                                            }
                                        </tbody>
                                        ]
                                })()}
                            </table>
                        </section>

                    </div>
                );
            case state.ERROR:
                return (
                    <div className="Items">
                        <header className="Items-header">
                            <span>Category: {this.props.ids})</span>
                        </header>
                        <section className={"Items-section"}>
                            <p>{this.state.error}</p>
                        </section>

                    </div>
                );
        }
    }
}

export default Items;
