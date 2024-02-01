import { addContainer } from '../addContainer';

export class Order {
  static instance = null;

  constructor() {
    if (!Order.instance) {
      Order.instance = this;
      this.element = document.createElement('section');
      this.element.classList.add('order');
      this.containerElement = addContainer(this.element, 'order__container');
      this.isMounted = false;
    }

    return Order.instance
  }

  mount(element) {
    if (this.isMounted) {
      return
    }

    this.containerElement.insertAdjacentHTML('beforeend', this.getHTML())

    element.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }

  getHTML() {
    return `
    <div class="order__title">
    <p class="order__text">Заказ успешно размещен</p>
    <p class="order__text order__text_count">20&nbsp;000&nbsp;₽</p>
  </div>
  <div class="order__number">№43435</div>

  <h3 class="order__delivery-subtitle">Данные доставки</h3>

  <table class="order__table-delivery table-delivery">
    <tr class="table-delivery__row">
      <td class="table-delivery__name">Получатель</td>
      <td class="table-delivery__user-info">Иванов Петр Александрович</td>
    </tr>

    <tr class="table-delivery__row">
      <td class="table-delivery__name">Телефон</td>
      <td class="table-delivery__user-info">+7 (737) 346 23 00</td>
    </tr>

    <tr class="table-delivery__row">
      <td class="table-delivery__name">E-mail</td>
      <td class="table-delivery__user-info">Ivanov84@gmail.com</td>
    </tr>

    <tr class="table-delivery__row">
      <td class="table-delivery__name">Адрес доставки</td>
      <td class="table-delivery__user-info">Москва, ул. Ленина, 21, кв. 33</td>
    </tr>

    <tr class="table-delivery__row">
      <td class="table-delivery__name">Способ оплаты</td>
      <td class="table-delivery__user-info">Картой при получении</td>
    </tr>

    <tr class="table-delivery__row">
      <td class="table-delivery__name">Способ получения</td>
      <td class="table-delivery__user-info">Доставка</td>
    </tr>
  </table>

  <button class="order__main-menu" type="submit">На главную</button>
    `
  }
}
