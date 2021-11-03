mainOutput=document.querySelector('#mainOutput');
secondOutput=document.querySelector('#secondOutput');
const numberButtons=document.querySelectorAll('.numberButton');
const operatorButtons=document.querySelectorAll('.operator');
const equalButton=document.querySelector('#equal');
const acButton=document.querySelector('#AC');
const cButton=document.querySelector('#C');
const negativeButton=document.querySelector('#negative');
const dotButton=document.querySelector('#dot');
let currentNumber=0;
let lastNumber;
lastOperation=undefined;
equalFlag=false;
decimalFlag=false;

function add(a,b){
    return a+b;
}
function min(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}

function addDigit(num){
    if (equalFlag) {
        acFunction();
    }
    if(mainOutput.textContent.length<16){
        currentNumber=mainOutput.textContent+=num;
        return currentNumber;
    }
    
}
function operatorFunction(buttonID){
        
        if(equalFlag) equalFlag=false;      
        console.log(lastOperation); 
        (lastNumber==null||lastOperation==null) ? lastNumber=currentNumber: calculate(lastOperation);
        currentNumber=null;
        lastOperation=buttonID; 
        updateOutput2();
        
}

function updateOutput(){
    mainOutput.textContent=String(currentNumber).slice(0,15);
    secondOutput.textContent=lastNumber;
}

function updateOutput2(){
    let opSymbol
    
    switch(lastOperation){
        case 'plus': opSymbol='+';break;
        case 'multiply': opSymbol='x';break;
        case 'divide': opSymbol='/';break;
        case 'min': opSymbol='-';break;
        default: opSymbol='';
    }
    console.log(opSymbol);
    mainOutput.textContent=currentNumber;
    secondOutput.textContent=lastNumber+' '+opSymbol;
    if (lastNumber==null||lastNumber==undefined) secondOutput.textContent='';
}
function calculate(buttonID){
    if(currentNumber==null) return;
    currentNumber=Number(currentNumber);
    lastNumber=Number(lastNumber);
    switch(buttonID){
        case 'plus': lastNumber+=currentNumber;break;
        case 'min': lastNumber-=currentNumber;break;
        case 'multiply': lastNumber*=currentNumber;break;
        case 'divide': lastNumber/=currentNumber;break;
    }
    lastOperation=buttonID;
}
function equal(){
    currentNumber=Number(currentNumber);
    lastNumber=Number(lastNumber);
    switch(lastOperation){
        case 'plus': currentNumber=lastNumber+currentNumber;break;
        case 'min': currentNumber=lastNumber-currentNumber;break;
        case 'multiply': currentNumber=lastNumber*currentNumber;break;
        case 'divide': currentNumber=lastNumber/currentNumber;break;
    }
    lastNumber=null;
    updateOutput();
    equalFlag=true;
}

function acFunction(){
    console.log("ac button pressed")
    lastNumber=null;
    currentNumber='';
    lastOperation=undefined;
    updateOutput();
    equalFlag=false;
}
function negativeFunction(){
    if(!equalFlag){
        if(currentNumber!=null) currentNumber=-currentNumber;
        updateOutput2();
    }

}

function cFunction(){
    if(!equalFlag){
        if(currentNumber!=null){
            currentNumber=String(currentNumber).slice(0,-1)
        }
        updateOutput2();
    }
}

function dotFunction(){
    if(!equalFlag){
        if(!String(currentNumber).includes('.')){
            addDigit('.');
        }
    }
}


numberButtons.forEach((button)=> {
    button.addEventListener('click', ()=>addDigit(button.id));
});
operatorButtons.forEach((button)=>{
    button.addEventListener('click',()=>operatorFunction(button.id))
})
equalButton.addEventListener('click',()=>equal());
acButton.addEventListener('click',()=>acFunction());
negativeButton.addEventListener('click',()=>negativeFunction());
cButton.addEventListener('click',()=>cFunction());
dotButton.addEventListener('click',()=>dotFunction());
