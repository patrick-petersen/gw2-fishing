import React from 'react';

type TimeBlockProps = {
    name: string,
    start: string,
    end: string
}
class TimeBlock extends React.Component<TimeBlockProps> {

    render() {
        return (
            <div className="TimeBlock">
                <header className="TimeBlock-header">
                    <span>{this.props.name}</span>
                </header>
                {this.props.children}
            </div>
        );
    }

}

export default TimeBlock;
