const app = new Vue({
  el: '#app',
  data: {
    message: 'winter',
    books: [
      {name: '《算法导论》', time: '2006-9', price: 85, number: 1},
      {name: '《Unix编程艺术》', time: '2006-2', price: 59, number: 1},
      {name: '《编程珠玑》', time: '2008-10', price: 39, number: 1},
      {name: '《代码大全》', time: '2006-3', price: 128, number: 1}
    ]
  },
  computed: {
    totalPrice() {
      let total = 0;
      for (let book of this.books) {
        total+= book.price * book.number;
      }
      return total;
    }
  },
  methods: {
    decrement(book) {
      if(book.number>1) {
        book.number--;
      } else {
        this.deleteItem();
      }

  
    },
    increment(book) {
      book.number++;
    },
    deleteItem(index) {
      this.books.splice(index, 1);
    }
  }
});