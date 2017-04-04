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
var similarWizardTemplate = document.getElementById('similar-wizard-template').content;

// Объявляем функцию генерации случайных данных
var getRandomValue = function (x) {
  return x[(Math.random() * (x.length - 1)).toFixed(0)];
};

// Объявляем переменную-массив, которая будет содержать четырех магов
var wizards = [];

// Объявляем переменные-объекты по количеству магов
// [ВОПРОС] Что-то мне подсказывает, что здесь можно органичиться одной переменной,
// например, 'wizard = {};', а далее использовать цикл, подскажешь?
var wizard1 = {};
var wizard2 = {};
var wizard3 = {};
var wizard4 = {};

// [ВОПРОС] Как же здесь применить цикл?
wizard1.name = getRandomValue(WIZARD_NAMES);
wizard1.surname = getRandomValue(WIZARD_SURNAMES);
wizard1.coatColor = getRandomValue(WIZARD_COAT_COLOR);
wizard1.eyesColor = getRandomValue(WIZARD_EYES_COLOR);
wizards.push(wizard1);

wizard2.name = getRandomValue(WIZARD_NAMES);
wizard2.surname = getRandomValue(WIZARD_SURNAMES);
wizard2.coatColor = getRandomValue(WIZARD_COAT_COLOR);
wizard2.eyesColor = getRandomValue(WIZARD_EYES_COLOR);
wizards.push(wizard2);

wizard3.name = getRandomValue(WIZARD_NAMES);
wizard3.surname = getRandomValue(WIZARD_SURNAMES);
wizard3.coatColor = getRandomValue(WIZARD_COAT_COLOR);
wizard3.eyesColor = getRandomValue(WIZARD_EYES_COLOR);
wizards.push(wizard3);

wizard4.name = getRandomValue(WIZARD_NAMES);
wizard4.surname = getRandomValue(WIZARD_SURNAMES);
wizard4.coatColor = getRandomValue(WIZARD_COAT_COLOR);
wizard4.eyesColor = getRandomValue(WIZARD_EYES_COLOR);
wizards.push(wizard4);

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

// Объявляем функцию заполнения блока DOM-элементами
var drawAllWizards = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

drawAllWizards();
