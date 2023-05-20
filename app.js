const qS = el => document.querySelector(el);
const cE = el => document.createElement(el);

const createEl = (type, cls = null, textContent = null, parent = null, ...attrs) => {
  const element = cE(type);
  element.className = cls
  element.textContent = textContent;
  attrs.length > 0 ? attrs.forEach(attr => element.setAttribute(attr?.name, attr?.value)) : '';
  element
  parent?.appendChild(element);
  return element;
};

/**
 * Chiamata fetch che salva tutti i prodotti all'interno della lista listEl.
 * Cicla sulla lista e crea le varie card dentro cardWrapper.
 * EventListener su cardWrapper che mostra la show della relativa card.
 * @date 18/5/2023 - 10:53:04
 */
const createCardFnc = () => {
  fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
      listEl = data.products
      listEl.forEach(el => {
        cardWrapper.appendChild(createCard(el));
      })
    })
    .then((data) => {
      cardWrapper.addEventListener('click', (e) => {
        for (let el of listEl) {
          if (el.id === parseInt(e.target.closest(".card").id)) {
            showCardInfo(el)
          }
        }
      });
    });;
};

/**
 * Creazione della card, riceve un oggetto come parametro e ritorna un elemento.
 * @date 18/5/2023 - 10:57:28
 *
 * @param {obj}
 * @returns {Element}
 */
const createCard = (obj) => {
  const cardEl = createEl('div', 'card', null, null, { name: 'id', value: `${obj.id}` });
  const figureEl = createEl('figure', 'card__figure', null, cardEl);
  const imgEl = createEl('img', 'card__img', null, figureEl, { name: 'src', value: `${obj.thumbnail}` }, { name: 'alt', value: `${obj.title}` });
  const textWrapEl = createEl('div', 'card__text', null, cardEl);
  const cardTitleEl = createEl('h2', 'card_title', `${obj.title}`, textWrapEl);
  const descriptionEl = createEl('p', 'description', `${obj.description}`, textWrapEl);
  const starsWrap = createEl('h2', 'stars_el', null, textWrapEl);
  const cardPriceWrap = createEl('div', 'card__price', null, textWrapEl);
  const price = createEl('h2', null, `${obj.price} €`, cardPriceWrap);

  for (let i = 0; i <= Math.floor(obj.rating); i++) {
    starsWrap.innerHTML += '<i class="fa-regular fa-star"></i>'
  };

  return cardEl;
}

/**
 * Creazione della card all'interno della modale del carrello.
 * Riceve un oggetto (l'oggetto della card selezionata) e ritorna un elemento.
 * @date 18/5/2023 - 11:11:57
 *
 * @param {*} obj
 * @returns {Element}
 */
const createCart = (obj) => {
  const cartEl = createEl('div', 'cart_elemet_wrap');
  const imgEl = createEl('img', 'img_cart_el', null, cartEl, { name: 'src', value: `${obj.thumbnail}` }, { name: 'alt', value: `${obj.title}` });
  const textEl = createEl('div', 'text_cart_el', null, cartEl);
  const titleEl = createEl('h5', null, `${obj.title}`, textEl);
  const priceEl = createEl('h5', null, `${obj.price} €`, textEl);
  const quantityEl = createEl('h2', null, `${quantity}`, cartEl);
  const delEl = createEl('div', 'del_cart', null, cartEl)
  delEl.innerHTML = '<i class="fa-solid fa-trash"></i>'

  delEl.addEventListener('click', () => {
    modal.removeChild(cartEl);
  })

  return cartEl;
}

/**
 * Aggiunta al carrello della cart tramite la funzione createCart(el)
 * @date 18/5/2023 - 11:13:45
 *
 * @param {Event} e
 */
const addCart = (e) => {
  listEl.filter(el => el.id === parseInt(e.target.closest('.wrap_show').id))
    .forEach(el => modal.append(createCart(el)));
}

/**
 * Creazione della modale e dell'overlay 
 * @date 18/5/2023 - 11:29:27
 *
 * @param {object} obj
 */
const showCardInfo = (obj) => {
  const overlayEl = createEl('div', 'overlay', null, rootEl);
  const wrapShowEl = createEl('div', 'wrap_show', null, overlayEl, { name: 'id', value: `${obj.id}` });
  const wrapImageEl = createEl('div', 'wrap_image', null, wrapShowEl);
  const figureThumbEl = createEl('figure', 'figure_thumb', null, wrapImageEl);
  const thumbnailEl = createEl('img', 'thumbnail', null, figureThumbEl, { name: 'src', value: `${obj.thumbnail}` }, { name: 'alt', value: `${obj.title}` });
  const wrapMiniSliderEl = createEl('div', 'wrap_miniSlide', null, wrapImageEl);
  const wrapInfoEl = createEl('div', 'wrap_info', null, wrapShowEl);
  const wrapTextEl = createEl('div', 'wrap_text', null, wrapInfoEl);
  const titleEl = createEl('h1', null, `${obj.title}`, wrapTextEl);
  const descriptionEl = createEl('p', null, `${obj.description}`, wrapTextEl);
  const starsEl = createEl('h2', 'stars', null, wrapTextEl);
  const stockEl = createEl('p', null, `disponibilità n. ${obj.stock}`, wrapTextEl);
  const brandEL = createEl('h2', null, `brand: ${obj.brand}`, wrapTextEl);
  const categoryEl = createEl('h3', null, `categoria: ${obj.category}`, wrapTextEl);
  const wrapButtonEl = createEl('div', 'wrap_button', null, wrapInfoEl);
  const inputstockEl = createEl('input', 'stock_input', null, wrapButtonEl, { name: 'type', value: 'number' });
  const buttonBuyEl = createEl('button', 'button_buy', null, wrapButtonEl);
  const buttonReturn = createEl('button', 'button_return', null, wrapShowEl);

  buttonBuyEl.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>'
  buttonReturn.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>'

  for (let i in obj.images) {
    const miniImage = createEl('img', 'mini_image', null, wrapMiniSliderEl, { name: 'src', value: `${obj.images[i]}` });
  }

  for (let i = 0; i <= Math.floor(obj.rating); i++) {
    starsEl.innerHTML += '<i class="fa-solid fa-star"></i>'
  };

  buttonBuyEl.addEventListener('click', (e) => {
    quantity = inputstockEl.value;
    stock = obj.stock;
    if (quantity <= stock) {
      addCart(e);
    } else {
      alert('Attenzione la quantità che si vuole comprare supera la quantità disponibile. Verrà inserita la quantità massima disponibile nel carrello.')
      quantity = obj.stock;
      addCart(e);
    }
  }, { once: true });

  wrapMiniSliderEl.addEventListener('click', (e) => thumbnailEl.src = e.target.src)

  buttonReturn.addEventListener('click', () => rootEl.removeChild(overlayEl));
};

const createLogin = () => {
  const loginOverlay = createEl('div', 'login_overlay', null, body);
  const modalLogin = createEl('div', 'modal_login', null, body);
  const backgroundLogin = createEl('img', 'background_login', null, modalLogin, { name: 'src', value: './img/—Pngtree—purple abstract wave frame-elegant luxury_6549678.png' }, { name: 'alt', value: 'Pngtree—purple abstract wave frame' });
  const imageLogin = createEl('img', 'image_login', null, modalLogin, { name: 'src', value: './img/4d95e433-331d-4e89-a182-ca346c65614b@w1000.png' }, { name: 'alt', value: '4d95e433-331d-4e89-a182-ca346c65614b@w1000' });
  const loginTextWrapper = createEl('form', 'login_text_wrap', null, modalLogin);
  const loginH2 = createEl('h2', null, 'login', loginTextWrapper);
  const userName = createEl('input', null, null, loginTextWrapper, { name: 'type', value: 'text' }, { name: 'placeholder', value: 'username' });
  const password = createEl('input', null, null, loginTextWrapper, { name: 'type', value: 'password' }, { name: 'placeholder', value: 'password' });
  const submit = createEl('input', null, 'submit', loginTextWrapper, { name: 'type', value: 'submit' });

  cardWrapper.textContent = '';

  loginTextWrapper.addEventListener('submit', e => {
    e.preventDefault();
    const isAuth = !!dataUsers.find(user =>
      user.userName.toLowerCase() === e.srcElement[0].value.toLowerCase() &&
      user.password.toLowerCase() === e.srcElement[1].value.toLowerCase()
    )
    if (isAuth) {
      setTimeout(() => {
        body.removeChild(loginOverlay);
        body.removeChild(modalLogin);
        createCardFnc();
      }, 1200)
      modalLogin.classList.add('login_true');
    } else {
      alert('username or password incorrect');
    }
  });
};

const cardWrapper = qS('.card_wrapper');
const filterForm = qS('.filter__form');
const navbar = qS('.navbar');
const modal = createEl('div', 'cart_modal', null, navbar)
const selectCategory = qS('.filter__select');
const searchbar = qS('.navbar__input');
const burgher = qS('.burgher');
const navLinks = qS('.navbar__links__ul');
const cartButton = qS('.button_buy');
const body = qS('body');
const cart = qS('.cart');
let listEl = [];
const rootEl = qS('#root');
let quantity = 1;
let stock = 0;
const dataUsers = [
  {
    id: '1',
    userName: 'prova',
    password: 'prova',
  },
  {
    id: '2',
    userName: 'casicasi',
    password: 'miromiro',
  },
  {
    id: '3',
    userName: 'mirocasi',
    password: 'casimiro',
  },
];

createLogin();

fetch('https://dummyjson.com/products/categories')
  .then(res => res.json())
  .then(data => {
    const opt = cE('option');
    opt.value = '';
    opt.textContent = 'seleziona una categoria'
    selectCategory.appendChild(opt)
    for (let i in data) {
      const opt = cE('option');
      opt.value = data[i]
      opt.textContent = data[i]
      selectCategory.appendChild(opt);
      filterForm.appendChild(selectCategory)
    }
  });

selectCategory.addEventListener('change', (e) => {
  if (e.target.value === '') {
    cardWrapper.textContent = "";
    listEl.map(obj => cardWrapper.appendChild(createCard(obj)))
  } else {
    /* Metoo con chiamata API ****************************************/
    // const category = e.target.value;
    // fetch(`https://dummyjson.com/products/category/${category}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     cardWrapper.textContent = '';
    //     data.products.forEach(el => {
    //       cardWrapper.appendChild(createCard(el));
    //     })
    //   })
    cardWrapper.textContent = "";
    listEl
      .filter((el) => el.category.toLowerCase() === (e.target.value.toLowerCase()))
      .forEach((obj) => cardWrapper.append(createCard(obj)))
  }
});

searchbar.addEventListener('input', (e) => {
  if (e.target.value === '') {
    createCardFnc();
  } else {
    /** metodo ricerca con chiamata API e query **************************************/
    // const query = e.target.value;
    // fetch(`https://dummyjson.com/products/search?q=${query}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     cardWrapper.textContent = '';
    //     data.products.forEach(el => {
    //       cardWrapper.appendChild(createCard(el));
    //       e.preventDefault();
    //     })
    //   });
    /** Metodo di ricerca con filter nella lista oggetti *****************************/
    cardWrapper.textContent = "";
    listEl
      .filter((el) => el.description.toLowerCase().includes(e.target.value.toLowerCase()))
      .forEach((obj) => cardWrapper.append(createCard(obj)))
  }
})

burgher.addEventListener('click', (e) => navLinks.classList.toggle('active'));

cart.addEventListener('click', (e) => modal.classList.toggle('cart_active'));