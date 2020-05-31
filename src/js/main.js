'use strict';

let startRasch = document.getElementById('start');
console.log(startRasch);

let budgetValue = document.getElementsByClassName('budget-value')[0];
console.log(budgetValue);

let daybudgetValue = document.getElementsByClassName('daybudget-value')[0];
console.log(daybudgetValue);

let levelValue = document.getElementsByClassName('level-value')[0];
console.log(levelValue);

let expensesValue = document.getElementsByClassName('expenses-value')[0];
console.log(expensesValue);

let optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0];
console.log(optionalexpensesValue);

let incomeValue = document.getElementsByClassName('income-value')[0];
console.log(incomeValue);

let monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0];
console.log(monthsavingsValue);

let yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0];
console.log(yearsavingsValue);

let expensesItems = document.getElementsByClassName('expenses-item');
console.log(expensesItems);

let expensesItemBtn = document.getElementsByTagName('button')[0];
console.log(expensesItemBtn);

let optionalexpensesBtn = document.getElementsByTagName('button')[1];
console.log(optionalexpensesBtn);

let countBudgetBtn = document.getElementsByTagName('button')[2];
console.log(countBudgetBtn);

let optionalexpensesItems = document.querySelectorAll('.optionalexpenses-item');
console.log(optionalexpensesItems);

let chooseIncome = document.querySelector('.choose-income');
console.log(chooseIncome);

let savings = document.querySelector('#savings');
console.log(savings);

let sum = document.querySelector('.choose-sum');
console.log(sum);

let percent = document.querySelector('.choose-percent');
console.log(percent);

let yearValue = document.querySelector('.year-value');
console.log(yearValue);

let monthValue = document.querySelector('.month-value');
console.log(monthValue);

let dayValue =document.querySelector('.day-value');
console.log(dayValue);








// let money, time;
// function start(){
//     time = prompt('Введите дату в формате YYYY-MM-DD');
//     while(isNaN(money) || money == '' || money == null){
//         money = +prompt('Ваш бюджет на месяц?');
//     }
    
       
// }

// start();

let money, time;
startRasch.addEventListener('click', function(){
    time = prompt('Введите дату в формате YYYY-MM-DD');
    while(isNaN(money) || money == '' || money == null){
        money = +prompt('Ваш бюджет на месяц?');
    }
    appData.timeData = time;
    appData.bujet = money;
    console.log(appData);
    
    //преобразовываем appData.bujet в строку и делаем из нее массив для дальнейшего перебора:
    let test = Array.from(appData.bujet+'');

    //делаем перебор массива и добавляем отступ в тысячах:
    for (let i=1; i<test.length; i++){
        let xyz = test.length - i;
        if (xyz == 3) {
            test.splice(i, 0, ' ');
            break;
        }
    }
    console.log(test);
    
    //делаем перебор массива и добавляем отступ в млн-х:
    for (let i=0; i<test.length; i++){
        let xyz = test.length - i;
        if (xyz == 7){
            test.splice(i, 0, ' ');
            break;
        }
    }
    console.log(test);

    //делаем перебор массива и добавляем отступ в млрд-х:
    for (let i=0; i<test.length; i++){
        let xyz = test.length - i;
        if (xyz == 11){
            test.splice(i, 0, ' ');
            break;
        }
    }
    console.log(test);


    //объединяем массив в строку и делаем вывод дохода в поле "budget-value":
    budgetValue.textContent = test.join('') + ' руб.';

    //работа с Датой: в наши input-ы, мы добавляем значения value и в них помещаем год/месяц/день: 
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
    
});


//обязательные статьи расходов + подсчет суммы всех введенных числовых значений и вывод в окно результата(справа):
expensesItemBtn.addEventListener('click', function () {
    let sum = 0;
    for (let i = 0; i < expensesItems.length; i++) {
        let qw1 = expensesItems[i].value,
            qw2 = +expensesItems[++i].value;

            console.log(qw1 + ':' + typeof(qw1) + '+' + qw2 + ':' + typeof(qw2));
    
            if(typeof(qw1)==='string' && typeof(qw1) != null && typeof(qw2) != null && qw1 != "" && qw2 != "" && qw1.length < 50){
                console.log('ok');
    
                appData.expenses[qw1] = qw2;
            } else {
                alert('bed result: Заполните поля');
                break;
                // i--;
            }

            sum = sum + qw2;
            console.log(sum + '->' + typeof(sum));
            
    }

    expensesValue.textContent = sum + ' руб.';
    console.log(expensesValue.textContent);
    
});


//собираем инфу о необязательных расходах и выводим в окно результата:
optionalexpensesBtn.addEventListener('click', function() {
    for(let i = 0; i < optionalexpensesItems.length; i++){
        let a = optionalexpensesItems[i].value;

        if(typeof(a) === 'string' && typeof(a) != null && a != ''){
            console.log('done');
            appData.optionalExpenses[i] = a;
            optionalexpensesValue.textContent += appData.optionalExpenses[i] + '; ';
        }else {
            console.log('bed');
            alert('Введите статьи необязательных расходов!');
            break;
            // i--;
        }
        }
        
});


//Расчет бюджета на день и определение уровня дохода:

countBudgetBtn.addEventListener('click', function() {
    let oneDay = (appData.bujet/30).toFixed();
        appData.oneDay = oneDay;
        if (appData.oneDay == '0') {
            daybudgetValue.textContent = 'Введите бюджет';
        } else {
        daybudgetValue.textContent = appData.oneDay + ' руб.';
        }

        if (appData.oneDay == '0') {
            alert('Ошибка! Введите Ваш бюджет!');
        } else if (appData.oneDay < 100){
            levelValue.textContent = 'Низкий';
        } else if (appData.oneDay > 100 && appData.oneDay < 300){
            levelValue.textContent = 'Средний';
        } else if (appData.oneDay > 300) {
            levelValue.textContent = 'Высокий';
        } else {
            alert('произошла ошибка');
        }
});


chooseIncome.addEventListener('input', function(){
    let items = chooseIncome.value;
    let arr = items.split(', ');
    appData.income = arr;

    let bulProv = true;
    for(let key in arr) {
        let prov = +arr[key];
        // console.log(prov);
        let x = !!prov;
        // console.log(x);
        let z = true;
        let y = (x == z);
        if (y === false && arr[key] != ' ') {
            console.log('ok');
            bulProv = bulProv*true;
        } else {
            console.log('hui');
            bulProv = bulProv*false;
        }
    }
        console.log(bulProv);
        if (bulProv == 1) {
            appData.income = arr;
        } else {
            alert('введите только текстовые значения и только через запятую! Например: фриланс, подработка, продажи');
            appData.income.pop();
            // let tra = chooseIncome.value[chooseIncome.value.length-1];
            let lastMass = chooseIncome.value.split(', ');
            lastMass.pop();
            let kuk = lastMass.join(', ');
            console.log(kuk);
            chooseIncome.value = kuk;
        }
        incomeValue.textContent = appData.income;
});



    sum.addEventListener('mouseover', function(){
        console.log(appData.savings);
        if(appData.savings == false) {
            sum.setAttribute('disabled', 'disabled');
        }
    });

    percent.addEventListener('mouseover', function(){
        console.log(appData.savings);
        if(appData.savings == false) {
            percent.setAttribute('disabled', 'disabled');
        }
    });
    
savings.addEventListener('click', function() {
    if (savings.checked == true) {
        appData.savings = true;
        // console.log(appData.savings);
        sum.removeAttribute('disabled');
        percent.removeAttribute('disabled');
    } else {
        appData.savings = false;
        console.log(appData.savings);
    }
});




// sum.setAttribute('disabled', 'disabled');

let appData = {
    bujet: [],
    timeData: [],
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
    chooseExpenses: function(){
        // for (let i = 0; i < 2; i++) {
        //     let qw1 = prompt('Введите обязательную статью расходов в этом месяце'),
        //         qw2 = prompt('Во сколько Вам обойдется ' + qw1 + '?');
        
        //         if(typeof(qw1)==='string' && typeof(qw1) != null && typeof(qw2) != null && qw1 != "" && qw2 != "" && qw1.length < 50){
        //             console.log('ok');
        
        //             appData.expenses[qw1] = qw2;
        //         } else {
        //             console.log('bed result');
        //             i--;
        //         }
        // }
    },
    detectDayBudget: function() {
        // let oneDay = (appData.bujet/30).toFixed();
        // appData.oneDay = oneDay;
        // alert('Ваш дневной лимит равен ' + oneDay);
    },
    detectLevel: function() {
        // if (appData.oneDay < 100){
        //     alert('У вас очень маленький уровень достатка');
        // } else if (appData.oneDay > 100 && appData.oneDay < 300){
        //     alert('У вас средний уровень достатка');
        // } else if (appData.oneDay > 300) {
        //     alert('У вас высокий уровень достатка');
        // } else {
        //     alert('произошла ошибка');
        // }
    },
    qwBySaving: function() {
        let qwSave = prompt('Скажите, у Вас есть сбережения?');
    if (qwSave == 'yes' && typeof(qwSave) != null && qwSave != '') {
        appData.savings = !!'true';
        //здесь вызвать функцию расчета процентов
        // raschProc();
        let sber,
        procSber;
    while (isNaN(sber) || sber == '' || sber == null) {
        sber = +prompt('Какая сумма находится на процентной ставке?');
    }
    while (isNaN(procSber) || procSber == '' || procSber == null) {
        procSber = +prompt('Под какой годовой процент ёпт?');
    }
        appData.monthIncome = (sber*procSber/100)/12;
        alert('Дружок, твой МЕСЯЧНЫЙ доход от бобла, которое лежит под процентами равен: ' + appData.monthIncome);
        if (appData.monthIncome >= 2000){
            alert('Братан, у тебя есть возможность нормально заработать');
        } else {
            alert('Братан, сорян, но ты не разбоготеешь...');
        }

    } else {
        
        let xxx;
        while (qwSave == xxx || qwSave == '') {
            alert('вы не ответили на вопрос');
            qwSave = prompt('Скажите, у Вас есть сбережения?');
        }
    }
    while (qwSave == 'no') {
        alert('Вы сказали у вас нет сбережений. Хуёво чё...');
        break;
    }
    },
    chooseOptExpenses: function() {
        // for(let i = 1; i < 4; i++){
        //     let a = prompt('Статья необязательных расходов?');
    
        //     if(typeof(a) === 'string' && typeof(a) != null && a != ''){
        //         console.log('done');
        //         appData.optionalExpenses[i] = a;
        //     }else {
        //         console.log('bed');
        //         i--;
        //     }
        // }
    },
    chooseIncome: function() {
    // let items = 'sdfte, 12, hjk';
    // let items = prompt('Что приносит вам дополнительный доход? (перечислите через запятую)');
    // while (items == null) {
    //     items = prompt('Нахуя нажал "отменить"? Ответь на вопрос - что приносит тебе дополнительный доход?!');
    // }
    // let arr = items.split(', ');
    // let bulProv = true;
    // // console.log(arr);
    // for(let key in arr) {
    //     let prov = +arr[key];
    //     // console.log(prov);
    //     let x = !!prov;
    //     // console.log(x);
    //     let z = true;
    //     let y = (x == z);
    //     if (y === false && arr[key] != ' ' && arr[key] != '' && arr[key] != null && items != null) {
    //         console.log('ok');
    //         bulProv = bulProv*true;
    //     } else {
    //         console.log('hui');
    //         bulProv = bulProv*false;
    //     }
    // }
    //     console.log(bulProv);
    //     if (bulProv == 1) {
    //         appData.income = arr;
    //     } else {
    //         alert('введите только текстовые значения и только через запятую! Например: фриланс, подработка, продажи');
    //         appData.chooseIncome();
    //     }
    //     console.log(appData);

    //     appData.income.forEach(function(item, i, mass) {
    //         let nachSchetch = 1;
    //         alert('Способы доп. заработка: ' + (nachSchetch + i) + ' - ' + item);
    //     });

    //     appData.income.push(prompt('Ничего не забыл?'));

    }
};



    console.log('Наша программа включает в себя данные: ');
    for (let key in appData) {
        if (typeof(appData[key]) == 'function') {
            console.log('Метод: ' + key);
        } else {console.log(key);}
        
    }

    
// let i = 0;
// while (i < 2) {
//     let qw1 = prompt('Введите обязательную статью расходов в этом месяце'),
//         qw2 = prompt('Во сколько Вам обойдется ' + qw1 + '?');

//         appData.expenses[qw1] = qw2;
//         i++;
// }

    //  do{
    //     let qw1 = prompt('Введите обязательную статью расходов в этом месяце'),
    //     qw2 = prompt('Во сколько Вам обойдется ' + qw1 + '?');

    //     appData.expenses[qw1] = qw2;
    //     i++;
    //  } while (i < 2);




// let oneDay = appData.bujet / 30;
// appData.oneDay = oneDay;
// alert('Ваш дневной лимит равен ' + appData.oneDay);







// function qwBySaving() {
//     let qwSave = prompt('Скажите, у Вас есть сбережения?');
//     if (qwSave == 'yes' && typeof(qwSave) != null && qwSave != '') {
//         appData.savings = !!'true';
//         //здесь вызвать функцию расчета процентов
//         // raschProc();
//         let sber,
//         procSber;
//     while (isNaN(sber) || sber == '' || sber == null) {
//         sber = +prompt('Какая сумма находится на процентной ставке?');
//     }
//     while (isNaN(procSber) || procSber == '' || procSber == null) {
//         procSber = +prompt('Под какой годовой процент ёпт?');
//     }
//         appData.monthIncome = (sber*procSber/100)/12;
//         alert('Дружок, твой МЕСЯЧНЫЙ доход от бобла, которое лежит под процентами равен: ' + appData.monthIncome);
//         if (appData.monthIncome >= 2000){
//             alert('Братан, у тебя есть возможность нормально заработать');
//         } else {
//             alert('Братан, сорян, но ты не разбоготеешь...');
//         }

//     } else {
        
//         let xxx;
//         while (qwSave == xxx || qwSave == '') {
//             alert('вы не ответили на вопрос');
//             qwSave = prompt('Скажите, у Вас есть сбережения?');
//         }
//     }
//     while (qwSave == 'no') {
//         alert('Вы сказали у вас нет сбережений. Хуёво чё...');
//         break;
//     }
// }




// function raschProc() {
//     let sber,
//         procSber;
//     while (isNaN(sber) || sber == '' || sber == null) {
//         sber = +prompt('Какая сумма находится на процентной ставке?');
//     }
//     while (isNaN(procSber) || procSber == '' || procSber == null) {
//         procSber = +prompt('Под какой годовой процент ёпт?');
//     }
//         appData.monthIncome = (sber*procSber/100)/12;
//         alert('Дружок, твой МЕСЯЧНЫЙ доход от бобла, которое лежит под процентами равен: ' + appData.monthIncome);
//         if (appData.monthIncome >= 2000){
//             alert('Братан, у тебя есть возможность нормально заработать');
//         } else {
//             alert('Братан, сорян, но ты не разбоготеешь...');
//         }
// }