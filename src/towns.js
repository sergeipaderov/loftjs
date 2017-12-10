/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */
/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
    
    return new Promise(resolve => {
        let req = new XMLHttpRequest();
    
        req.responseType = 'json';
        req.open('GET', url);
        req.send();
        req.addEventListener('load', () => {
            let loadList = req.response;
    
            resolve(sortList(loadList));
        });
    });
    function sortList(loadList) {
        if (Array.isArray(loadList)) {
            let result = loadList.sort((previousCity, nextCity) => {
                if (previousCity.name > nextCity.name) {
                    return 1;
                } else if (previousCity.name < nextCity.name) {
                    return -1;
                } 
                return 0;
                
            });
            return result;
        }
        throw new Error ('loadList is not a array');
        
    }
}
/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    let fullStr = full.toLowerCase(),
        subStr = chunk.toLowerCase();
    return (fullStr.indexOf(subStr) !== -1) ? true : false;
}
let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
/* И тут я создал Франкинштейна... ..."It is aliiiiiive!!!"... */
/* В общем, он работает, но прочитать я это уже сам не могу, а трогать боюсь, 
так как второй раз чудо созидания не произойдет... */
(function filterFunc() {
    let filterList;
    function dispBlock() {
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'block';
    }
    loadTowns()
        .then(loadList => {
            dispBlock();
            filterList = loadList;
            filterInput.addEventListener('keyup', () => {
                let value = filterInput.value.trim();
                
                filterResult.innerHTML = '';
                
                if (value) {
                
                    for (let i = 0, length = filterList.length; i < length; i++) {
                        if (isMatching(filterList[i].name, value)) {
                            let showingDiv = document.createElement('div');
                
                            showingDiv.textContent = filterList[i].name;
                            filterResult.appendChild(showingDiv);
                        }
                    }
                }
            });
        })
        .catch( () => {
            
            let button = document.createElement('button'),
                infoDiv = document.createElement('div');
            infoDiv.textContent = 'Не удалось загрузить города ';
            infoDiv.style.color = 'darkred';
            button.textContent = 'Повторить';
            filterResult.appendChild(infoDiv);
            filterResult.appendChild(button);
            button.addEventListener('click', () => {
                filterResult.innerHTML = '';
                loadingBlock.style.display = 'block';
                filterBlock.style.display = 'none';
                filterFunc();
            });
            dispBlock();
        });   
})();
export {
    loadTowns,
    isMatching
};