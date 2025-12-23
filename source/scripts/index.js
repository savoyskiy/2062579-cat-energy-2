/* в этот файл добавляет скрипты*/
/* меню */
const mainHeaderNavigation = document.querySelector('.main-header__navigation');
/* кнопка меню */
const mainHeaderButton = document.querySelector('.main-header__button');

/* реализация меню без JS */
mainHeaderNavigation.classList.remove('main-header__navigation--no-js');
mainHeaderButton.classList.remove('main-header__button--no-js');

/* открытие/закрытие меню */
mainHeaderButton.addEventListener('click', () => {
  mainHeaderNavigation.classList.toggle('main-header__navigation--hidden');
  mainHeaderButton.classList.toggle('main-header__button--open');
});

/* оживление слайдера до/после */
const EXAMPLE_SLIDER_WIDTH = 560; // ширина блока слайдера
const exampleSlider = document.querySelector('.js-example-slider'); // блок слайдера
const exampleBefore = exampleSlider.querySelector('.js-example-before'); // блок до
const exampleAfter = exampleSlider.querySelector('.js-example-after'); // блок после
const exampleDivider = exampleSlider.querySelector('.js-example-divider'); // разделитель

const exampleSliderRect = exampleSlider.getBoundingClientRect(); // определяем размер блока и его координаты относительно вьюпорта

const onMouseMoveResizeSlider = (event) => { // функция изменения слайдера
  const newPositionDivider = event.clientX - exampleSliderRect.left; // координата-Х передвинутого разделителя внутри блока
  if (newPositionDivider >= 0 && newPositionDivider <= EXAMPLE_SLIDER_WIDTH) { // ограничиваем изменение сладера шириной блока
    exampleDivider.style.left = `${newPositionDivider}px`; // изменяем инлайн-значение положения разделителя
    exampleBefore.style.width = `${newPositionDivider}px`; // изменяем ширину картинки до
    const newExampleAfterWidth = EXAMPLE_SLIDER_WIDTH - newPositionDivider; // определяем необходимую ширину картинки после
    exampleAfter.style.width = `${newExampleAfterWidth}px`; // изменяем ширину картинки после
  }
};

const onMouseDownStartResizeSlider = () => { // функция установки обработчика на блок слайдера
  exampleSlider.addEventListener('mousemove', onMouseMoveResizeSlider);
};

const onMouseUpEndResizeSlider = () => { // функция удаления обработчика на блок слайдера
  exampleSlider.removeEventListener('mousemove', onMouseMoveResizeSlider);
};

exampleDivider.addEventListener('mousedown', onMouseDownStartResizeSlider); // на нажатие мыши ставим обработчик
exampleDivider.addEventListener('mouseup', onMouseUpEndResizeSlider); // на отпускание мыши удаляем обработчик
