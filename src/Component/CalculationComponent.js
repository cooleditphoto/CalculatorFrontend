import React, {Component} from 'react';

class CalculationComponent extends Component {
    render() {
        return (
            <div className="Calculation">
                <p>{this.props.result}</p>
            </div>
    )
        ;
    }
}

export default CalculationComponent;