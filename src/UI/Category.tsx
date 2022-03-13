import React from 'react';
import {GW2Api} from "../api/GW2Api";
import Achievement from "./Achievement";

type AreaProps = {
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

class Category extends React.Component<AreaProps, CategoryJson> {

    constructor(props: AreaProps) {
        super(props);

        const json = GW2Api.getCategory(props.id);

        this.state = json;
    }

    render() {
        return (
            <div className="Category">
                <header className="Category-header">
                    <span>{this.props.id}</span>
                </header>
                <section className={"Category-section"}>
                    {
                        this.state.achievements.map(value => <Achievement id={value} />)
                    }
                </section>

            </div>
        );
    }

}

export default Category;
