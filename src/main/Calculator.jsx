import React, { Component } from 'react';

import './Calculator.css'
import Display from '../components/Display';
import Button from '../components/Buttons';


//informacoes inicias da calculadora
const initialState = {
    displayValue: '0',
    clearDisplay:false,
    operation: null,
    values: [0, 0],
    current: 0//qual value(index)
}


export default class Calculator extends Component {

    state = {...initialState}//clona todos

    /* Funcoes da calculadora */
    clearMemory(){
        this.setState({...initialState})//reseta todos eles
    }
    
    
    setOperation(operation) {
        if(this.state.current === 0) {
            this.setState({operation, current:1, clearDisplay:true})
        } else {//current = 1, fazer operacao
            const equals = operation === '='//true?
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e) {
                values[0] = this.state.values[0]
            }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null: operation,
                current: equals ? 0: 1,
                clearDisplay: !equals,
                values
            })
        }
    }


    addDigit(n) {
        if(n === '.' && this.state.displayValue.includes('.')) {
            return //sai direto se ja tiver
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({displayValue/*muda o padrao */, clearDisplay:false})

        if(n !== '.') {
            const i = this.state.current /*indice */
            const newValue = parseFloat(displayValue)//tira de string para float
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
    }


    
    
    render() {//onde renderizam as coisas
        const addDigit = n => this.addDigit(n)
        const setOperaation = op => this.setOperation(op)



        return ( //obrigatorio na render
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={()=>this.clearMemory()} triple/>
                <Button label="/" click={setOperaation} operation/> {/*precisa para ser automatico as operacoes */}
                <Button label="7" click={addDigit}/>
                <Button label="8" click={addDigit}/>
                <Button label="9" click={addDigit}/>
                <Button label="*" click={setOperaation} operation/> {/*precisa para ser automatico as operacoes */}
                <Button label="4" click={addDigit}/>
                <Button label="5" click={addDigit}/>
                <Button label="6" click={addDigit}/>
                <Button label="-" click={setOperaation} operation/>
                <Button label="1" click={addDigit}/>
                <Button label="2" click={addDigit}/>
                <Button label="3" click={addDigit}/>
                <Button label="+" click={setOperaation} operation/>
                <Button label="0" click={addDigit} double/>
                <Button label="." click={addDigit}/>
                <Button label="=" click={setOperaation} operation/>
            </div>
        )
    }
}