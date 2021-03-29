import React, { Component } from 'react';
import './App.css';
import InputComponent from './Component/InputComponent';
import LogComponent from "./Component/LogComponent";
import CalculationComponent from "./Component/CalculationComponent";

import axios from "axios"

class App extends Component {
    constructor() {
        super();

        this.state = {
            result: "",
            calculation:""
        }
    }

    onClick = button => {

        if (button === "=") {
            this.calculate()
        }
        else if (button === "C") {
            this.reset()
        }

        else {
            this.setState({
                calculation: this.state.calculation + button
            })
        }
    };


    calculate = () => {
        var checkResult = ''
        if (this.state.calculation.includes('--')) {
            checkResult = this.state.calculation.replace('--', '+')
        }

        else {
            checkResult = this.state.calculation
        }

        let arithmetic = (eval(checkResult) || "") + ""
        let calculateresult = checkResult.concat("="+arithmetic)

        try {
            this.setState({
                // eslint-disable-next-line
                calculation: arithmetic
            })
        } catch (e) {
            this.setState({
                calculation: "error"
            })

        }
        console.log("calculate result: "+calculateresult)
        //http://calculator.muziqiu.com
        axios
            .post(
                `http://calculator.muziqiu.com/calculatelog?singlecalculate`, {
                    singlecalculate: calculateresult
                  })
            .then(response => {
                let string = ""
                for(let i = 0; i<response.data.length; i++){
                    string = string.concat(response.data[i]).concat("\r\n");
                }
                console.log(string)
                this.setState({
                    result: string
                })
            })
            .catch(error => {
                console.log(
                    "Encountered an error with fetching and parsing data",
                    error
                );
            });
    };

    reset = () => {
        this.setState({
            calculation: ""
        })
    };

    render() {
        return (
            <div>
                <div className="calculator-body">
                    <h1>Simple Calculator</h1>
                    <CalculationComponent result={this.state.calculation} />
                    <InputComponent onClick={this.onClick} />
                    <LogComponent result={this.state.result} />
                </div>
            </div>
        );
    }
}

export default App;
