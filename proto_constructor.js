'use strict';

// Задание № 1
console.log(`===== Задание № 1 =====`);

var positions = [
  {
    title: 'Телепорт бытовой VZHIH-101',
    price: 10000,
    discount: 7,
    available: 3
  },
  {
    title: 'Ховерборд Mattel 2016',
    price: 9200,
    discount: 4,
    available: 14
  },
  {
    title: 'Меч световой FORCE (синий луч)',
    price: 57000,
    discount: 0,
    available: 1
  }
];

const itemPrototype = {
  hold(amount = 1) {
    if (this.available < amount) {
      return false;
    }
    this.available -= amount;
    this.holded += amount;
    return true;
  },

  unhold(amount = this.holded) {
    if (this.holded < amount) {
      return false;
    }
    this.available += amount;
    this.holded -= amount;
    return true;
  },

  toString() {
    return `${this.title} (остаток ${this.available}, в резерве ${this.holded})`;
  }
};

function createItem(title, amount) {
  const item = Object.create(itemPrototype);
  item.title = title;
  item.available = amount;
  item.holded = 0;
  return item;
}

const items = [];
for (let item of positions) {
  items.push(createItem(item.title, item.available));
}

items[0].hold(2);
items[1].hold(8);
items[1].hold(12);
items[2].hold(1);

for (let item of items) {
  console.log(`Товар ${item}`);
}
console.log(`=====`);

items[0].unhold(1);
items[1].unhold(2);
items[1].unhold(2);
items[2].unhold();

for (let item of items) {
  console.log(`Товар ${item}`);
}

// Задание № 2
console.log(`===== Задание № 2 =====`);


const config = {
  get() {
    return this.price - (this.price * this.discount / 100);
  },

  set(amount) {
    try {
      if (amount > this.price) {
        throw new Error('Финальная стоимость превышает обычную!');
      }

      this.discount = ((this.price - amount) / this.price * 100).toFixed(1);

    } catch (e) {
      console.log(e.message);
    }
  }
}

positions.forEach((item) => {
  Object.defineProperty(item, 'finalPrice', config)
});

console.log(positions[0].finalPrice); // 9300
positions[2].finalPrice = 28500;
console.log(positions[2].discount); // 50
positions[2].finalPrice = 58500; // Финальная стоимость превышает обычную!
console.log(positions[2].discount); // 50
console.log(positions[2].finalPrice); // 28500
positions[2].finalPrice = 56700;
console.log(positions[2].discount); // 0.5

//Задание № 3
console.log(`===== Задание № 3 =====`);

const requiredFields = ['title', 'price', 'discount'];
let form1 = {
  title: 'Товар Телепорт бытовой VZHIH-101',
  price: 7800,
  discount: 0
};
let form2 = {
  title: 'Товар Телепорт бытовой VZHIH-101',
  discount: 10
};
let form3 = {
  title: 'Товар Телепорт бытовой VZHIH-101',
  price: 7800,
};
let form4 = {
  title: 'Товар Телепорт бытовой VZHIH-101',
  price: 7800,
  discount: 0
};

if (isValidPosition(form1, requiredFields)) {
  console.log('Форма № 1 заполнена верно');
} else {
  console.log('В форме № 1 не заполнены необходимые поля');
}

if (isValidPosition(form2, requiredFields)) {
  console.log('Форма № 2 заполнена верно');
} else {
  console.log('В форме № 2 не заполнены необходимые поля');
}

if (isValidPosition(form3, requiredFields)) {
  console.log('Форма № 3 заполнена верно');
} else {
  console.log('В форме № 3 не заполнены необходимые поля');
}

if (isValidPosition(form4, requiredFields)) {
  console.log('Форма № 4 заполнена верно');
} else {
  console.log('В форме № 4 не заполнены необходимые поля');
}

function isValidPosition(form, fields) {
  let result = true;

  fields.forEach((item) => {
    if (!form.hasOwnProperty(item)) {
      result = false;
    }
  });

  return result;
}
