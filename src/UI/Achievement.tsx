import React from 'react';
import {AchievementJson, GW2Api, state, Progress} from "../api/GW2Api";
import Items from "./Items";

import './Achievement.css';

type AchievementProps = {
    id: Number
}

type AchievementState = {
    state: state,
    collapsed: boolean,
    json?: AchievementJson
    error?: string,
    progress: Progress | undefined
}

class Achievement extends React.Component<AchievementProps, AchievementState> {
    constructor(props: AchievementProps) {
        super(props);

        this.state = {
            state: state.LOADING,
            collapsed: false,
            progress: undefined
        }
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.dataLoadedCallback = this.dataLoadedCallback.bind(this);
    }

    toggleCollapse() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    };

    componentDidMount() {
        GW2Api.getAchievement(this.props.id)
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
    dataLoadedCallback(progress: Progress) {
        this.setState({
            progress: progress
        });
    }

    render() {
        switch (this.state.state) {
            case state.LOADING:
                return (
                    <div className="Achievement">
                        <header className="Achievement-header">
                            <span>Loading Achievement: {this.props.id}</span>
                        </header>
                    </div>
                );
            case state.LOADED:
                return (
                    <div className="Achievement">
                        <header className={"Achievement-header" + (this.state.progress?.done?" done":"")}>
                            <span onClick={this.toggleCollapse}>Achievement: {this.state.json?.name} ({this.state.progress?.current ?? 0} / {this.state.progress?.max ?? 0})</span>
                        </header>
                        {!this.state.collapsed && <section className={"Achievement-section"}>
                            {
                                this.state.json?.bits?
                                    <Items ids={this.state.json?.bits?.map(value => value.id)} achievementId={this.props.id}  dataLoadedCallback={this.dataLoadedCallback}/>:
                                    <p>No items</p>
                            }
                        </section>}
                    </div>
                );
            case state.ERROR:
                return (
                    <div className="Achievement">
                        <header className="Achievement-header">
                            <span>Category: {this.props.id})</span>
                        </header>
                        <section className={"Achievement-section"}>
                            <p>{this.state.error}</p>
                        </section>

                    </div>
                );
        }
    }
}

export default Achievement;
