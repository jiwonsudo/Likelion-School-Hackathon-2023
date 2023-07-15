const productContainer = document.getElementById('menu-container');
const modalScreenCloseBtn = document.querySelector('.modal-close-button');
const modalScreen = document.querySelector('.modal-screen');
const categoryContainer = document.querySelector('.category-container ul');
const totalQuantityIndicator = document.querySelector('.quantity-indicator p');

const cartCookie = document.cookie;

// 프로덕트 렌더링 총괄 함수
function renderProduct(categoryId, productGetResponse) {
  const filteredProducts = productGetResponse
  .filter(item=>item.category.id === categoryId)
  .map(renderProductToDOM)
  .join('');
  productContainer.innerHTML = filteredProducts;
  setModalScreen();
  setCounter();
  setConfirmButton();
}

// 프로덕트 렌더링 컴포넌트 생성 함수
function renderProductToDOM(itemData) {
  return `
    <div class="menu" id="${itemData.id}">
      <div class="menu-image-container">
        <button class="menu-detail-button">
          <img src="./assets/test_image_1.png">
        </button>
      </div>
      <div class="menu-info">
        <h1 class="menu-titie">${itemData.name}</h1>
        <h2 class="menu-price">${itemData.price + '원'}</h2>
      </div>
      <div class="menu-selection-container">
        <div class="quantity-selector">
          <button class="minus-button">-</button>
          <span id="count${itemData.id}" class="count-indicator">0</span>
          <button class="plus-button">+</button>
        </div>
        <div class="confirm-selector">
          <button id="${itemData.id}" class="confirm-button">담기</button>
        </div>
      </div>
    </div>
  `;
}

function renderCategory(categoryGetResponse) {
  const filteredCategories = categoryGetResponse[0].categories
  .map(renderCategoryToDOM)
  .join('');
  categoryContainer.innerHTML = filteredCategories;
}

function renderCategoryToDOM(categoryData) {
  return `
    <li>
      <a href="javascript: renderProduct(${categoryData.id}, productGetResponse);">
        ${categoryData.name}
      </a>
    </li>
  `;
}

// 모달 스크린 설정 함수
function setModalScreen() {
  const modalScreenOpenBtns = document.querySelectorAll('.menu-detail-button');

  for (const modalScreenOpenBtn of modalScreenOpenBtns) {
    modalScreenOpenBtn.addEventListener('click', toggleModalScreen);
  }
  modalScreenCloseBtn.addEventListener('click', toggleModalScreen);
}

// 모달 스크린 토글 함수
function toggleModalScreen() {
  modalScreen.classList.toggle('show');
}

// 프로덕트별 카운터 설정 함수
function setCounter() {
  const minusButtons = document.querySelectorAll('.minus-button');
  const plusButtons = document.querySelectorAll('.plus-button');

  for (const minusButton of minusButtons) {
    minusButton.addEventListener('click', function() {
      const countIndicator = minusButton.nextElementSibling;
      const quantity = Number(countIndicator.textContent);
      if (quantity > 0) {
        countIndicator.textContent = quantity - 1;
      }
    });
  }

  for (const plusButton of plusButtons) {
    plusButton.addEventListener('click', function() {
      const countIndicator = plusButton.previousElementSibling;
      const quantity = Number(countIndicator.textContent);
      if (quantity < 1000) {
        countIndicator.textContent = quantity + 1;
      }
    });
  }
}

// 프로덕트별 담기 버튼 설정 함수
function setConfirmButton() {
  const confirmButtons = document.querySelectorAll('.confirm-button');
  for (const confirmButton of confirmButtons) {
    confirmButton.addEventListener('click', function() {
      const countIndicator = document.getElementById(`count${confirmButton.id}`);
      let quantity = Number(countIndicator.textContent);
      const localStorageItems = { ...localStorage };

      if (quantity > 0) {
        productGetResponse.forEach(item => {
          if (item.id === Number(confirmButton.id)) {
            let selectedProductId = item.id;
            let selectedProductInfo = {};
            if (item.id in localStorageItems) {
              quantity += JSON.parse(localStorageItems[item.id]).quantity;
              selectedProductInfo =  {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: quantity,
              }
            } else {
              selectedProductInfo =  {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: quantity,
              }
            }
            localStorage.setItem(selectedProductId, JSON.stringify(selectedProductInfo));
          }
        });
      }
      countIndicator.textContent = 0;
      totalQuantityIndicator.innerHTML = localStorage.length;
    });
  }
}

// 테스트 데이터

const productGetResponse = [
  {
    "id": 1,
    "category": {
      "id": 1,
      "name": "햄버거"
    },
    "name": "야심작 버거",
    "image_url": "https://.../image.jpg",
    "price": 8000,
    "is_soldout": true
  },
  {
    "id": 99,
    "category": {
      "id": 3,
      "name": "음료"
    },
    "name": "불멸의 에너지",
    "image_url": "https://drive.google.com/.../1021b3a4.jpg",
    "price": 12000,
    "is_soldout": false
  },
]

const categoryGetResponse = [
  {
    "categories": [
      { "id": 1, "name": "버거" },
      { "id": 2, "name": "사이드" },
      { "id": 3, "name": "음료" }
    ]
  }
]

// 이벤트리스너 부착
// Empty

// 데이터 통신부


// 페이지 렌더 시 실행부
renderCategory(categoryGetResponse);
renderProduct(1, productGetResponse);
totalQuantityIndicator.innerHTML = localStorage.length;