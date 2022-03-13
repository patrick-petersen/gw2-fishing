import React from 'react';
import {GW2Api} from "../api/GW2Api";
import Achievement from "./Achievement";

type CategoryProps = {
    id: Number
}

type CategoryJson = {
    id: Number,
    name: string,
    description: string,
    order: number,
    icon: string,
    achievements: Number[]
}

enum state {
    LOADING,
    LOADED,
    ERROR
}

type CategoryState = {
    state: state,
    json?: CategoryJson
    error?: string
}

class Category extends React.Component<CategoryProps, CategoryState> {

    constructor(props: CategoryProps) {
        super(props);

        this.state = {
            state: state.LOADING,
        }

        GW2Api.getCategory(props.id)
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
                    <div className="Category">
                        <header className="Category-header">
                            <span>Loading Category: {this.props.id}</span>
                        </header>
                    </div>
                );

            case state.LOADED:
                return (
                    <div className="Category">
                        <header className="Category-header">
                            <span>Category: {
                                // @ts-ignore
                                this.state.json.name}</span>
                        </header>
                        <section className={"Category-section"}>
                            {
                                // @ts-ignore
                                this.state.json.achievements.map(value => <Achievement id={value} />)
                            }
                        </section>

                    </div>
                );
            case state.ERROR:
                return (
                    <div className="Category">
                        <header className="Category-header">
                            <span>Category: {this.props.id})</span>
                        </header>
                        <section className={"Category-section"}>
                            <p>{this.state.error}</p>
                        </section>

                    </div>
                );
        }
    }

}

export default Category;
