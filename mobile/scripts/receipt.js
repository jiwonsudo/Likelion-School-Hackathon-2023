const orderNumberElement = document.querySelector('.order-info-number');
const orderDateElement = document.querySelector('.order-info-date');
const orderListContainer = document.querySelector('.order-list');
const orderBigNumberElement = document.querySelector('.big-order-number');
const totalPriceElement = document.querySelector('.total-price');

function renderOrderList(orderData) {
  const orderedItemsDomString = orderData.order.items
  .map(renderOrderedItemDOM)
  .join('');
  orderListContainer.innerHTML = orderedItemsDomString;
  orderBigNumberElement.innerHTML = orderData.order.id;
  orderNumberElement.innerHTML = '주문 번호 : ' + orderData.order.id;
  orderDateElement.innerHTML = '주문 날짜 : ' 
  + (orderData.order.created_at).replace('T', ', ');

  const priceResult = orderData.order.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  totalPriceElement.innerHTML = '총 결제 금액 : ' + priceResult + '원';
}

function renderOrderedItemDOM(itemData) {
  const price = itemData['unit-price'] * itemData.quantity;
  const priceResult = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `
    <li>
      <p class="menu-title">${itemData.product_name} X ${itemData.quantity}</p>
      <p class="menu-price">${priceResult}</p>
    </li>
  `;
}

const testData = {
  "order": {
    "id": 1,
    "status": 1,
    "status_name": "접수 전",
    "created_at": "2023-07-05T20:36:55",
    "modified_at": "YYYY-MM-DDThh:mm:ss",
    "items": [
      {
        "product_id": 1,
        "product_name": "야심작 버거",
        "quantity": 1,
        "unit_price": 8000,
      },
      {
        "product_id": 2,
        "product_name": "화끈한 불고기 버거",
        "quantity": 2,
        "unit_price": 5000,
      },
      {
        "product_id": 3,
        "product_name": "불멸의 에너지",
        "quantity": 3,
        "unit_price": 4000,
      }
    ],
    "total_price": 30000
  }
}

renderOrderList(testData);