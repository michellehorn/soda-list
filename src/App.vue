<template>
  <div id="app">
    <div class="container form-inline">
      <div class="col-md-6 col-lg-6 col-sm-12 card p-2 pt-4 bg-light half-card">
        <h4 class="text-dark font-weight-bold">Shopping List</h4>
        <div class="p-2 pt-4">
          <div class="form-inline">
            <div class="col-9">
              <select class="form-control w-100" v-model="itemSelected">
                <option
                  v-for="(item, index) in itemsList"
                  :key="index"
                  :value="item"
                >{{ item.sabor }} {{ item.quantidade }}</option>
              </select>
            </div>
            <div class="col-3">
              <h4 class="text-dark font-weight-bolder item-value">R$ {{ itemSelected.valor }}</h4>
            </div>
            <div class="ml-auto">
              <h6 class="text-danger" v-show="itemSelected.comprado">Vendido</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-6 col-sm-12 card p-2 pt-4 half-card">
        <h4 class="text-dark font-weight-bold">Total</h4>
        <div class="form-inline">
          <div class="col-md-6 col-sm-12 col-lg-6 p-2">
            <div class="bg-dark card p-2">
              <h2 class="text-light">{{ sold }}</h2>
              <h6 class="text-light">Total de Refrigerantes Vendidos</h6>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 col-lg-6 p-2">
            <div class="bg-primary card p-2">
              <h2 class="text-light">{{ this.itemsList.length }}</h2>
              <h6 class="text-light">Total de Refrigerantes</h6>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-sm-12 col-lg-12 p-2">
          <div class="bg-secondary card p-2">
            <h2 class="text-light">{{ soldValue }}</h2>
            <h6 class="text-light">Total Valor Vendido</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "./services/sodas.service";
import "./assets/style.scss";

export default {
  name: "app",
  components: {},
  props: {
    soldValue: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
  },
  data: () => ({
    itemsList: [],
    allBrandQuantity: [],
    itemSelected: String,
  }),
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const response = await Api().get();
      this.itemsList = response.data;
      for (let i = 0; i < this.itemsList.length; i++) {
        this.allBrandQuantity.push(
          this.itemsList[i].sabor + " " + this.itemsList[i].quantidade
        );
        if (this.itemsList[i].comprado) {
          this.sold = this.sold + 1;
          this.soldValue = this.soldValue + this.itemsList[i].valor;
        }
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
  background-color: #eee;
  height: 100vh;
  width: 100vw;
}
</style>
