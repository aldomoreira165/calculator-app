import { useEffect, useRef, useState } from "react"


enum Operator {
    add = '+',
    substract = '-',
    multiply = '×',
    divide = '÷',
}

export const useCalculator = () => {

    const [formula, setFormula] = useState('0');

    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');

    const lastOperation = useRef<Operator>(undefined);

    useEffect(() => {
        if (lastOperation.current) {
            const firstFormulaPart = formula.split(' ').at(0);
            setFormula( `${firstFormulaPart} ${lastOperation.current} ${number}`)
        } else {
            setFormula(number)
        }
    }, [number]);

    useEffect(() => {
        const subResult = calculateSubresult();
        setPrevNumber(`${subResult}`)
    }, [formula]);

    const clean = () => {
        setNumber('0');
        setPrevNumber('0');
        setFormula('0');

        lastOperation.current = undefined;
    }

    const toggleSign = () => {
        if (number.startsWith('-')) {
            setNumber(number.slice(1))
            return;
        }

        setNumber('-' + number);
    }

    const deleteLastDigit = () => {

        let sign = false;

        if (number.startsWith('-')) sign = true;

        if (sign && number.length === 2) {
            setNumber('0');
            return;
        }

        if (number.length === 1) {
            setNumber('0');
            return;
        }

        const newNumber = number.slice(0, number.length - 1)
        setNumber(newNumber);
    }


    const setLastNumber = () => {
        calculateResult();
        
        if (number.endsWith('.')) {
            setPrevNumber(number.slice(0, -1));
        }

        setPrevNumber(number);
        setNumber('0');
    }

    const divideOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.divide;
    }

    const multiplyOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.multiply;
    }

    const substractOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.substract;
    }

    const addOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.add;
    }

    const calculateSubresult = () => {
        const [firstValue, operation, secondValue] = formula.split(' ');

        const num1 = Number(firstValue);
        const num2 = Number(secondValue);

        if (isNaN(num2)) return num1;   

        switch (operation) {
            case Operator.add:
                return num1 + num2;
            case Operator.substract: 
                return num1 - num2;
            case Operator.divide: 
                return num1 / num2;
            case Operator.multiply: 
                return num1 * num2;
            default: 
                throw new Error(`Operation ${operation} not implemented`);
        }
    }

    const calculateResult = () => {
        const result = calculateSubresult();
        setFormula(`${result}`);       
        lastOperation.current = undefined;
        setPrevNumber('0')
    };

    const buildNumber = (numberString: string) => {
        // verificar si ya existe el punto decimal
        if (number.includes('.') && numberString === '.') return;

        if (number.startsWith('0') || number.startsWith('-0')) {
            if (numberString === '.') {
                return setNumber(number + numberString);
            }

            // evalular si es otro cero y no hay punto
            if (numberString === '0' && number.includes('.')) {
                return setNumber(number + numberString);
            }

            // evaluar si es diferente de cero, no hay punto y es el primer numero
            if (numberString !== '0' && !numberString.includes('.')) {
                return setNumber(numberString);
            }

            // evitar el 0000.0
            if (numberString === '0' && !number.includes('.')) return;
        }

        setNumber(number + numberString);
    }

    return {
        // props
        formula,
        number,
        prevNumber,

        // methods
        buildNumber,
        clean,
        toggleSign,
        deleteLastDigit,

        divideOperation,
        multiplyOperation,
        substractOperation,
        addOperation,

        calculateSubresult,
        calculateResult,
    }
}