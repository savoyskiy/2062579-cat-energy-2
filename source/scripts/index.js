/* в этот файл добавляет скрипты*/
/* меню */
const mainHeaderNavigation = document.querySelector('.main-header__navigation');
/* кнопка меню */
const mainHeaderButton = document.querySelector('.main-header__button');
/* карта-картинка */
const cooperationMapBackground = document.querySelector('.cooperation__map-background');

/* реализация меню без JS */
mainHeaderNavigation.classList.remove('main-header__navigation--no-js');
mainHeaderButton.classList.remove('main-header__button--no-js');

/* открытие/закрытие меню */
mainHeaderButton.addEventListener('click', () => {
  mainHeaderNavigation.classList.toggle('main-header__navigation--hidden');
  mainHeaderButton.classList.toggle('main-header__button--open');
});

/* Реализация карты без JS */
cooperationMapBackground.classList.remove('cooperation__map-background--no-js');
