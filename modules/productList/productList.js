import { Card } from "../../features/Card/Card";
import { addContainer } from "../addContainer";
import { API_URL } from '/const';


export class ProductList {
  static instance = null;

  constructor() {
    if (!ProductList.instance) {
      ProductList.instance = this;
      this.element = document.createElement('section');
      this.element.classList.add('goods');
      this.containerElement = addContainer(this.element, 'goods__container')
      this.isMounted = false;
      this.addEvents();
    }

    return ProductList.instance
  }

  mount(parent, data, title) {
    this.containerElement.textContent = '';

    const titleElem = document.createElement('h2');
    titleElem.textContent = title ? title : 'Список товаров';

    titleElem.className = title
      ? 'goods__title'
      : 'goods__title visually-hidden';

    this.containerElement.append(titleElem);

    this.updateListElem(data);

    parent.append(this.element);

    if (this.isMounted) {
      return
    }

    parent.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }

  addEvents() {

  }

  updateListElem(data = []) {
    const listElem = document.createElement('ul');
    listElem.classList.add('goods__list');

    const listItems = data.map(
      ({ id, images: [image], name: title, price }) => {
      const listItemElem = document.createElement('li');
      listItemElem.classList.add('goods__item');
      listItemElem.append(new Card({ id, image, title, price }).create());

      return listItemElem;
    });

    listElem.append(...listItems);
    this.containerElement.append(listElem);
  }

  getHTMLTamplateListItem({id, images: [image], name: title, price}) {
    return `
      <article class="goods__card card">
      <a href="/product/${id}" class="card__link card__link_img">
        <img class="card__image" src="${API_URL}${image}" alt="${title}">
      </a>

      <div class="card__info">
        <h3 class="card__title">
          <a href="/product/${id}" class="card__link">
            ${title}
          </a>
        </h3>

        <p class="card__price">${price.toLocaleString()}&nbsp;₽</p>
      </div>

      <button class="card__btn" data-id="${id}">В корзину</button>

      <button class="card__favorite" data-id="${id}">
        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.41334 13.8733C8.18668 13.9533 7.81334 13.9533 7.58668 13.8733C5.65334 13.2133 1.33334 10.46 1.33334 5.79332C1.33334 3.73332 2.99334 2.06665 5.04001 2.06665C6.25334 2.06665 7.32668 2.65332 8.00001 3.55998C8.67334 2.65332 9.75334 2.06665 10.96 2.06665C13.0067 2.06665 14.6667 3.73332 14.6667 5.79332C14.6667 10.46 10.3467 13.2133 8.41334 13.8733Z"
            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

      </button>

    </article>
      `

  }

}
