import React from 'react';

type AchievementProps = {
    id: Number
}
class Achievement extends React.Component<AchievementProps> {
    constructor(props: AchievementProps) {
        super(props);
    }

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
