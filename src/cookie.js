/**

 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */
/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');
function filterCookiesList() {
    let tempObj = getCookies(),
        filteringName = filterNameInput.value;
    for (let cookiesName in tempObj) {
        if (!cookiesName.includes(filteringName) && !tempObj[cookiesName].includes(filteringName)) {
            delete tempObj[cookiesName];
        }
    }
    createTable(tempObj);
}
function getCookies() {
    if (!document.cookie) {
        
        return;
    } else {
    let splitedList = document.cookie.split('; '),
        resultList = splitedList.reduce((prev, next) => {
            
            let [name, value] = next.split('=');
            prev[name] = value;
            return prev;
        }, {});
    return resultList;
    }
}
function createTable(obj) {
    listTable.innerHTML = '';
    for (let indexName in obj) {
        let table = document.createElement('tr');
        table.innerHTML = `<td>${indexName}</td><td>${obj[indexName]}</td><td><button>Delete coockie</button></td>`;
        listTable.appendChild(table);
    }
}
filterNameInput.addEventListener('keyup', () => filterCookiesList());
addButton.addEventListener('click', () => {
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    filterCookiesList();
});
window.addEventListener('DOMContentLoaded', () => createTable(getCookies));
listTable.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        let deleteEl = e.target.parentNode.parentNode,
            currentName = deleteEl.firstElementChild.innerText,
            date = new Date(0);
        document.cookie = `${currentName}=; expires=${date.toUTCString()}`;
        this.removeChild(deleteEl);
    }
});