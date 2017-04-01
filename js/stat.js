// stat.js
'use strict';

window.renderStatistics = function (ctx, names, times) {
  // Рисуем тень окна статистики
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  // Рисуем окно статистики
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  // Текст окна статистики
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  // Объявляем функцию, которая ищет в массиве times[i] худшее время прохождения игры
  var searchWorseTime = function () {
    var max = -1;
    for (var i = 0; i < times.length; i++) {
      var time = times[i];
      if (time > max) {
        max = time;
      }
    }
    return max;
  };

  // Задаем высоту гистограммы
  var histogramHeight = 150;

  // Рассчитываем величину шага нормирования для высот гисторгамм
  var step = histogramHeight / searchWorseTime();

  // Объявляем функцию получения случайного цвета гисторгаммы
  var getRandomColor = function (i) {
    var randomTransparency = Math.random().toFixed(1);
    ctx.fillStyle = 'rgba(0, 0, 255,' + randomTransparency + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgb(255, 0, 0)';
    }
    return ctx.fillStyle;
  };

  // Объвляем функцию отрисовки гистограммы
  var drawHistogram = function (histogramDistanceX, i) {
    return ctx.fillRect(180 + histogramDistanceX, 240, -40, -(times[i] * step));
  };

  // Объявляем функцию отрисовки текста гистограммы
  var writeText = function (histogramDistanceX, i) {
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText(Math.round(times[i]), 140 + histogramDistanceX, 230 - times[i] * step);
    ctx.fillText(names[i], 140 + histogramDistanceX, 260);
  };

  // Объявляем переменную смещения гистограмм по оси Х
  var histogramDistanceX = 0;

  // Запускаем в цикле три ранее объявленные функции
  for (var i = 0; i < times.length; i++) {
    getRandomColor(i);
    drawHistogram(histogramDistanceX, i);
    writeText(histogramDistanceX, i);
    histogramDistanceX += 90;
  }

};
