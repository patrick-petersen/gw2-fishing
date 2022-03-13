import React from 'react';
import {AchievementJson, GW2Api, ItemJson, Progress, state} from "../api/GW2Api";
import Item from "./Item";
import {FishData, TimeOfDay} from "../api/FishData";

import "./Item.scss";

type ItemsProps = {
    ids: Number[]
    achievementId: Number
}

type ItemsState = {
    item: {
        state: state,
        json?: ItemJson[]
        error?: string
    },
    progress: {
        state: state,
        json?: Progress
        error?: string
    },
}

class Items extends React.Component<ItemsProps, ItemsState> {
    constructor(props: ItemsProps) {
        super(props);

        this.state = {
            item:
                {
                    state: state.LOADING
                },
            progress:
                {
                    state: state.LOADING
                }
        }
    }

    componentDidMount() {
        GW2Api.getProgress(this.props.achievementId)
            .then((response) => this.setState({
                progress: {
                    state: state.LOADED,
                    json:response
                }
            })).catch(reason => {
            this.setState({
                progress: {
                    state: state.ERROR,
                    error: reason
                }
            })
        });

        GW2Api.getItems(this.props.ids)
            .then((response) => this.setState({
                item: {
                    state: state.LOADED,
                    json:response
                }
            })).catch(reason => {
            this.setState({
                item: {
                    state: state.ERROR,
                    error: reason
                }
            })
        });
    }

    render() {
        switch (this.state.item.state) {
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
                            <table className={this.state.progress.json&&this.state.progress.json.done?"done":"todo"}>
                                {(() => {
                                    //TODO: Even I cant read this, refactor!
                                    const t = this.state.item.json?.map((value, index) => {
                                        return {
                                            item: value,
                                            metadata: FishData.getFishByName(value.name),
                                            progress: this.state.progress.json?this.state.progress.json.bits?.includes(index):false
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
                                                            Object.keys(TimeOfDay).map(time => <td key={time}>{times[time]?.map(onefish => <Item key={onefish.item.name} progress={onefish.progress} {...onefish.item}/>)}</td>)
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
                            <p>{this.state.item.error}</p>
                        </section>

                    </div>
                );
        }
    }
}

export default Items;
