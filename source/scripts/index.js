/* работа мобильного меню */

const mainHeaderNavigation = document.querySelector('.main-header__navigation'); // меню
const mainHeaderButton = document.querySelector('.main-header__button'); // кнопка меню

mainHeaderNavigation.classList.remove('main-header__navigation--no-js'); // реализация меню без JS
mainHeaderButton.classList.remove('main-header__button--no-js');

mainHeaderButton.addEventListener('click', () => { // открытие/закрытие меню
  mainHeaderNavigation.classList.toggle('main-header__navigation--hidden');
  mainHeaderButton.classList.toggle('main-header__button--open');
});

/* оживление слайдера до/после */

const example = document.querySelector('.example'); // блок с живым примером

if (example) {
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
  const CURSOR_STYLES = { // иконка курсора обычная/при нажатой мыши
    NORMAL: 'grab',
    MOUSE_DOWN: 'grabbing'
  };
  const ARROWS_PARAMETERS = {
    STEP: 10, // шаг изменения
    HALF_WIDTH_DIVIDER: 2, // половина ширины разделителя
    RADIX_PARAMETER: 10, // параметр основания для parseInt()
    get stepMinusHalfDivider() { // шаг - половина разделителя
      return this.STEP - this.HALF_WIDTH_DIVIDER;
    },
    get stepPlusHalfDivider() { // шаг + половина разделителя
      return this.STEP + this.HALF_WIDTH_DIVIDER;
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
        let newPositionDivider = parseInt(exampleDivider.style.left, ARROWS_PARAMETERS.RADIX_PARAMETER);
        if (newPositionDivider >= ARROWS_PARAMETERS.STEP && newPositionDivider <= exampleSliderWidth) { // ограничиваем шириной слайдера
          exampleDivider.style.left = `${newPositionDivider - ARROWS_PARAMETERS.STEP}px`; // меняем позицию слайдера
          exampleBefore.style.width = `${newPositionDivider - ARROWS_PARAMETERS.stepMinusHalfDivider}px`; // меняем ширину картинки до
          if (screenWidth < SCREEN_WIDTH.TABLET) {
            exampleAfter.style.width = `${EXAMPLE_SLIDER_STYLES.SLIDER.MOBILE - (newPositionDivider - ARROWS_PARAMETERS.stepMinusHalfDivider)}px`; // меняем ширину картинки после на мобиле
          } else {
            exampleAfter.style.width = `${EXAMPLE_SLIDER_STYLES.SLIDER.TABLET - (newPositionDivider - ARROWS_PARAMETERS.stepMinusHalfDivider)}px`; // и на планшете
          }
          newPositionDivider = parseInt(exampleDivider.style.left, ARROWS_PARAMETERS.RADIX_PARAMETER); // переписываем значение позиции слайдера
        }
      }
      if (event.key === 'ArrowRight') { // стрелкой вправо
        let newPositionDivider = parseInt(exampleDivider.style.left, ARROWS_PARAMETERS.RADIX_PARAMETER);
        if (newPositionDivider >= 0 && newPositionDivider <= exampleSliderWidth - ARROWS_PARAMETERS.STEP) {
          exampleDivider.style.left = `${newPositionDivider + ARROWS_PARAMETERS.STEP}px`;
          exampleBefore.style.width = `${newPositionDivider + ARROWS_PARAMETERS.stepPlusHalfDivider}px`;
          if (screenWidth < SCREEN_WIDTH.TABLET) {
            exampleAfter.style.width = `${EXAMPLE_SLIDER_STYLES.SLIDER.MOBILE - (newPositionDivider + ARROWS_PARAMETERS.stepPlusHalfDivider)}px`;
          } else {
            exampleAfter.style.width = `${EXAMPLE_SLIDER_STYLES.SLIDER.TABLET - (newPositionDivider + ARROWS_PARAMETERS.stepPlusHalfDivider)}px`;
          }
          newPositionDivider = parseInt(exampleDivider.style.left, ARROWS_PARAMETERS.RADIX_PARAMETER);
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
}

/* отправка формы подбора программ */
const SERVER_ADDRESS = 'https://echo.htmlacademy.ru';
const programmsForm = document.querySelector('.programms-option__form');
const resultUploadForm = document.querySelector('.result-upload-form');

if (programmsForm) {
  const resultUploadFormText = resultUploadForm.querySelector('.result-upload-form__text');
  const resultUploadFormButton = resultUploadForm.querySelector('.result-upload-form__close-button');
  const programmsFormSubmitButton = programmsForm.querySelector('.programms-option__button');
  const uploadFormData = (formData) => fetch(
    SERVER_ADDRESS,
    {
      method: 'POST',
      body: formData
    }
  );

  const onResultButtonClick = () => {
    resultUploadForm.close();
  };

  const blockSubmitButton = () => {
    programmsFormSubmitButton.textContent = 'Заявка отправляется';
    programmsFormSubmitButton.disabled = true;
  };

  const unblockSubmitButton = () => {
    programmsFormSubmitButton.textContent = 'Отправить заявку';
    programmsFormSubmitButton.disabled = false;
  };

  const setFormData = (evt) => {
    evt.preventDefault();
    blockSubmitButton();
    const formData = new FormData(evt.target);

    uploadFormData(formData)
      .then(
        (responce) => {
          if (!responce.ok) {
            throw new Error;
          }
          programmsForm.reset();
          resultUploadFormText.textContent = 'Данные успешно отправлены';
        }
      )
      .catch(
        () => {
          resultUploadFormText.textContent = 'Произошла ошибка при отправке данных';
        }
      )
      .finally(
        () => {
          resultUploadForm.showModal();
          unblockSubmitButton();
        }
      );
  };

  resultUploadFormButton.addEventListener('click', onResultButtonClick);
  programmsForm.addEventListener('submit', setFormData);
}

/* отправка формы подписки */
const subscriptionForm = document.querySelector('.actions-and-news__form');

if (subscriptionForm) {
  const subscriptionFormButton = subscriptionForm.querySelector('.actions-and-news__button');
  const subscriptionFormButtonText = subscriptionFormButton.querySelector('span');
  const subscriptionResult = document.querySelector('.subscription-result');
  const subscriptionResultText = subscriptionResult.querySelector('.subscription-result__text');
  const subscriptionResultButton = subscriptionResult.querySelector('.subscription-result__button');

  const uploadSubscriptionFormData = (formData) => fetch(
    SERVER_ADDRESS,
    {
      method: 'POST',
      body: formData
    }
  );

  const disableSubscriptionFormButton = () => {
    subscriptionFormButton.disabled = true;
    subscriptionFormButtonText.textContent = 'Подписываемся';
  };

  const undisableSubscriptionFormButton = () => {
    subscriptionFormButton.disabled = false;
    subscriptionFormButtonText.textContent = 'Подписаться';
  };

  const onSubmitSubscriptionForm = (event) => {
    event.preventDefault();
    disableSubscriptionFormButton();
    const formData = new FormData(event.target);

    uploadSubscriptionFormData(formData)
      .then(
        (responce) => {
          if (!responce.ok) {
            throw new Error;
          }
          subscriptionForm.reset();
          subscriptionResultText.textContent = 'Вы успешно подписались';
        }
      )
      .catch(
        () => {
          subscriptionResultText.textContent = 'Не получилось. Попробуйте еще раз';
        }
      )
      .finally(
        () => {
          undisableSubscriptionFormButton();
          subscriptionResult.showModal();
        }
      );
  };

  subscriptionResultButton.addEventListener('click', () => {
    subscriptionResult.close();
  });
  subscriptionForm.addEventListener('submit', onSubmitSubscriptionForm);
}
