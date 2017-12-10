/* ДЗ 6.1 - Асинхронность и работа с сетью */
/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise(resolve => {
        setTimeout(() => { 
            resolve();
        }, 
        seconds * 1000);
    });
}
/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
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
export {
    delayPromise,
    loadAndSortTowns
};