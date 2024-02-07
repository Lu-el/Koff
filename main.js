import 'normalize.css';
import './style.scss';
import Navigo from 'navigo';
import { Header } from './modules/header/header';
import { Main } from './modules/main/main';
import { Footer } from './modules/footer/footer';
import { Order } from './modules/order/order';
import { ProductList } from './modules/productList/productList';
import { ApiService } from './services/ApiService';
import { Catalog } from './modules/Catalog/catalog';

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
  const api = new ApiService();
  const router = new Navigo("/", { linksSelector: "a[href^='/']" });

  new Header().mount();
  new Main().mount();
  new Footer().mount();

  api.getProductCategories().then((data) => {
    new Catalog().mount(new Main().element, data);
    router.updatePageLinks();
  });

  productSlider();

  router
    .on(
      "/",
      async () => {
        const product = await api.getProducts();
        new ProductList().mount(new Main().element, product);
        router.updatePageLinks();
      },
      {
        leave(done) {
          new ProductList().unmount();
          console.log('leave');
          done()
        },

        already() {
          console.log('already');
        },
      })
    .on('/category',
      async ({params: {slug}}) => {
        const product = await api.getProducts();
        new ProductList().mount(new Main().element, product,
          slug);
        router.updatePageLinks();
      },
      {
        leave(done) {
          new ProductList().unmount();
          console.log('leave');
          done()
        }
      })
    .on('/favorite',
      async () => {
        const product = await api.getProducts();
        new ProductList().mount(new Main().element, product,
          'Избранное');
        router.updatePageLinks();
      },
      {
        leave(done) {
          new ProductList().unmount();
          console.log('leave');
          done()
        }
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
      new Main().element.innerHTML =
        `<h2>Страница не найдена</h2>
      <p>Через 5 сек вы будете перенаправлены
        <a href="/">на главную страницу</a>
      </p>`;

      setTimeout(() => {
        router.navigate("/");
      }, 5000)
    },
      {
        leave(done) {
          new Main().element.innerHTML = ``;
          console.log('leave');
          done()
        }
      }
    )

  router.resolve();
}

init();
