import IMask from 'imask'; // импорт бибилиотеки для маски в поле ввода

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

/* форма подбора программ */

const SERVER_ADDRESS = 'https://echo.htmlacademy.ru';
const EMAIL_RULES = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // правило ввода email
const programmsForm = document.querySelector('.programms-option__form'); // форма
const resultUploadForm = document.querySelector('.result-upload-form'); // модалка с результатом

if (programmsForm) {
  const telephoneInput = programmsForm.querySelector('#telephone'); // поле ввода телефонного номера
  const emailInput = programmsForm.querySelector('#e-mail'); // поле ввода e-mail
  const resultUploadFormText = resultUploadForm.querySelector('.result-upload-form__text'); // текст сообщения в модалке
  const resultUploadFormButton = resultUploadForm.querySelector('.result-upload-form__close-button'); // кнопка закрытия модалки
  const programmsFormSubmitButton = programmsForm.querySelector('.programms-option__button'); // кнопка отправки формы

  const telephoneMask = IMask(telephoneInput, { // маска в поле номера телефона
    mask: '{8} (000) 000-00-00',
    lazy: true
  });

  telephoneInput.addEventListener('focus', () => { // показываем маску если поле в фокусе
    telephoneMask.updateOptions({lazy: false});
  }, true);
  telephoneInput.addEventListener('blur', () => { // убираем маску если поле не в фокусе
    telephoneMask.updateOptions({lazy: true});
  }, true);

  const pristine = new Pristine(programmsForm, {
    classTo: 'contacts__wrapper',
    errorClass: 'contacts__wrapper--invalid',
    errorTextParent: 'contacts__wrapper',
    errorTextTag: 'p',
    errorTextClass: 'contacts__error-message-text'
  });

  const telephoneErrorText = 'Введите номер полностью'; // текст об ошибке при вводе теелфона
  const validateTelephone = () => telephoneMask.masked.isComplete; // ф-я проверки полноты ввода телефона
  const pristineValidateTelephone = () => pristine.addValidator(telephoneInput, validateTelephone, telephoneErrorText); // ф-я валидации ввода телефона

  const emailErrorText = 'Формат: имя@сервер.домен'; // сообщение об ошибке при вводе е-мейл
  const validateEmail = () => EMAIL_RULES.test(emailInput.value); // ф-я проверки ввода е-мейл
  const pristineValidateEmail = () => pristine.addValidator(emailInput, validateEmail, emailErrorText); // ф-я валидации ввода е-мейл

  pristineValidateTelephone(); // валидация ввода телефоннного номера
  pristineValidateEmail(); // валидация ввода е-мейл

  const uploadFormData = (formData) => fetch( // функция отправки данных формы на сервер
    SERVER_ADDRESS,
    {
      method: 'POST',
      body: formData
    }
  );

  const onResultButtonClick = () => { // закрытие модалки по кнопке
    resultUploadForm.close();
  };

  const onClickBackdrop = (evt) => { // закрытие модалки по клику вне модалки
    const isClickonBackdrop = evt.target === evt.currentTarget;

    if (isClickonBackdrop) {
      resultUploadForm.close();
    }
  };

  const blockSubmitButton = () => { // блокировка кнокпки отправки формы на время отправки
    programmsFormSubmitButton.textContent = 'Заявка отправляется';
    programmsFormSubmitButton.disabled = true;
  };

  const unblockSubmitButton = () => { // отмена блокировки кнокпки отправки формы после отправки
    programmsFormSubmitButton.textContent = 'Отправить заявку';
    programmsFormSubmitButton.disabled = false;
  };

  const setFormData = (evt) => {
    evt.preventDefault(); // отмена действия по умолчанию
    const isValid = pristine.validate();

    if(isValid) {
      blockSubmitButton(); // блокировка кнопки
      const formData = new FormData(evt.target); // создаем новый объект формы
      formData.set('telephone', telephoneMask.unmaskedValue); // меняем значение поля телефона на значение без маски

      uploadFormData(formData) // отправляем данные на сервер
        .then( // если получен ответ от сервера
          (responce) => {
            if (!responce.ok) { // если ответ не ок
              throw new Error; // проуидываем ошибку
            }
            programmsForm.reset(); // сбрасываем поля формы
            resultUploadFormText.textContent = 'Данные успешно отправлены'; // меняем текст в модалке на успешный
          }
        )
        .catch( // если не получен ответ от сервера
          () => {
            resultUploadFormText.textContent = 'Произошла ошибка при отправке данных';
          }
        )
        .finally( // в любом случае
          () => {
            telephoneMask.value = ''; // очищаем значение в маске теелфонного номера
            resultUploadForm.showModal(); // показываем окно сообщения
            unblockSubmitButton(); // снимаем блокировку с кнопки
          }
        );
    }
  };

  resultUploadForm.addEventListener('click', onClickBackdrop); // установка обработчика на клик вне модалки
  resultUploadFormButton.addEventListener('click', onResultButtonClick); // установка обработчика на клик по кнопке модалки
  programmsForm.addEventListener('submit', setFormData); // установка обработчика на форму
}

/* отправка формы подписки */

const subscriptionForm = document.querySelector('.actions-and-news__form');

if (subscriptionForm) {
  const subscriptionsEmailInput = subscriptionForm.querySelector('.actions-and-news__email-input');
  const subscriptionFormButton = subscriptionForm.querySelector('.actions-and-news__button');
  const subscriptionFormButtonText = subscriptionFormButton.querySelector('span');
  const subscriptionResult = document.querySelector('.subscription-result');
  const subscriptionResultText = subscriptionResult.querySelector('.subscription-result__text');
  const subscriptionResultButton = subscriptionResult.querySelector('.subscription-result__button');

  const pristineSubscription = new Pristine(subscriptionForm, {
    classTo: 'actions-and-news__email-label',
    errorClass: 'actions-and-news__email-label--invalid',
    errorTextParent: 'actions-and-news__email-label',
    errorTextTag: 'p',
    errorTextClass: 'actions-and-news__error-message-text'
  });

  const subscriotionErrorText = 'Формат: имя@сервер.домен'; // сообщение об ошибке при вводе е-мейл
  const validateEmail = () => EMAIL_RULES.test(subscriptionsEmailInput.value); // ф-я проверки ввода е-мейл
  const pristineValidateSubscription = () => pristineSubscription.addValidator(subscriptionsEmailInput, validateEmail, subscriotionErrorText); // ф-я валидации ввода е-мейл для подписки

  pristineValidateSubscription(); // валидация поля подписки

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

  const onClickBackdrop = ({ target, currentTarget }) => {
    const isClickonBackdrop = target === currentTarget;

    if (isClickonBackdrop) {
      subscriptionResult.close();
    }
  };

  const onSubmitSubscriptionForm = (event) => {
    event.preventDefault();
    const isValid = pristineSubscription.validate();

    if(isValid) {
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
    }
  };

  subscriptionResult.addEventListener('click', onClickBackdrop);
  subscriptionResultButton.addEventListener('click', () => {
    subscriptionResult.close();
  });
  subscriptionForm.addEventListener('submit', onSubmitSubscriptionForm);
}
