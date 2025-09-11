/* в этот файл добавляет скрипты*/
const mainHeaderNavigation = document.querySelector('.main-header__navigation');
const mainHeaderButton = document.querySelector('.main-header__button');

mainHeaderButton.addEventListener('click', () => {
  mainHeaderNavigation.classList.toggle('main-header__navigation--hidden');
});
