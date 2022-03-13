import React from 'react';
import './Pools.scss';

type PoolsProps = {
}
class Pools extends React.Component<PoolsProps> {

    render() {
        return (
            <div className="Pools">
                {this.props.children}
            </div>
        );
    }

}

export default Pools;
