import React from 'react';

type FishProps = {
    name: string,
    bait: string
}
class Fish extends React.Component<FishProps> {

    render() {
        return (
            <div className="Fish">
                <span>{this.props.name}</span>
                <span>{this.props.bait}</span>
            </div>
        );
    }

}

export default Fish;
