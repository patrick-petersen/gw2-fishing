import React from 'react';
import {AchievementJson, GW2Api, state} from "../api/GW2Api";
import Item from "../api/Item";
import Items from "../api/Items";

type AchievementProps = {
    id: Number
}

type AchievementState = {
    state: state,
    json?: AchievementJson
    error?: string
}

class Achievement extends React.Component<AchievementProps, AchievementState> {
    constructor(props: AchievementProps) {
        super(props);

        this.state = {
            state: state.LOADING,
        }
    }

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
                        <header className="Achievement-header">
                            <span>Achievement: {
                                this.state.json?.name}</span>
                        </header>
                        <section className={"Achievement-section"}>
                            {
                                this.state.json?.bits?
                                    <Items ids={this.state.json?.bits?.map(value => value.id)} />:
                                    <p>No items</p>
                            }
                        </section>

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
