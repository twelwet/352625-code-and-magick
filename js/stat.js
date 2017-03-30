//stat.js
'use strict';

window.renderStatistics = function (ctx, names, times) {
  //Рисуем тень окна статистики
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  //Рисуем окно статистики
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  //Текст окна статистики
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var max = -1; //Переменная худшего времени

  //Находим худшее время, чтобы рассчитать шаг нормирования высоты гистограммы
  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeight = 150; //Задаем высоту гистограммы
  var histogramDistanceX = 0; //Переменная смещения по горизонтали между гистограммами
  var step = histogramHeight / max; //Рассчитываем величину шага нормирования для высот гисторгамм


  for (var i = 0; i < times.length; i++) {
    ctx.fillStyle = 'rgba(0, 0, 255, Math.random())'; //Почему не работает Math.random() ?
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgb(255, 0, 0)';
    }
    ctx.fillRect(180 + histogramDistanceX, 240, -40, -(times[i] * step)); //Рисуем гистограммы
    ctx.fillStyle = 'rgb(0, 0, 0)'; //Задаем цвет текста
    ctx.fillText(Math.round(times[i]), 140 + histogramDistanceX, 230 - times[i] * step); //Выводим времена игроков
    ctx.fillText(names[i], 140 + histogramDistanceX, 260); //Выводим имена игроков
    histogramDistanceX = histogramDistanceX + 90; //Увеличиваем шаг смещения по горизонтали между результатами
  }
}
