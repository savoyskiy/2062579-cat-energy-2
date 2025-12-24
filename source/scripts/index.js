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
const CURSOR_STYLES = { // иконка курсора обычная/при нажатой мыши
  NORMAL: 'grab',
  MOUSE_DOWN: 'grabbing'
};
setSliderStyles(); // устанавливаем инлайн-стили (необходимо так же для корректной перезагрузки страницы)
let exampleSliderRect = exampleSlider.getBoundingClientRect(); // определяем размер блока и его координаты относительно вьюпорта

const changeSliderStyles = (newPositionDivider) => { // функция изменения инлайн-стилей слайдера
  if (newPositionDivider >= 0 && newPositionDivider <= exampleSliderWidth) { // ограничиваем изменение сладера шириной блока
    exampleDivider.style.left = `${newPositionDivider}px`; // изменяем инлайн-значение положения разделителя
    exampleBefore.style.width = `${newPositionDivider}px`; // изменяем ширину картинки до
    const newExampleAfterWidth = exampleSliderWidth - newPositionDivider; // определяем необходимую ширину картинки после
    exampleAfter.style.width = `${newExampleAfterWidth}px`; // изменяем ширину картинки после
  }
};

const onMouseMoveChangeSlider = (event) => { // функция изменения слайдера мышью
  const newPositionDivider = event.clientX - exampleSliderRect.left; // координата-Х передвинутого разделителя внутри блока
  changeSliderStyles(newPositionDivider); // меняем инлайн-стили
};

const onTouchMoveChangeSlider = (event) => { // функция изменения слайдера на тачскрине
  const newPositionDivider = event.touches[0].clientX - exampleSliderRect.left; // координата-Х передвинутого разделителя внутри блока
  changeSliderStyles(newPositionDivider); // меняем инлайн-стили
};

const onKeysDownChangeSlider = (event) => { // функция изменения слайдера стрелками на клавиатуре
  if (exampleDivider === document.activeElement) { // работает, если разделитель в фокусе
    if (event.key === 'ArrowLeft') { // стрелкой влево
      let newPositionDivider = parseInt(exampleDivider.style.left, 10);
      if (newPositionDivider >= 10 && newPositionDivider <= exampleSliderWidth) { // ограничиваем шириной слайдера
        exampleDivider.style.left = `${newPositionDivider - 10}px`; // меняем позицию слайдера
        exampleBefore.style.width = `${newPositionDivider - 8}px`; // меняем ширину картинки до
        if (screenWidth < SCREEN_WIDTH.TABLET) {
          exampleAfter.style.width = `${280 - (newPositionDivider - 8)}px`; // меняем ширину картинки после на мобиле
        } else {
          exampleAfter.style.width = `${560 - (newPositionDivider - 8)}px`; // и на планшете
        }
        newPositionDivider = parseInt(exampleDivider.style.left, 10); // переписываем значение позиции слайдера
      }
    }
    if (event.key === 'ArrowRight') { // стрелкой вправо
      let newPositionDivider = parseInt(exampleDivider.style.left, 10);
      if (newPositionDivider >= 0 && newPositionDivider <= exampleSliderWidth - 10) {
        exampleDivider.style.left = `${newPositionDivider + 10}px`;
        exampleBefore.style.width = `${newPositionDivider + 12}px`;
        if (screenWidth < SCREEN_WIDTH.TABLET) {
          exampleAfter.style.width = `${280 - (newPositionDivider + 12)}px`;
        } else {
          exampleAfter.style.width = `${560 - (newPositionDivider + 12)}px`;
        }
        newPositionDivider = parseInt(exampleDivider.style.left, 10);
      }
    }
  }
};

document.addEventListener('keydown', onKeysDownChangeSlider); // вешаем обработчик на стрелки

const onMouseDownStartChangeSlider = () => { // функция установки обработчика на блок слайдера
  exampleDivider.style.cursor = CURSOR_STYLES.MOUSE_DOWN; // меняем внешний вид курсора
  exampleSlider.addEventListener('mousemove', onMouseMoveChangeSlider); // вешаем обработчик на мышь
  exampleSlider.addEventListener('touchmove', onTouchMoveChangeSlider); // вешаем обработчик на тачскрин
};

const onMouseUpEndChangeSlider = () => { // функция удаления обработчика на блок слайдера
  exampleDivider.style.cursor = CURSOR_STYLES.NORMAL; // меняем внешний вид курсора обратно
  exampleSlider.removeEventListener('mousemove', onMouseMoveChangeSlider); // удаляем обработчик на мышь
  exampleSlider.removeEventListener('touchmove', onTouchMoveChangeSlider); // удаляем обработчик на тачскрин
};

exampleDivider.addEventListener('mousedown', onMouseDownStartChangeSlider); // на нажатие мыши ставим обработчик
exampleDivider.addEventListener('touchstart', onMouseDownStartChangeSlider); // на нажатие экрана ставим обработчик
exampleDivider.addEventListener('mouseup', onMouseUpEndChangeSlider); // на отпускание мыши удаляем обработчик
exampleDivider.addEventListener('touchend', onMouseUpEndChangeSlider); // на отпускание экрана удаляем обработчик

window.addEventListener('resize', () => { // на случай изменения размера окна переписываем:
  screenWidth = window.innerWidth; // размер экрана
  setSliderStyles(); // инлайн-стили
  exampleSliderRect = exampleSlider.getBoundingClientRect(); // размер блока и координаты
});
