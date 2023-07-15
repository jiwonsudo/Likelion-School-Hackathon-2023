
const productContainer = document.querySelector('.product-container');

// 로컬 스토리지 안 프로덕트 렌더링 총괄 함수
function renderProduct() {
  const localStorageItems = { ...localStorage };
  let cartedProductDOMString = '';
  for (let object in localStorageItems) {
    const itemData = JSON.parse(localStorageItems[object]);
    cartedProductDOMString += renderProductToDOM(itemData);
    console.log(itemData); //test
  }
  productContainer.innerHTML = cartedProductDOMString;
  setCounter();
  setDeleteButton();
  showPriceText();
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
          <span id="${itemData.id}" class="count-indicator">${itemData.quantity}</span>
          <button class="plus-button">+</button>
        </div>
        <div class="delete-selector">
          <button id="${itemData.id}" class="delete-button">삭제</button>
        </div>
      </div>
    </div>
  `;
}


// 프로덕트별 카운터 설정 함수
function setCounter() {
  const minusButtons = document.querySelectorAll('.minus-button');
  const plusButtons = document.querySelectorAll('.plus-button');

  for (const minusButton of minusButtons) {
    minusButton.addEventListener('click', function() {
      const countIndicator = minusButton.nextElementSibling;
      let quantity = Number(countIndicator.textContent);
      if (quantity > 1) {
        countIndicator.textContent = quantity - 1;

        const localStorageItems = { ...localStorage };

        for (let object in localStorageItems) {
          const itemData = JSON.parse(localStorageItems[object]);
          if ((itemData.id).toString() === countIndicator.id) {
            itemData.quantity -= 1;
            localStorage.setItem(itemData.id, JSON.stringify(itemData));
          }
        }
      }
      showPriceText();
    });
  }

  for (const plusButton of plusButtons) {
    plusButton.addEventListener('click', function() {
      const countIndicator = plusButton.previousElementSibling;
      let quantity = Number(countIndicator.textContent);
      if (quantity < 1000) {
        countIndicator.textContent = quantity + 1;

        const localStorageItems = { ...localStorage };
        
        for (let object in localStorageItems) {
          const itemData = JSON.parse(localStorageItems[object]);
          if ((itemData.id).toString() === countIndicator.id) {
            itemData.quantity += 1;
            localStorage.setItem(itemData.id, JSON.stringify(itemData));
          }
        }
      }
      showPriceText();
    });
  }
}

// 프로덕트 삭제 버튼 설정 함수
function setDeleteButton() {
  const deleteButtons = document.querySelectorAll('.delete-button');
  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener('click', function() {
      const deleteProductID = deleteButton.id;
      localStorage.removeItem(deleteProductID);
      renderProduct();
    });
  }
}

// 가격 계산 버튼 구현 함수
function showPriceText() {
  const localStorageItems = { ...localStorage };
  const bottomBtn = document.querySelector('.main-bottom-button');
  const textViewer = document.querySelector('.text-viewer');
  if (localStorage.length === 0) {
    textViewer.innerHTML = '장바구니가 비었습니다.';
    bottomBtn.onclick = 'return false;';
  } else {
    let price = 0;
    for (let object in localStorageItems) {
      const itemData = JSON.parse(localStorageItems[object]);
      price += itemData.price * itemData.quantity;
    }
    let priceResult = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    textViewer.innerHTML = `${priceResult}원 결제하기`;
    bottomBtn.onclick = 'return true';
  }
}

// 주 실행부

renderProduct();