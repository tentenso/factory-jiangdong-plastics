const languageButton = document.querySelector('#langToggle');
const menuButton = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');
let language = localStorage.getItem('jd-language') || 'zh';

const pageTitles = {
  home: ['瑞安市江东塑料制品厂 | 精密注塑制造', 'Jiangdong Plastics | Precision Injection Molding'],
  about: ['关于我们 | 江东塑料', 'About Us | Jiangdong Plastics'],
  products: ['产品中心 | 江东塑料', 'Products | Jiangdong Plastics'],
  news: ['新闻资讯 | 江东塑料', 'Insights | Jiangdong Plastics'],
  contact: ['联系我们 | 江东塑料', 'Contact Us | Jiangdong Plastics']
};

function applyLanguage(nextLanguage) {
  language = nextLanguage;
  localStorage.setItem('jd-language', language);
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-zh]').forEach((element) => {
    element.innerHTML = element.dataset[language];
  });
  languageButton?.querySelectorAll('span').forEach((item, index) => {
    item.classList.toggle('active', (language === 'zh' && index === 0) || (language === 'en' && index === 1));
  });
  const page = document.body.dataset.page || 'home';
  document.title = pageTitles[page][language === 'zh' ? 0 : 1];
}

applyLanguage(language);
languageButton?.addEventListener('click', () => applyLanguage(language === 'zh' ? 'en' : 'zh'));
menuButton?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
mainNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const factoryImages = ['assets/workshop-vertical.png', 'assets/workshop-horizontal.png', 'assets/workshop-auto.png', 'assets/robot-line.jpg'];
let factoryIndex = 0;
const factoryImage = document.querySelector('#factoryImage');
const factoryCounter = document.querySelector('#factoryIndex');
function showFactoryImage(offset) {
  factoryIndex = (factoryIndex + offset + factoryImages.length) % factoryImages.length;
  factoryImage.style.opacity = '0';
  window.setTimeout(() => {
    factoryImage.src = factoryImages[factoryIndex];
    factoryCounter.textContent = String(factoryIndex + 1).padStart(2, '0');
    factoryImage.style.opacity = '1';
  }, 180);
}
document.querySelector('#prevFactory')?.addEventListener('click', () => showFactoryImage(-1));
document.querySelector('#nextFactory')?.addEventListener('click', () => showFactoryImage(1));

const filterButtons = document.querySelectorAll('[data-filter]');
const productEntries = document.querySelectorAll('[data-category]');
function filterProducts(category) {
  filterButtons.forEach((button) => button.classList.toggle('active', button.dataset.filter === category));
  productEntries.forEach((entry) => entry.classList.toggle('hidden', category !== 'all' && entry.dataset.category !== category));
}
if (filterButtons.length) {
  const requestedCategory = new URLSearchParams(window.location.search).get('category');
  const validCategory = [...filterButtons].some((button) => button.dataset.filter === requestedCategory);
  filterProducts(validCategory ? requestedCategory : 'all');
  filterButtons.forEach((button) => button.addEventListener('click', () => filterProducts(button.dataset.filter)));
}
