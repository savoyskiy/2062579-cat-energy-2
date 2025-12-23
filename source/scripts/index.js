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

const SCREEN_WIDTH = {
  TABLET: 768,
  DESKTOP: 1440
};
const EXAMPLE_SLIDER_STYLES = {
  DIVIDER: { // положение левого края разделителя
    MOBILE: '138px',
    TABLET: '278px'
  },
  PICTURES: { // ширина изображений
    MOBILE: '140px',
    TABLET: '280px'
  },
  SLIDER: { // ширина всего блока слайдера
    MOBILE: 280,
    TABLET: 560
  }
};
let exampleSliderWidth = EXAMPLE_SLIDER_STYLES.SLIDER.MOBILE; // ширина блока слайдера (280 для мобильной версии)
const exampleSlider = document.querySelector('.js-example-slider'); // блок слайдера
const exampleBefore = exampleSlider.querySelector('.js-example-before'); // блок до
const exampleAfter = exampleSlider.querySelector('.js-example-after'); // блок после
const exampleDivider = exampleSlider.querySelector('.js-example-divider'); // разделитель
let screenWidth = window.innerWidth; // ширина экрана

const setSliderStyles = () => { // функция установки значения инлайн-стилей слайдера
  if (screenWidth < SCREEN_WIDTH.TABLET) {
    exampleDivider.style.left = EXAMPLE_SLIDER_STYLES.DIVIDER.MOBILE;
    exampleBefore.style.width = EXAMPLE_SLIDER_STYLES.PICTURES.MOBILE;
    exampleAfter.style.width = EXAMPLE_SLIDER_STYLES.PICTURES.MOBILE;
    exampleSliderWidth = EXAMPLE_SLIDER_STYLES.SLIDER.MOBILE;
  }
  if (screenWidth >= SCREEN_WIDTH.TABLET) {
    exampleDivider.style.left = EXAMPLE_SLIDER_STYLES.DIVIDER.TABLET;
    exampleBefore.style.width = EXAMPLE_SLIDER_STYLES.PICTURES.TABLET;
    exampleAfter.style.width = EXAMPLE_SLIDER_STYLES.PICTURES.TABLET;
    exampleSliderWidth = EXAMPLE_SLIDER_STYLES.SLIDER.TABLET;
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
