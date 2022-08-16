let name = document.querySelector('#name');
let price = document.querySelector('#price');
let amount = document.querySelector('#amount');
let add = document.querySelector('#add');
let table = document.querySelector('#table');
let total = document.querySelector('#total');

// Создаём строку таблицы
add.addEventListener('click', function () {
    let tr = document.createElement('tr');

    allowEdit(createCell(tr, name.value, 'name'));
    allowEdit(createCell(tr, price.value, 'price'));
    allowEdit(createCell(tr, amount.value, 'amount'));
    createCell(tr, price.value * amount.value, 'cost');
    // Обработчик удаления строки
    createCell(tr, 'удалить', 'remove')
        .addEventListener('click', function () {
            this.parentElement.remove();
            recountTotal();
        })

    table.appendChild(tr);
    recountTotal(); // пересчитаем общую сумму
});


// Создаём ячейку таблицы
function createCell(tr, value, name) {
    let td = document.createElement('td');
    td.textContent = value;
    td.classList.add(name);
    tr.appendChild(td);
    return td;
}

// Пересчитываем общую стоимость продуктов
function recountTotal() {
    let costs = table.querySelectorAll('.cost');

    if (costs) {
        let count = 0;
        for (let i = 0; i < costs.length; i++) {
            count += +costs[i].textContent;
        }
        total.textContent = count
    }
}

// Редактирование ячейки
function allowEdit(td) {
    td.addEventListener('dblclick', function () {
        let text = td.textContent
        td.textContent = '';

        let input = document.createElement('input');
        input.value = text;
        input.focus();
        td.appendChild(input);

        input.addEventListener('keydown', function (e) {

            if (e.key == 'Enter') {
                td.textContent = this.value;

                if (td.classList.contains('price') || td.classList.contains('amount')) {
                    let parent = td.parentElement;
                    let price = parent.querySelector('.price');
                    let amount = parent.querySelector('.amount');
                    parent.querySelector('.cost').textContent = price.textContent * amount.textContent;
                    recountTotal(); // пересчитаем общую сумму
                }
            }
        })
    });
}