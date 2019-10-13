function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let rpn = [];
    let op = [];

    const parseString = str => {
        let buff = [];
        let num =[];
        let bracketCount = 0;
        
        for (let i = 0; i < str.length; i++){
            if(str[i] !== ' '){
                if (str[i] === ('(')) bracketCount++;
                if (str[i] === (')')) bracketCount--;
                if (parseFloat(str[i]) || parseFloat(str[i]) === 0) num.push(str[i]);
                else {
                if (num.length){
                    buff.push(num.join(''));
                    num = [];
                }
                buff.push(str[i]);
                }
            }
        }

        if (num.length){
            buff.push(num.join(''));
            num = [];
        }

        if (bracketCount !== 0) throw new Error("ExpressionError: Brackets must be paired")

        return buff;
    }


    const range = (sym) => {
        switch(sym){
            case '(':
            case ')':
                return 1;
            case '+':
            case '-':
                return 2;
            case '*':
            case '/':
                return 3;
        }
    }

    const calc = {
        '+': arr => {return arr[0] + arr[1]},
        '-': arr => {return arr[0] - arr[1]},
        '*': arr => {return arr[0] * arr[1]},
        '/': arr => {
            if (arr[1] === 0) throw new Error ('TypeError: Division by zero.');
            return arr[0] / arr[1];
        },
    }

    const checkOperators = (operator) => {
        if(range(op[op.length - 1]) >= range(operator)){
            rpn.push(op.pop());
            if(range(op[op.length - 1]) == range(operator)){
                rpn.push(op.pop());
            }
            op.push(operator);
        }
        else op.push(operator);
    }

    const chooseStack = operator => {
        if (!op.length) op.push(operator);
        else{
            if(operator === '('){
                op.push(operator);
            }
            else if (operator === ')'){
                for(let i = op.length-1; i >= 0; i--){
                    if (op[i] !== '(') rpn.push(op.pop());
                    else {
                        op.pop();
                        return;
                    }
                }
            }
            else {
                checkOperators(operator);
            }
        }
    }

    const converter = str => {
        let buff = parseString(str);

        buff.forEach(el => {
            if (parseFloat(el) || parseFloat(el) === 0) rpn.push(parseFloat(el));
            else{
                if (!op.length) op.push(el);
                else{
                    chooseStack(el);
                }
            }
        });

        let count = op.length;
        for(let i = 0; i < count; i++){
            rpn.push(op.pop());
        }
    }


    const result = array => {
        let buffer = [];
        for (let i = 0; i < array.length; i++){
            if(typeof array[i] === 'number'){
                buffer.push(array[i])
            }else{
                let temp = buffer.splice(-2);
                buffer.push(calc[array[i]](temp));
            }
        }
        console.log(buffer);
        return buffer[0];
    }
    converter(expr);
    return result(rpn);
}

module.exports = {
    expressionCalculator
}