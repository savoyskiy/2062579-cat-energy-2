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
let exampleSliderWidth = 280; // ширина блока слайдера (280 для мобильной версии)
const exampleSlider = document.querySelector('.js-example-slider'); // блок слайдера
const exampleBefore = exampleSlider.querySelector('.js-example-before'); // блок до
const exampleAfter = exampleSlider.querySelector('.js-example-after'); // блок после
const exampleDivider = exampleSlider.querySelector('.js-example-divider'); // разделитель
let screenWidth = window.innerWidth; // ширина экрана

const setSliderStyles = () => { // функция установки значения инлайн-стилей слайдера
  if (screenWidth < 768) {
    exampleDivider.style.left = '138px';
    exampleBefore.style.width = '140px';
    exampleAfter.style.width = '140px';
    exampleSliderWidth = 280;
  }
  if (screenWidth >= 768) {
    exampleDivider.style.left = '278px';
    exampleBefore.style.width = '280px';
    exampleAfter.style.width = '280px';
    exampleSliderWidth = 560;
  }
};

setSliderStyles(); // устанавливаем инлайн-стили (необходимо так же для корректной перезагрузки страницы)
let exampleSliderRect = exampleSlider.getBoundingClientRect(); // определяем размер блока и его координаты относительно вьюпорта

const onMouseMoveResizeSlider = (event) => { // функция изменения слайдера
  const newPositionDivider = event.clientX - exampleSliderRect.left; // координата-Х передвинутого разделителя внутри блока
  if (newPositionDivider >= 0 && newPositionDivider <= exampleSliderWidth) { // ограничиваем изменение сладера шириной блока
    exampleDivider.style.left = `${newPositionDivider}px`; // изменяем инлайн-значение положения разделителя
    exampleBefore.style.width = `${newPositionDivider}px`; // изменяем ширину картинки до
    const newExampleAfterWidth = exampleSliderWidth - newPositionDivider; // определяем необходимую ширину картинки после
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

window.addEventListener('resize', () => { // на случай изменения размера окна переписываем:
  screenWidth = window.innerWidth; // размер экрана
  setSliderStyles(); // инлайн-стили
  exampleSliderRect = exampleSlider.getBoundingClientRect(); // размер блока и координаты
});
