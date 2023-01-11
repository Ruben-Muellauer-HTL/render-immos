const { createApp } = Vue;

const myApp = {
  data() {
    return {
      immos: [],
      edit: false,
      create: false,
      price: '',
      id: '',
      itemID: null,
      newTitle: '',
      newPrice: '',
      newCode: '',
      newCity: '',
      newCountry: '',
    };
  },
  methods: {
    async GetData() {
      const { data } = await axios.get('/immos');
      this.immos = data;
    },
    async DelData(id) {
      await axios.delete(`/immos/${id}`);
      this.GetData();
    },
    async EditData(id) {
      if (this.itemID == id) {
        this.itemID = null;
        this.edit = false;
        this.price = '';
        this.id = '';
      } else {
        this.itemID = id;
        this.edit = true;
        this.price = this.immos.filter((el) => el.id == id).map((el) => el.price);
        this.id = id;
      }
    },
    async ChangeData() {
      await axios.patch(`/immos/${this.id}`, { price: this.price });
      this.GetData();
    },
    async CreateData() {
      if (
        this.newTitle != '' &&
        this.newCity != '' &&
        this.newCode != '' &&
        this.newCountry != '' &&
        this.newPrice != ''
      ) {
        await axios.post(`/immos`, {
          title: this.newTitle,
          postCode: this.newCode,
          city: this.newCity,
          country: this.newCountry,
          price: this.newPrice,
          id: this.immos[this.immos.length - 1].id + 1,
        });
        this.GetData();
      }
    },
  },
};

createApp(myApp).mount('#app');
