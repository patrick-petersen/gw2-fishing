import React from 'react';

type AreaProps = {
    id: Number
}
class Achievement extends React.Component<AreaProps> {

    render() {
        return (
            <div className="Area">
                <header className="Area-header">
                    <span>{this.props.id}</span>
                </header>
                {this.props.children}
            </div>
        );
    }

}

export default Achievement;
