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
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var WIZARD_EYES_COLOR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var WIZARD_FIREBALL_COLOR = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];
var WIZARD_QUANTITY = 4;

// Объявляем переменную, внутри которой находится DIV всплывающего окна с настройками мага
var userDialog = document.querySelector('.setup');

// Объявляем переменую, внутри которой находится DIV '.setup-open'
var userDialogOpen = document.querySelector('.setup-open');

// Объявляем переменую, внутри которой находится SPAN '.setup-close'
var userDialogClose = userDialog.querySelector('.setup-close');

// Объявляем переменную, внутри которой находится INPUT '.setup-user-name'
var userDialogSetupUserName = document.querySelector('.setup-user-name');

// Объявляем переменную, внутри которой находится пустой DIV списка похожих персонажей
var similarListElement = userDialog.querySelector('.setup-similar-list');

// Объявляем переменную, внутри которой находится TEMPLATE похожего персонажа
var similarWizardTemplate = document.getElementById('similar-wizard-template').content;

// Объявляем функцию генерации случайных данных
var getRandomValue = function (x) {
  return x[Math.floor(Math.random() * x.length)];
};

// Объявляем переменную-массив похожих персонажей
var wizards = new Array(WIZARD_QUANTITY);

// Заполняем в цикле переменную-массив похожих персонажей
// рандомными данными из соответствующих констант
for (var i = 0; i < wizards.length; i++) {
  wizards[i] = {
    name: getRandomValue(WIZARD_NAMES),
    surname: getRandomValue(WIZARD_SURNAMES),
    coatColor: getRandomValue(WIZARD_COAT_COLOR),
    eyesColor: getRandomValue(WIZARD_EYES_COLOR)
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

// Объявляем функцию заполнения блока DOM-элементами
var drawAllWizards = function () {
  var fragment = document.createDocumentFragment();
  for (i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

drawAllWizards();

// Объявляем функцию закрытия окна попап по нажатию на ESC
var onPopupEscPress = function (evt) {
  if (evt.keyCode === 27) {
    closePopup();
  }
};

// Объявляем функцию открытия окна попап
var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Объявляем функцию закрытия окна попап
var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Опишем реакцию блока '.setup-open' на клик мыши
userDialogOpen.addEventListener('click', function () {
  openPopup();
});

// Опишем реакцию блока '.setup-open' на нажатие ENTER на сфокусированном блоке '.setup-open-icon'
userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    openPopup();
  }
});

// Опишем реакцию блока '.setup-close' на клик мыши
userDialogClose.addEventListener('click', function () {
  closePopup();
});

// Опишем реакцию блока '.setup-close' на нажатие ENTER на сфокусированном блоке '.setup-close'
userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closePopup();
  }
});

// Остановим распространение события при нажатии на ESC, в случае фокуса на элементе '.setup-user-name'
userDialogSetupUserName.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
});

// Добавим в окно попап функционал изменения по клику мыши:
// 1) цвет плаща мага из набора 'WIZARD_COAT_COLOR';
// 2) цвет глаз мага из набора 'WIZARD_EYES_COLOR';
// 2) цвет фаербола из набора 'WIZARD_FIREBALL_COLOR'.

// Задаем необходимые переменные
var wizard = document.querySelector('.setup-wizard');
var wizardCoat = wizard.querySelector('.wizard-coat');
var wizardEyes = wizard.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

// 1)
wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getRandomValue(WIZARD_COAT_COLOR);
});

// 2)
wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getRandomValue(WIZARD_EYES_COLOR);
});

// 3)
wizardFireball.addEventListener('click', function () {
  wizardFireball.style.background = getRandomValue(WIZARD_FIREBALL_COLOR);
});

// Проведем валидацию ввода имени персонажа
userDialogSetupUserName.required = true;
userDialogSetupUserName.minLength = 2;
userDialogSetupUserName.maxLength = 50;
