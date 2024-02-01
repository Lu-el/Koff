import 'normalize.css';
import './style.scss';
import Navigo from 'navigo';
import { Header } from './modules/header/header';
import { Main } from './modules/main/main';
import { Footer } from './modules/footer/footer';
import { Order } from './modules/order/order';

// import { Navigation, Thumbs } from 'swiper/modules';
// import Swiper  from 'swiper';
// import 'swiper/css';

// урок 3, Роутер 7:19

const productSlider = () => {
  Promise.all([
    import('swiper/modules'),
    import('swiper'),
    import('swiper/css')
  ]).then(([{ Navigation, Thumbs }, Swiper]) => {
    const swiperThumbnails = new Swiper.default(".product__slider-thumbnails", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });


    new Swiper.default(".product__slider-main", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".product__arrow_next",
        prevEl: ".product__arrow_prev",
      },
      modules: [Navigation, Thumbs],
      thumbs: {
        swiper: swiperThumbnails,
      },
    });
  })
}

const init = () => {

  new Header().mount();
  new Main().mount();
  new Footer().mount();

  productSlider();

  const router = new Navigo("/", { linksSelector: "a[href^='/']" });

  router
    .on("/", () => {
      console.log('на главной');
    })
    .on('/category', () => {
      console.log('category')
    })
    .on('/favorite', () => {
      console.log('favorite')
    })
    .on('/search', () => {
      console.log('')
    })
    .on('/product/:id', () => {

    })
    .on('/cart', () => {
      console.log('cart')
    })
    .on('/order', () => {
      new Order().mount(new Main().element);
      console.log('order')
    })
    .notFound(() => {
      console.log('404')
    })

  router.resolve();
}

init();
