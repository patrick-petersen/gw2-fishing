import React from "react";

type PoolProps = {
    name: string
}
class Pool extends React.Component<PoolProps> {

    render() {
        return (
            <div className="Pool">
                <div className={"Pool-name"}>
                    <span>{this.props.name}</span>
                </div>

                {this.props.children}
            </div>
        );
    }
}

export default Pool;