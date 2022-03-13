import React from 'react';
import {CategoryJson, GW2Api, state} from "../api/GW2Api";
import Achievement from "./Achievement";

type CategoryProps = {
    id: Number
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
    }
    componentDidMount() {
        GW2Api.getCategory(this.props.id)
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
                            <span>Category: {this.state.json?.name}</span>
                        </header>
                        <section className={"Category-section"}>
                            {
                                this.state.json?.achievements.map(value => <Achievement key={""+value} id={value} />)
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
