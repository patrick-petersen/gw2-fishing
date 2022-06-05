import React from 'react';
import {GW2Api, ItemJson, Progress, state} from "../api/GW2Api";
import Item from "./Item";
import {Fish, FishData, TimeOfDay} from "../api/FishData";

import "./Item.scss";

type ItemsProps = {
    ids: Number[]
    achievementId: Number,
    dataLoadedCallback: (progress: Progress) => void | undefined,
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

type SingleEnrichedFish = {
    item: ItemJson,
    metadata: Fish,
    progress: boolean
}

type FishByTime = {
    [key in TimeOfDay] : SingleEnrichedFish[]
}

type EnrichedFish = {
    [key: string]: FishByTime
}

class Items extends React.Component<ItemsProps, ItemsState> {
    private progressInterval: NodeJS.Timer | undefined ;

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
        this.loadItems();
        this.loadProgress();
        this.progressInterval = setInterval(this.loadProgress.bind(this), 60000);
    }
    componentWillUnmount() {
        if(this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    }

    private loadItems() : void {
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

    callCallback(progress : Progress) {
        if(this.props.dataLoadedCallback) {
            this.props.dataLoadedCallback(progress);
        }
    }

    loadProgress() : void {
        GW2Api.getProgress(this.props.achievementId)
            .then((response) => {
                this.setState({
                    progress: {
                        state: state.LOADED,
                        json: response
                    }
                });
                this.callCallback(response);
            })
            .catch(reason => {
                console.log("Could not load data for achievement: " + this.props.achievementId + ". Reason: " + reason);

                if(this.progressInterval) {
                    clearInterval(this.progressInterval);
                }

                this.setState({
                    progress: {
                        state: state.ERROR,
                        error: reason
                    }
                })
            });
    }

    isDone() : boolean {
        return (this.state.progress.json?.done ?? false) || ((this.state.progress.json?.repeated ?? 0 ) > 0);
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
                            <table className={this.isDone()?"done":"todo"}>
                                {(() => {
                                    //TODO: Even I cant read this, refactor!
                                    const enrichedGroupedFish : EnrichedFish = this.state.item.json?.map((value, index) => {
                                        return {
                                            item: value,
                                            metadata: FishData.getFishByName(value.name),
                                            progress: this.state.progress.json?this.state.progress.json.bits?.includes(index):false
                                        }
                                    }).reduce(function (aggregation, currentFish) {
                                        if(currentFish.metadata) {
                                            const hole = currentFish.metadata["Fishing Hole"];
                                            const time = currentFish.metadata["Time of Day"];
                                            aggregation[hole] = aggregation[hole] || [];
                                            aggregation[hole][time] = aggregation[hole][time] || [];
                                            aggregation[hole][time].push(currentFish);
                                        }
                                        else {
                                            console.warn("missing fish metadata!:" + currentFish.item.name);
                                        }

                                        return aggregation;
                                    }, Object.create(null));

                                    return [
                                        <thead key={"head"}><tr key={"headline"}><th key={"empty"}/>
                                        {
                                            Object.values(TimeOfDay).map(value => <th key={value}>{value}</th>)
                                        }
                                        </tr></thead>,
                                        <tbody key={"body"}>
                                            {
                                                Object.entries(enrichedGroupedFish).map((hole) => {
                                                    const key = hole[0];
                                                    const times : FishByTime = hole[1];

                                                    return (<tr key={key}><td key={"name"}>{key}</td>
                                                        {
                                                            Object.values(TimeOfDay).map(time => <td key={time}>{times[time]?.map(oneFish => <Item key={oneFish.item.name} progress={oneFish.progress} {...oneFish.item}/>)}</td>)
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
