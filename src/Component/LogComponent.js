import React, {Component} from 'react';

class LogComponent extends Component {
    render() {
        return (
            <div className="log">
                <p>{this.props.result}</p>
            </div>
    )
        ;
    }
}

export default LogComponent;