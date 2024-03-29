/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */


/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */
// // так можно но не правильно
// poster.onclick = function() {
//     alert('ну и зачем ты нажимаешь просто так?');
// };

// правильно делать событие:


// poster.addEventListener('click', (e) => {
//     alert('ну и зачем ты нажимаешь просто так?');
//     console.log(e.target);
// });
// // // чтобы удалить фукнцию
// // const deleteElement = (e) => {
// //     e.targer.remove();
// // };
// // // и потомнаддо вызвать эту функция дл удаления
// // poster.addEventListener('click', deleteElement);
// poster.addEventListener('click', (e) => {
//     alert('перестань так делать');
//     console.log(e.type);
// });

'use strict';
document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const promoAdv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');


    addForm.addEventListener('submit', (event) => {
        event.preventDefault(); //отменяем стандартное поведение браузера

        let newFilm = addInput.value; //получаем фильм
        const favorite = checkbox.checked; //проверяем галочку в чекбоксе

        if (newFilm) { // обрезаем фильм если больше 21 букв
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log('Добавляем любимый фильм');
            }
            movieDB.movies.push(newFilm); // помещаем фильм в БД
            sortArr(movieDB.movies);
    
            createMovieList(movieDB.movies, movieList);
        } else {
            alert('Введите название фильма');
        }
        event.target.reset();

        }); 

    // // удаляем рекламу
    // promoAdv.forEach( item => {
    //     item.remove();
    // });
        const deleteAdv = (arr) => {
            arr.forEach(item => {
                item.remove();
            });
        };


    // // меняем текст внутри html (комедия на драму)
    // genre.textContent = 'Драма';
    // // меняем бэкраунд фото
    // poster.style.backgroundImage = 'url("img/bg.jpg")';
        const makeChanges = () => {
            genre.textContent = 'Драма';
            poster.style.backgroundImage = 'url("img/bg.jpg")';
        };
    // // удалили старый список просмотренных фильмов
    // movieList.innerHTML = '';
    // сортирует фильмы по алфавиту из массива (строки)
    const sortArr = (arr) => {
        arr.sort();
    };

    // movieDB.movies.sort();
    // // перебираем фильмы и помещаем

    function createMovieList (films, parent) {
        parent.innerHTML = '';
        sortArr(films);
        films.forEach ((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1}. ${film}
                    <div class="delete"></div>
                </li>
                `;
        });
        // Удаляем по нажатию на корзину фильм
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                // рекурсия, чтобы нумерация обновлялась при удалении
                createMovieList(films, parent);
            });
        });
    }

    deleteAdv(promoAdv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});


/* Задание на урок №1:

1) Создать переменную numberOfFilms и в неё поместить ответ от пользователя на вопрос:
'Сколько фильмов вы уже посмотрели?'

2) Создать объект personalMovieDB и в него поместить такие свойства:
    - count - сюда передается ответ на первый вопрос
    - movies - в это свойство поместить пустой объект
    - actors - тоже поместить пустой объект
    - genres - сюда поместить пустой массив
    - privat - в это свойство поместить boolean(логическое) значение false

3) Задайте пользователю по два раза вопросы:
    - 'Один из последних просмотренных фильмов?'
    - 'На сколько оцените его?'
Ответы стоит поместить в отдельные переменные
Записать ответы в объект movies в формате: 
    movies: {
        'logan': '8.1'
    }

Проверить, чтобы все работало без ошибок в консоли */



/* Задание на урок №2:

1) Автоматизировать вопросы пользователю про фильмы при помощи цикла

2) Сделать так, чтобы пользователь не мог оставить ответ в виде пустой строки,
отменить ответ или ввести название фильма длинее, чем 50 символов. Если это происходит - 
возвращаем пользователя к вопросам опять

3) При помощи условий проверить  personalMovieDB.count, и если он меньше 10 - вывести сообщение
"Просмотрено довольно мало фильмов", если от 10 до 30 - "Вы классический зритель", а если больше - 
"Вы киноман". А если не подошло ни к одному варианту - "Произошла ошибка"

4) Потренироваться и переписать цикл еще двумя способами*/

/* Задание на урок №3:
1) Первую часть задания повторить по уроку
2) Создать функцию showMyDB, которая будет проверять свойство privat. Если стоит в позиции
false - выводит в консоль главный объект программы
3) Создать функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос 
"Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив данных
genres
P.S. Функции вызывать не обязательно 

================практика из уроков===================
==================19 урок callback=================

function learnJS(lang, callback) {
    console.log(`Я учу: ${lang}`);
    callback()
}

function done() {
    console.log ('Выполняю уроки каждый день!');
}

learnJS ('JavaScript', done);
========конец 19 урока=========================

======================= 20 урок капаемся в options (for in)=========

const options = {
    name: 'test',
    width: 1024,
    height: 1024,
    colors: {
        border: 'black',
        bg: 'red'
    },
    // это функция, чтобы обьект что-то делал
    makeTest: function() {
        console.log('Test');
    }
};
options.makeTest();
// деструктуризаяия (вытащить свойства во вложенном обьекте)
const {border, bg} = options.colors;
console.log(border);
// ==== это мы колво ключей в обьекте видим console.log(Object.keys(options).length);


// перебираем каждое значение
for (let key in options) {
    // это условие, чтобы перебрать colors т,к там вложение
    if (typeof(options[key]) === 'object') {
         for (let i in options[key]) {
            console.log(`Свойство ${i} имеет значение ${options[key][i]}`);
         }
    } else {
        console.log(`Свойство ${key} имеет значение ${options[key]}`);
    }
}
=====================конец 20 урока=======================================

=====================начало 21 урока - Массивы и псевдомассивы======================================
const arr = [1, 32, 3, 6, 8];
arr.sort(compareNum);
console.log(arr);
// чтобы было по порядку именно цифры нужна функция:
function compareNum(a, b) {
    return a -b;
}


тут forEach
arr.forEach(function(item, i, arr){
    console.log(`${i}: ${item} внутри массива ${arr}`);
});

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
другой способ перебрать массив через of
for (let value of arr) {
    console.log(value);
} 
=====пробуем сорт
 const str = prompt("", "");
 const products = str.split("", "");
 products.sort();
 console.log(products.join('; '));
 ========конец 21 урока==========
=========начало 22 урока передача по ссылке или по значению,
spread оператор (es6-es9)===================================
 // шаблон функции
function copy(mainObj) {  // Функция для копирования обьекта
    let objCopy = {};

    let key;
    for (key in mainObj) {
        objCopy[key] = mainObj[key];   
    }

    return objCopy;
}
// функция закончилась
// ниже будет пример использования копии с помощью функции ( поверхостно )
const numbers = {
    a: 3,
    b: 5,
    c: 8
};

const newNumbers = copy(numbers);

newNumbers.a = 8;
console.log(numbers);
console.log(newNumbers);
// закончили

// еще один способ клонирования
const add = {
    d: 23,
    e: 9
};

const clone = Object.assign({}, add);
clone.e = 99;
console.log(add);
console.log(clone);
// закончили

// клонируем массивы еще один способ
const oldArray = ['a', 'b', 'c'];
const newArray = oldArray.slice();

newArray[2] = 'Я поменял с иp old';

console.log(newArray);
console.log(oldArray);
// закончили

//=== es6 оператор развороота 4ый способ
const video = ['youtube', 'vimeo', 'rutube'],
      blogs = ['wordpress', 'livejournal', 'blogger'],
      internet = [...video, ...blogs, 'vk', 'facebook'];

console.log(internet);
//пример сложнее и нагляднее
function log(a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
}
const num = [2, 5, 7];
log(...num);
// создание поверхностного копия обьекта 
const array = ['a', 'b'];
const newAarray = [...array];
newAarray[1] = 'я поменял b';
console.log(array);
console.log(newAarray);
// с обьектом все тоже самое {}
 ========конец 22 урока==========

============= // урок 23 Основы ООП ============
// старый пример наследния прототипа
// так можно создать много разных модальных окон, которые будут отличаться по ширине/высоте и тп
const solider = {  //это общий класс солдат
    health: 400,
    armor: 100,
    sayHello: function() {
        console.log('Здравия желаю!');
    }
};

const jonh = {  // это конкретный солдат
    health: 100
};
// это устрашевший формат
// jonh.__proto__ = solider; // здесь мы берем этого соладата сопостовляем прототипу общему классу
//  новый формат:
Object.setPrototypeOf(jonh, solider); 
jonh.sayHello(); // jonh может функцию из прототипа
console.log(jonh); // у него отображается 100 здоровья
console.log(jonh.armor); // так мы понимаем, что он получил еще и армор от прототипа

// чтобы делать на этапе создания обьекта, используем так: 
const steave = Object.create(solider);
console.log(steave.health);
===============конец 23 урока======================

===-----=====----Практика ч4=====----======------==
/* Задание на урок:

1) У нас уже есть рабочее приложение, состоящее из отдельных функций. Представьте, что
перед вами стоит задача переписать его так, чтобы все функции стали методами объекта personalMovieDB
Такое случается в реальных продуктах при смене технологий или подхода к архитектуре программы

2) Создать метод toggleVisibleMyDB, который при вызове будет проверять свойство privat. Если оно false - он
переключает его в true, если true - переключает в false. Протестировать вместе с showMyDB.

3) В методе writeYourGenres запретить пользователю нажать кнопку "отмена" или оставлять пустую строку. 
Если он это сделал - возвращать его к этому же вопросу. После того, как все жанры введены - 
при помощи метода forEach вывести в консоль сообщения в таком виде:
"Любимый жанр #(номер по порядку, начиная с 1) - это (название из массива)"
=-=-=-=-=-=-=-=-=-=-=-=Конец практики=-=-=-=-=-=-=-=-=-=-=-=-
==============начало 26 урока Динамическая типизация в JS=============
// преобразуем в строку
//1 метод String
console.log(typeof(String(null)));
console.log(typeof(String(4)));
//2 при сложении со строкой - получается строка
console.log(typeof(5 + ""));
// пример
const num = 5; 
console.log("Https://vk.com/catalog/" + num);

// в цифры
// 1 через оператор Number
console.log(typeof(Number("3")));
// 2 Через унарный +
console.log(typeof(+'5'));
// 3 
console.log(typeof(parseInt("15px", 10)));

// в булин ( логическое false/true)
// 1
// 0, "", null, undefined, NaN; - все это будет превращаться в false
// все остальное будет true
// пример
let switcher = null;
if (switcher) {
    console.log ( 'working...');
}   //без свитчера внизу ничего не срабтает
switcher = 1;
console.log ( 'working...');
=====================конец 26 урока==============
+++++++++++++++++++++DOM+++++++++++++++++++++++++
document.getElementById('') - получаение элемента через id
---
document.getElementsByTagName('') - получаем все элементы по тегу в виде псевдомассивов и
чтобы обратиться к конкретному в конец пишем [0] - указываем индекс кнопки или когда заходим испольваоть
и можем обратиться к нему отдельно, только в таком варианте можем изменять элементы
---
document.getElementsByClassName('') - получаем все элементы по классу и получаем псвевдомассивы

щас будут более современные методы
document.querySelectorAll(указываем селекутор-'.heart'); - он можем forEach
пример 
hearts.forEach(item => {
    console.log(item);
});
-----
document.querySelector('.heart')
достанет из класса только 1 элемент, самый первый попавший под сочитание
---
*/


'use strict';


const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: function() {
        personalMovieDB.count = +prompt ("Сколько фильмов вы уже посмотрели?", "");
        while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = +prompt ("Сколько фильмов вы уже посмотрели?", "");
        }
    },
    rememberMyFilms: function() {
        for (let i = 0; i < 2; i++) {
            const a = prompt('Один из последних просмотренных фильмов?', ""),
                  b = prompt('На сколько оцените его?', "");
        
            if (a != null && b != null && a != "" && b != "" && a.length < 50 ) {
                personalMovieDB.movies[a] = b;
                console.log('done');
            } else {
                console.log('error');
                i--;
            }    
        }
    },
    detectPersonalLevel: function() {
        if (personalMovieDB.count < 10) {
            console.log("Просмотрено довольно мало фильмов");
        } else if(personalMovieDB.count >=10 && personalMovieDB.count < 30) {
            console.log("Вы классический зритель");
        } else if(personalMovieDB.count >= 30) {
            console.log("Вы киноман");
        } else {
            console.log("Произошла ошибка");
        } 
    },
    showMyDB: function(hidden) {
        if (!hidden) {
            console.log(personalMovieDB);
        }
    },
    toggleVisibleMyDB: function() {
        if (personalMovieDB.privat) {
            personalMovieDB.privat = false;
        } else {
            personalMovieDB.privat = true;
        }
    },
    writeYourGenres: function() {
        for (let i = 1; i <= 3; i++) {
            let genre = prompt(`Ваш любимый жанр под номером ${i}`);

            if (genre === " " || genre == null) {
                console.log('Вы ввели некорректные данные или не ввели их вовсе');
                i--;
            } else {
                personalMovieDB.genres[i - 1] =  genre;
            }
        }

        personalMovieDB.genres.forEach((item, i) => {
            console.log(`Любимый жанр ${i + 1} - это ${item}`);
        });
    }
}; 


// personalMovieDB.start();

// personalMovieDB.rememberMyFilms();

// personalMovieDB.detectPersonalLevel();

// personalMovieDB.showMyDB(personalMovieDB.privat);

// personalMovieDB.writeYourGenres();

// personalMovieDB.toggleVisibleMyDB();

'use strict';

 const box = document.getElementById('box'),
       btns = document.getElementsByTagName('button'),
       circles = document.getElementsByClassName('circle'),
       hearts = document.querySelectorAll('.heart'),
       oneHeart = document.querySelector('.heart'),
       wrapper = document.querySelector('.wrapper');

 box.style.backgroundColor = 'blue';
 box.style.width = '500px';
 btns[1].style.borderRadius = '100px';
 
//  for ( let i = 0; i < hearts.length; i++) {
//     hearts[i].style.backgroundColor = 'orange';
//  }
//так мы перебираем все элементы в массиве
hearts.forEach(iteam => {
   iteam.style.backgroundColor = 'orange';
});
// так мы создаем элементы в JS
const div = document.createElement('div');
// Работа с css классами 
div.classList.add('black');
// // щас будем размежать его в на страницу деревом DOM
// например в конец в body
document.body.append(div);
// // или обращаемся к определенному классу куда поместить элемент
// wrapper.append(div); 
// // чтобы удалить
// circles[0].remove(); //( удалили кружочек )
// //чтобы заменить
// hearts[0].replaceWith(circles[0]); 
//щас мы вставим текст с заголовком можно и другое
div.innerHTML = '<h1>Hello world</h1>';
//  а щас просто текст
// div.textContent = 'Hello';

div.insertAdjacentHTML('afterend', '<h2>Hello</h2>');


for ( let i = 2; i <= 10; i += 2) {
      console.log(i);
} 

// NEW
// ====================== УРОК 37 classlist и делегирование событий ==========================

const btns = document.querySelectorAll('button'),
      wrapper = document.querySelector('.btn-block'); // берем родительский серий фон всех кнопок

btns[0].addEventListener('click', () => { // по клику проверяем есть ли класс ред
    if (!btns[1].classList.contains('red')) { // если нет класса ред
        btns[1].classList.add('red'); // то мы его добавляем
    } else { // если класс ред есть
        btns[1].classList.remove('red'); // то мы его удаляем по нажатию
    }
}); 
// ДЕЛЕГИРОВАНИЕ 
wrapper.addEventListener('clock', (event) => { // берем родительский элемент всех кнопок
    if (event.target && event.target.tagName == "BUTTON") { // проверяем куда нажмем, например элемент button
        console.log ('hello'); // если нажимаем на элемент button то у нас отображается hello
    }
});

// или проверяем по имени класса
wrapper.addEventListener('clock', (event) => { // берем родительский элемент всех кнопок
    if (event.target && event.target.classList.contains('blue')) { // проверяем куда нажмем, например элемент button
        console.log ('hello'); // если нажимаем на элемент button то у нас отображается hello
    }
});

// ==================УРОК 39 скрипты и время их выполнения setTimeout и setinterval + анимация==========================

const timeId = setTimeout(function() {
    console.log('hello');
}, 2000); // должна запустится в определенное время( в милисекунды)

// вот так тоже можно, но не часто используется
const timeId = setTimeout(function(text) {
    console.log(text);
}, 2000, 'hello');

// допустим
// есть функция logger и если хотим через какое-то время ее вызвать то пишем так:
function logger (){
    console.log('hello');
}
const timeId3 = setTimeout(logger, 5000);


//простая функция анимации там на видео квадратик уходит в другой угол
function myAnimation() {
    const elem = document.querySelector('.box'); // берем квадрат
    let pos = 0; // создаем переменную позицию и задаем ей изначально 0

    const id = setInterval(frame, 10); // здесь мы задали функцию движения и время как часто она вызывается
    function frame() {
        if (pos == 300) { // это позиция куда нам нужно прийти
            clearInterval(); // и закончиться анимация
        } else { // если квадратик не достиг 300
            pos++; // то прибавляем 1
            elem.style.top = pos + "px"; // и прибавляем уже в css 1 + px = 1px с интервалом 10мсекунд
            elem.style.left = pos + "px";// и прибавляем уже в css 1 + px = 1px с интервалом 10мсекунд
        }
    }
}
    btn.addEventListener('click', myAnimation); // ну и вызываем функцию по клику на обьект

// ===============================урок 40 работа с датами=======================================


let start = new Date();

for(let i = 0; i < 100000; i++) {
    let some = i ** 3;
}

let end = new Date();

console.log(`Цикл отработал за &{end - start} миллисекунд`);


// =======================42 урок параметры документа, окна и работа с ними=======================

const width = box.clientWidth; // получаем ширину окна/элемена и прочее
const height = box.clientHeight; // получаем высоту окна/элемента и прочее
// в закладках есть список всех элементов наглядно, как мы можем брать 

console.log(box.getBoundingClientRect());// так мы можем посмотреть координаты элементы 

// ============================45 Функции-конструкторы==================================================

const num = new Number(3);
console.log(num);  // мы получим Number с value 3 это oldcode

// используется когда шаблонизация. ( юзеры, карточки и прочее в es5(!!!))
function User(name, id) {
    this.name = name; // у каждого пользователя будет уникальное имя
    this.id = id;// у каждого пользователя будет уникальное id
    this.human = true;
    this.hello = function() {
        console.log(`Привет ${this.name}, твой id - ${this.id}`);
    };
}
// всегда можно добавить доп.аргумент через prototype
User.prototype.exit = function(){
    console.log(`Пользователь ${this.name} под №id - ${this.id} ушел.`);
};

const anton = new User('Антон', 25); 
const olena = new User ('Алена', 22);

anton.hello();
olena.hello();

anton.exit();
olena.exit();

console.log(anton);
console.log(olena);

// ================================== 46 урок контекст вызова. This =============================================================

// Функция может вызываться 4-мя способами
// 1) Обычная функция: this = window, но если use strict - undefined
// 2) контекст у методов обьекта это - сам обьект 
// 3) this в конструкторах и классах - это новый экземпляр обьекта
// 4) Ручная привязка this: call, apply, bind

//1):=====
function showThis() {
    console.log(this);  // в строгом режиме (use strict) так  не работает, но если выбрать без него
    // то в console будет window, если вызвать в строгом режиме, значение будет -undefined
}
showThis();
// ====
// задача
function showThis(a, b) {
    console.log(this);
    function sum() {
        console.log(this);
        return this.a+this.b; // чтобы sum сработало и все суммировалось, надо убрать this в ретурне
    }
}
showThis(2, 5); 
// =======


// 2) контекст у методов обьекта это - сам обьект 
const obj = {
    a:20,
    b:15,
    sum: function() {
        console.log(this);
    }
};
obj.sum(); // вот так будет раскрывать конекст обьектов.

// если вызвать функцию не в обьекте, а после, то уже будет undefined

const obj = {
    a:20,
    b:15,
    sum: function() {
        function shout() {
            console.log(this);
        }
        shout();
    }
};
obj.sum();  // вот в этом примере мы вызываем this в функции уже,и там будет undefined
// ============
// 3) this в конструкторах и классах - это новый экземпляр обьекта
function User(name, id) {
    this.name = name; // у каждого пользователя будет уникальное имя
    this.id = id;// у каждого пользователя будет уникальное id
    this.human = true;
}
let petr = new User('Петр', 45);
//=============
// 4) Ручная привязка this: call, apply, bind
function sayName() {
    console.log(this);
    console.log(this.name + surname);
}
const user = {
 name: 'Taylor'
};

sayName.call(user, 'Smith'); // 1-ый вариант ручного присвоения (smith) - это surname на 758 сторочке.
sayName.apply(user, ['Smith']); //2-ой вариант вариант, здесь отличается только синтаксис, что smith надо передавтаь
//как массив

// 3-ий вариант, в виде новой функции
function count(num) {
    return this*num;
}
const double = count.bind(2); // 2-ока передается в this в функции count
console.log(double(3)); // в этом случае будет 6 
//=============
// как пример использования, у нас есть html с пустой кнопкой 
const btn = document.querySelector('button');

btn.addEventListener('click', function() {
    console.log(this); // с каждым нажатием, мы будем получать кнопку в консоль
    // т.е. контекст вызова будет сам элемент
});
// т.е. чтобы нам допустим поменять/присвоить background кнопки по клику мы делаем:
btn.addEventListener('click', function() {
    this.style.backgroundColor = 'red'; 
}); // тоже самое можно было сделать через event target
// == 
// со стрелочными функциями есть особенность, фишка - у нее нет своего контекстного вызова
// она ( стрелочная функция ) будет брать у своего родителя
// вот как на коде это выглядит:
const obj = {
    num: 5,
    sayNumber: function() {
        const say = () => {
            console.log(this); // нам уже известно,что если вызываем внутри обычной функции, то this не будет отображать обьект будет - undefind, а в стрелочной функции, она ссылатся на родителя, тем самым мы получаем обьект.
        };

        say();
    }
};
obj.sayNumber();
// ==========================================конец 46 урока====================================================
// ========================================== 47 урок классы (ES6)====================================================

// как создавать:
class Rectangle { // название класса всегда с большой буквы 
    constructor(height, width) { //  в круглых скобках мы указываем, какие аргументы приходят из вне при создании экземпляра класса
        this.height = height; // this будет обращать к экземпляру нового созданного обьекта, к каждому отдельному квадрату
        this.width = width; // т.е. эта ширина этого экземпляра, будет равна ширине в конструкторе
    }
//дальше рассматриваем методы, например:
    calcArea() { // считаем площадь квадрата
        return this.height * this.width;
    }
}

// создаем еще один класс, допустим цветные прямоугольники, и делаем наследование к первому классу Rectangle ( с помощью extends )
class ColoredRectangleWithText  extends Rectangle {
    constructor(height, width, text, bgColor) {
        super(height, width); // это свойство вызывает все аргументы у родителя, чтобы их не копировать в ручную (this.height = height, this.width = width ) и в скобках можно указать те свойства, которые мы хотим исопльзовать
        this.text = text;
        this.bgColor = bgColor;
    }

    showMyProps() {
        console.log(` Текст: ${this.text}, цвет: ${this.bgColor}`);
    }
}
// ====это к классу Rectangle
const square = new Rectangle(10, 10); // так мы используем классы, создаем обьект, туда помещяем класс через new и передаем значения
const long = new Rectangle(20, 100); // еще один создаем обьект уже с другими обьектами

console.log(square.calcArea()); // получаем результат 100 едениц. 

console.log(long.calcArea()); // получаем результат 2000 едениц. 
//====
//===ниже ко второму классу ColoredRectangleWithText

const div = new ColoredRectangleWithText(25, 10, 'Hello World', 'red');
div.showMyProps(); // в консоле получаем Текст: Hello World, цвет: red
console.log(div.calcArea()); // это мы унаследовали от родителя класса и получили в консоле 250

//подитог, у нас есть концепция (шаблон в нашем случае) и у нас есть экземпляры, которые созданы....
// на основе этой концепции(шаблона)
//=======
// ==========================================конец 47 урока====================================================
///========================49 урок Rest оператор и параметры по умлочанию (ES6)==================

const log = function(a, b, ...rest ) { // ...rest - он формирует отдельные сущности вмассив из всего, что в него входит.
    console.log(a, b, rest);
}

log('basic', 'rest', 'operator', 'usage'); // получаем в консоле basic rest [ 'operator', 'usage' ] рест оператор...
// собрал отдельные сущности в массив 

function calcOrDouble(number, basis) {
    console.log(number * basis);
}

calcOrDouble(3,5); // получим 15
// но если не будет второго аргумента, будет ошибка, поэтому мы можем настроить функцию так, чтобы подставлялся аргумент автоматически в случае его отсутствия 

function calcOrDouble(number, basis ) {
    basis = basis || 2; // до стандарта ES6 использовался этот метод, т.е. Басис или 2 
    console.log(number * basis);
}
calcOrDouble(3); // получаем 6

// в стандарте ES6 все стало проще:
function calcOrDouble(number, basis = 2) { // указываем параметр по умлочанию при обьявления функции
    console.log(number * basis);
}
calcOrDouble(3); // получаем 6
// далее мы применили это в проекте Food 
// ==========================================конец 49 урока====================================================
// ==========================================51 урок JSON ====================================================

const persone = {
    name: 'Anton',
    tel: '+79167781876'
};

console.log(JSON.stringify(persone)); // получаем {"name":"Anton","tel":"+79167781876"}
//в json главное правило, что все сущности должны быть в двойных ковьичках.

//а теперь обратная ситуация, когда с сервера приходит json и его нам надо использовать
//делается это с помощью parse
const persone = {
    name: 'Anton',
    tel: '+79167781876'
};

console.log(JSON.parse(JSON.stringify(persone))); // получаем { name: 'Anton', tel: '+79167781876' }


//разбираем глубокие копии.
const persone = {
    name: 'Anton',
    tel: '+79167781876',
    parents: {
        mom: 'Olga',
        dad: 'Sergey'
    }
};

const clone = JSON.parse(JSON.stringify(persone)); // создаем клон
//которые совершенно не зависит от первоначального обьекта.

clone.parents.mom = 'Olga Shimarova';
console.log(persone); // parents: { mom: 'Olga', dad: 'Sergey' }
console.log(clone); // parents: { mom: 'Olga Shimarova', dad: 'Sergey' }
// в итоге мы получили 2-а разных обьекта  с помощью JSON.
// ==========================================конец 51 урока====================================================
// ====================================52 урок AJAX и общение с сервером ======================================
/* в уроке дан файл html где есть два окошка для конвертора валют  rub на usd
 и current.json:
 {
    "current": {
        "usd": 74
    }
}
*/
// получаем дом элементы

const inputRub = document.querySelector('#rub'),
      inputUsd = document.querySelector('#usd');

inputRub.addEventListener('input', () => { // берем обработчик события input который срабатывает при вводе данных
    const request = new XMLHttpRequest(); // создаем шаблон запроса через старый метод XMLHttpRequest
//теперь когда мы создали экземпляр такого класса, добавляем методы и события
//методы:
request.open('get', 'js/current.JSON'); // этот метод собирает настройки, которые помогут сделать запрос и он может принимать след аргументы:
// request.open(method, url, async, login, pass);
request.setRequestHeader('Content-type', 'application/json; charset=urf-8'); // когда отправляем запрос мы должны..
//указать что именно отправляем и поэтому добавляем метод setRequestHeader где указываем что это контен. 
request.send(); // отправляем запрос

request.addEventListener('readystatechange', () =>{ // подробнее про событие ниже, так же можно и через load сделать, тогда нам не нужен будет readyState т.к. он не будет отслеживать
 if (request.readyState === 4 && request.status === 200) { // если запрос успешно завершился
    console.log(request.response); // если все ок, то  выводим результат в консоль и получаем там результат с сервера (json)
    // и нам надо перевести его в обычный обьект, что попестить результат в окошко usd:
    const data = JSON.parse(request.response); // переводим его в обычный javaScript обьект, который можем использовать
    // теперь расчитываем курс валют на основании что ввел пользователь и какой ответ мы получили от сервера
    inputUsd.value = (+inputRub / data.current.usd).toFixed(2); // сконвентировали резлуьтат (toFixed - округляет и указываем сколько кол-во цифр после запятой)
 } else { // не стоит забывать, что необходимо сообщить пользователю, если пойдет что-то не так - надо выводить окно об ошибки
    inputUsd.value = "Что-то пошло не так"; // выводим сообщение, если будет какая-то ошибка.
 }

});
// после этих трех методов мы отправили запрос и теперь ниже свойства.
/*свойства бывают:
status - показывает статус от нашего запроса (404, 200, 0, 403 и т.д. на вики есть все статусы.)
statusText - это тоже самое, только текстовое описание статуса
response - здесь лежит ответ от сервера- то что заложил бэкнд разработчик
readyState - содержит текущее состояние нашего запроса, от 0-4 , где:
        0 - unsent - обьект был создан. Метод open() еще не вызывался.
        1 - opened - Метод open() был вызван.
        2 - HEADERS_RECEIVED - Метод send() был вызван, доступны заголовки (headers) и статус
        3 - LOADING - Загрузка; responseText содержит частичные данные.
        4 - Done - операция полностью завершена
        с помощью нео мы будем строить дальнейшие события, такие как:
readystatechange (его использовали выше в 938 строчке) это событие отслеживает статус готовности нашего запроса
в данный текущий момент, ведь запрос может задержаться по разным причинам и нам надо отслеживать статус

*/



});

