// setup.js
'use strict';

// Задаем константы
var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var WIZARD_COAT_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rbg(56, 159, 117)',
  'rbg(215, 210, 55)',
  'rbg(0, 0, 0)'
];
var WIZARD_EYES_COLOR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

// Объявляем переменную, внутри которой находится DIV всплывающего окна с настройками мага
var userDialog = document.querySelector('.setup');

// Делаем DIV с настройками мага видимым, удаляя класс 'hidden'
userDialog.classList.remove('hidden');

// Объявляем переменную, внутри которой находится пустой DIV списка похожих персонажей
var similarListElement = userDialog.querySelector('.setup-similar-list');

// Объявляем переменную, внутри которой находится TEMPLATE похожего персонажа
// [ВОПРОС] Почему у TEMPLATE в отличии от DIV нужно добавлять в конце '.content'?
var similarWizardTemplate = document.getElementById('similar-wizard-template').content;

// Объявляем переменную-массив c 4 пустыми элементами
var wizards = new Array(4);

// Запускаем цикл заполнения переменной-массива объектами
for (i = 0; i < wizards.length; i++) {
  wizards[i] = {
    // Ключи объектов заполняются рандомными значениями из соответствующих констант
    // [ВОПРОС] Подскажи как реализовать заполнение рандомными значениями ключей объекта с помощью функции?
    name: WIZARD_NAMES[(Math.random() * (WIZARD_NAMES.length - 1)).toFixed(0)],
    surname: WIZARD_SURNAMES[(Math.random() * (WIZARD_SURNAMES.length - 1)).toFixed(0)],
    coatColor: WIZARD_COAT_COLOR[(Math.random() * (WIZARD_COAT_COLOR.length - 1)).toFixed(0)],
    eyesColor: WIZARD_EYES_COLOR[(Math.random() * (WIZARD_EYES_COLOR.length - 1)).toFixed(0)]
  };
}

// Объявляем функцию создания DOM-элемента похожего персонажа
var renderWizard = function (wizard) {
  // Объявляем переменную, в которую клонируем шаблон похожего героя
  var wizardElement = similarWizardTemplate.cloneNode(true);
  // Задаем имя персонажа, цвет мантии, цвет глаз
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};
// Объявляем переменную, в которую потом вставим много DOM-элементов
var fragment = document.createDocumentFragment();
// Запускаем цикл вставки 4-х шаблонов похожих героев в переменную 'fragment'
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
// Добавляем содержимое 'fragment' в DIV 'setup-similar-list'
similarListElement.appendChild(fragment);

// Делаем DIV с похожими героями видимым, удаляя класс 'hidden'
userDialog.querySelector('.setup-similar').classList.remove('hidden');
