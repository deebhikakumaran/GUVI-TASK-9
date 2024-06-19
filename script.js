// Calculator UI

let arr = [['M+','M-','MR','MC'],['AC','DEL','%','/'],['7','8','9','*'],['4','5','6','-'],['1','2','3','+'],['0','00','.','=']]

let output_window = document.createElement('div')
output_window.setAttribute('class','container-fluid calc-output')

let problem = document.createElement('div')
problem.setAttribute('class','problem')

let solution = document.createElement('div')
solution.setAttribute('class','solution')

output_window.appendChild(problem)
output_window.appendChild(solution)

let calc_buttons = document.createElement('div')
calc_buttons.setAttribute('class','container-fluid calc-inputs')

for(let i=0; i<=5; i++) {
    let row = document.createElement('div')
    row.setAttribute('class','row')
    for(let j=0; j<4; j++) {
        let col = document.createElement('div')
        col.setAttribute('class','col col-item')
        let btn = document.createElement('button')
        btn.innerText = arr[i][j]
        if(j==3 || i==0 || (j==2 && i==5) || i==1) {
            btn.setAttribute('id','operations')
        }
        if((j==0 && i==1) || (j==1 && i==1)) {
            btn.setAttribute('id','clear')
        }
        col.appendChild(btn)
        row.appendChild(col)
    }
    calc_buttons.appendChild(row)
}

let calc = document.createElement('div')
calc.setAttribute('class','container-fluid calculator')
calc.appendChild(output_window)
calc.appendChild(calc_buttons)

document.body.appendChild(calc)

// Calculator Functions

// Key Press Function

validKeys = ['1','2','3','4','5','6','7','8','9','0',
            '=','Enter','Escape','Delete','Backspace','Shift',
            '+', '-', '*', '/', '%', '.']

document.addEventListener('keyup',logKey)

function logKey(e) {
    e.preventDefault();
    if(validKeys.includes(e.key)) {
        if(e.key == '=' || e.key == 'Enter') {
            if(problem.innerHTML != '') {
                solution.innerHTML = eval(problem.innerHTML);
                problem.innerHTML = ''
            }
            else {
                alert('Enter input');
            }
        }
        else if (e.key == 'Escape' || e.key == 'Delete') {
            solution.innerHTML = '';
            problem.innerHTML = '';
        } 
        else if (e.key == 'Backspace') {
            if (problem.innerHTML.length != 0) {
              problem.innerHTML = problem.innerHTML.slice(0,problem.innerHTML.length - 1);
            }
        }
        else if (e.key == 'Shift') {
            pass
        } 
        else {
            problem.innerHTML += e.key  
        }      
    }
    else {
        alert('Only numbers are allowed')
    }
}

// Mouse Functions

let allBtns = document.querySelectorAll('button')

allBtns.forEach((btn)=>{
    btn.addEventListener('click', () => {
        if(btn.innerHTML == '=') {
            if(problem.innerHTML != '') {
                solution.innerHTML = eval(problem.innerHTML)
                problem.innerHTML = ''
            }
            else {
                alert("Enter input");
            }
        }
        else if(btn.innerHTML == 'AC') {
            solution.innerHTML = ''
            problem.innerHTML = ''
        }
        else if(btn.innerHTML == 'DEL') {
            if (problem.innerHTML.length != 0) {
                problem.innerHTML = problem.innerHTML.slice(0,problem.innerHTML.length - 1);
            }
        }
        else if(btn.innerHTML == 'M+') {
            addToMemory()
        }
        else if(btn.innerHTML == 'M-') {
            subtractFromMemory()
        }
        else if(btn.innerHTML == 'MC') {
            clearMemory()
        }
        else if(btn.innerHTML == 'MR') {
            recallMemory()
        }
        else {
            problem.innerHTML += btn.innerHTML 
        }
    })
})

function addToMemory() {
    let currentMemory = parseFloat(localStorage.getItem('memory') || '0')
    let currentValue = parseFloat(solution.innerHTML || '0')
    localStorage.setItem('memory', currentMemory + currentValue)
}

function subtractFromMemory() {
    let currentMemory = parseFloat(localStorage.getItem('memory') || '0')
    let currentValue = parseFloat(solution.innerHTML || '0')
    localStorage.setItem('memory', currentMemory - currentValue)
}

function recallMemory() {
    let currentMemory = parseFloat(localStorage.getItem('memory') || '0')
    solution.innerHTML = currentMemory
}

function clearMemory() {
    localStorage.removeItem('memory')
}