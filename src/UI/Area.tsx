import React from 'react';

type AreaProps = {
    name: string
}
class Area extends React.Component<AreaProps> {

    render() {
        return (
            <div className="Area">
                <header className="Area-header">
                    <span>{this.props.name}</span>
                </header>
                {this.props.children}
            </div>
        );
    }

}

export default Area;
