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
  const cardEl = cE('div');
  const figureEl = cE('figure');
  const imgEl = cE('img');
  const textWrapEl = cE('div');
  const cardTitleEL = cE('h2');
  const descriptionEl = cE('p');
  const starsWrap = cE('h2');
  const cardPriceWrap = cE('div');
  const price = cE('h2');

  cardEl.className = 'card';
  figureEl.className = 'card__figure';
  imgEl.className = 'card__img';
  cardTitleEL.className = 'card_title';
  descriptionEl.className = 'description';
  textWrapEl.className = 'card__text';
  cardPriceWrap.className = 'card__price';
  starsWrap.className = 'stars_el'

  imgEl.src = obj.thumbnail;
  imgEl.alt = obj.title;

  cardEl.setAttribute('id', obj.id);

  cardTitleEL.textContent = obj.title;
  descriptionEl.textContent = obj.description;

  for (let i = 0; i <= Math.floor(obj.rating); i++) {
    starsWrap.innerHTML += '<i class="fa-regular fa-star"></i>'
  };

  price.textContent = `${obj.price} €`;

  figureEl.appendChild(imgEl);
  cardPriceWrap.append(price)
  textWrapEl.append(cardTitleEL, descriptionEl, starsWrap, cardPriceWrap);
  cardEl.append(figureEl, textWrapEl);

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
  const cartEl = cE('div');
  cartEl.className = 'cart_elemet_wrap'

  const imgEl = cE('img');
  imgEl.className = 'img_cart_el';
  imgEl.src = obj.thumbnail;

  const textEl = cE('div');
  textEl.className = 'text_cart_el'

  const titleEl = cE('h5');
  titleEl.textContent = obj.title;

  const priceEl = cE('h5');
  priceEl.textContent = `${obj.price} €`;

  const quantityEl = cE('h2');
  quantityEl.textContent = quantity <= 0 ? 1 : quantity;

  const delEl = cE('div');
  delEl.innerHTML = '<i class="fa-solid fa-trash"></i>'
  delEl.className = 'del_cart'

  delEl.addEventListener('click', () => {
    modal.removeChild(cartEl);
  })

  textEl.append(titleEl, priceEl);
  cartEl.append(imgEl, textEl, quantityEl, delEl);
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
  const overlayEl = cE('div');
  const wrapShowEl = cE('div');
  const wrapImageEl = cE('div');
  const figureThumbEl = cE('figure');
  const thumbnailEl = cE('img');
  const wrapMiniSliderEl = cE('div');
  const wrapInfoEl = cE('div');
  const wrapTextEl = cE('div');
  const titleEl = cE('h1');
  const descriptionEl = cE('p');
  const starsEl = cE('h2');
  const stockEl = cE('p');
  const brandEL = cE('h2');
  const categoryEl = cE('h3');
  const wrapButtonEl = cE('div');
  const inputstockEl = cE('input');
  const buttonBuyEl = cE('button');
  const buttonReturn = cE('button');

  wrapShowEl.setAttribute('id', obj.id);

  overlayEl.className = 'overlay'
  wrapShowEl.className = 'wrap_show';
  wrapImageEl.className = 'wrap_image';
  figureThumbEl.className = 'figure_thumb';
  thumbnailEl.className = 'thumbnail';
  wrapMiniSliderEl.className = 'wrap_miniSlide';
  wrapInfoEl.className = 'wrap_info';
  wrapTextEl.className = 'wrap_text';
  titleEl.className = '';
  descriptionEl.className = '';
  starsEl.className = 'stars';
  stockEl.className = '';
  brandEL.className = '';
  categoryEl.className = '';
  wrapButtonEl.className = 'wrap_button';
  inputstockEl.className = 'stock_input';
  buttonBuyEl.className = 'button_buy';
  buttonReturn.className = 'button_return';

  titleEl.textContent = obj.title;
  descriptionEl.textContent = obj.description;
  stockEl.textContent = `disponibilità n. ${obj.stock}`;
  brandEL.textContent = `brand: ${obj.brand}`;
  categoryEl.textContent = `categoria: ${obj.category}`;
  buttonBuyEl.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>'
  buttonReturn.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>'
  inputstockEl.type = 'number';
  inputstockEl.default = 1;

  thumbnailEl.src = obj.thumbnail;
  thumbnailEl.alt = obj.title;

  for (let i in obj.images) {
    const miniImage = cE('img');
    miniImage.className = 'mini_image';
    miniImage.src = obj.images[i];
    miniImage.alt = obj.images[i];
    wrapMiniSliderEl.appendChild(miniImage);
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

  wrapButtonEl.append(inputstockEl, buttonBuyEl);
  wrapTextEl.append(titleEl, descriptionEl, starsEl, stockEl, brandEL, categoryEl);
  wrapInfoEl.append(wrapTextEl, wrapButtonEl);
  figureThumbEl.appendChild(thumbnailEl);
  wrapImageEl.append(figureThumbEl, wrapMiniSliderEl);
  wrapShowEl.append(wrapImageEl, wrapInfoEl, buttonReturn);
  overlayEl.appendChild(wrapShowEl)
  rootEl.appendChild(overlayEl);

  wrapMiniSliderEl.addEventListener('click', (e) => {
    thumbnailEl.src = e.target.src;
  })

  if (rootEl) {
    buttonReturn.addEventListener('click', () => rootEl.removeChild(overlayEl));
  }
};

/**
 * creazione della modale del carrello
 * @date 18/5/2023 - 11:30:51
 */
const createModal = () => {
  modal.className = 'cart_modal';
  navbar.appendChild(modal);
};

const createLogin = () => {
  const loginOverlay = cE('div');
  const modalLogin = cE('div');
  const backgroundLogin = cE('img');
  const imageLogin = cE('img');
  const loginH2 = cE('h2');
  const loginTextWrapper = cE('form');
  const userName = cE('input');
  const password = cE('input');
  const submit = cE('input');

  loginOverlay.className = 'login_overlay';
  modalLogin.className = 'modal_login';
  backgroundLogin.className = 'background_login';
  imageLogin.className = 'image_login';
  loginTextWrapper.className = 'login_text_wrap';
  userName.className = '';
  password.className = '';
  submit.className = '';

  backgroundLogin.src = './img/—Pngtree—purple abstract wave frame-elegant luxury_6549678.png';
  backgroundLogin.alt = 'Pngtree—purple abstract wave frame';
  imageLogin.src = './img/4d95e433-331d-4e89-a182-ca346c65614b@w1000.png'
  imageLogin.alt = '4d95e433-331d-4e89-a182-ca346c65614b@w1000'
  userName.setAttribute('placeholder', 'username');
  password.setAttribute('placeholder', 'password');
  loginH2.textContent = 'login';
  submit.textContent = 'submit';

  userName.setAttribute('type', 'text');
  password.setAttribute('type', 'password');
  submit.setAttribute('type', 'submit');

  cardWrapper.textContent = '';

  loginTextWrapper.addEventListener('submit', e => {
    e.preventDefault();
    const isAuth = !!dataUsers.find(user =>
      user.userName.toLowerCase() === e.srcElement[0].value.toLowerCase() &&
      user.password.toLowerCase() === e.srcElement[1].value.toLowerCase()
    )
    if (isAuth) {
      setInterval(() => {
        body.removeChild(loginOverlay);
        body.removeChild(modalLogin);
        createCardFnc();
      }, 1200)
      modalLogin.classList.add('login_true');
    } else {
      alert('username or password incorrect');
    }
  });


  loginTextWrapper.append(loginH2, userName, password, submit);
  modalLogin.append(backgroundLogin, imageLogin, loginTextWrapper);
  body.append(loginOverlay, modalLogin);
};


const qS = el => document.querySelector(el);
const cE = el => document.createElement(el);


const cardWrapper = qS('.card_wrapper');
const filterForm = qS('.filter__form');
const navbar = qS('.navbar');
const selectCategory = qS('.filter__select');
const searchbar = qS('.navbar__input');
const burgher = qS('.burgher');
const navLinks = qS('.navbar__links__ul');
const cartButton = qS('.button_buy');
const body = qS('body');
const cart = qS('.cart');
const modal = cE('div');
let listEl = [];
const rootEl = qS('#root');
let quantity = 0;
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

createLogin();

createModal();

selectCategory.addEventListener('change', (e) => {
  if (e.target.value === '') {
    cardWrapper.textContent = "";
    listEl.map(obj => cardWrapper.appendChild(createCard(obj)))
  } else {
    /* Metoo con chiamata API */
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
    /** metodo ricerca con chiamata API e query */
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
    /** Metodo di ricerca con filter nella lista oggetti */
    cardWrapper.textContent = "";
    listEl
      .filter((el) => el.description.toLowerCase().includes(e.target.value.toLowerCase()))
      .forEach((obj) => cardWrapper.append(createCard(obj)))
  }
})

burgher.addEventListener('click', (e) => {
  navLinks.classList.toggle('active');
});

cart.addEventListener('click', (e) => {
  modal.classList.toggle('cart_active');
});