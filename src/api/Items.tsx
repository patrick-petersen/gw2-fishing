import React from 'react';
import {AchievementJson, GW2Api, ItemJson, state} from "../api/GW2Api";
import Item from "../api/Item";
import {FishData} from "./FishData";

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
                                    const t = this.state.json?.map(value => {
                                        return {
                                            item: value,
                                            metadata: FishData.getFishByName(value.name)
                                        }
                                    }).reduce(function (r, a) {
                                        if(a.metadata) {
                                            const tod = a.metadata["Time of Day"];
                                            r[tod] = r[tod] || [];
                                            r[tod].push(a);
                                        }

                                        return r;
                                    }, Object.create(null));

                                    //console.log(t);

                                    return [
                                        <tr>
                                        {
                                            Object.entries(t).map((value) => {
                                            const key = value[0];
                                            const fish = value[1];
                                            return (<th>{key}</th>)})
                                        }
                                        </tr>,
                                        <tr>
                                            {
                                                Object.entries(t).map((value) => {
                                                    const key = value[0];
                                                    const fish = value[1];
                                                    return (<td>
                                                        {
                                                            // @ts-ignore
                                                            fish.map(onefish => <Item {...onefish.item}/>)
                                                        }
                                                    </td>)
                                                })
                                            }
                                        </tr>]


                                    //return this.state.json?.map(value => <Item {...value}/>)
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
