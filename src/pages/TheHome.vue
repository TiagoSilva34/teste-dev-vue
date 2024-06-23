<script setup>
import TheButton from "../components/TheButton.vue";
import axios from "axios";
import SearchIcon from '../components/icons/search-521.vue'

</script>

<script>
export default {
  data() {
    return {
      suppliers: [],
      allSupliers : [],
      response: "",
      search: ""
    };
  },

  mounted() {
    axios.get("http://localhost:3000/fornecedores").then((response) => {
      this.suppliers = response.data;
      this.allSupliers = response.data
    });
  },

  methods: {
    searchByNameOrCpfCnpj() {
      axios.get("http://localhost:3000/fornecedores")
        .then(res => {
          if (this.search) {
            this.allSupliers = res.data.filter(people =>
              people.empresa.toLowerCase().includes(this.search.toLowerCase())
            );
          } 
        });
    },

    
  },
  created() {
    this.searchByNameOrCpfCnpj();
  }
  
};
</script>

<template>
  <div class="header-container-input">
    <SearchIcon class="search-icon" #icon />
    <input v-model="search" type="text" class="search" placeholder="Busque por nome ou cpf" @input="searchByNameOrCpfCnpj()"/>
  </div>
  <table>
    <h1>Conheça todos os nossos fornecedores</h1>
    <thead class="table-header">
      <tr>
        <td>Empresa</td>
        <td>CNPJ / CPF</td>
        <td>Açoes</td>
      </tr>
    </thead>
    <tbody v-for="supplier in allSupliers" :key="supplier.id">
      <tr>
        <td>{{ supplier.empresa }}</td>
        <td>{{ supplier.cnpj }}</td>
        <td class="table-btn-actions">
          <TheButton class="btn-edit">edit</TheButton>
          <TheButton class="btn-remove">x</TheButton>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>

.header-container-input {
  width: 80%;
  display: flex;
  justify-content: center;
  position: relative;
  bottom: 50px;
}

.search {
  padding: .8rem 0;
  width: 100%;
  background-color: #eff5fb;
  border: 0;
  border-radius: 5px;
  padding-left: 1.8rem;
}


.header-container-input > .search-icon {
  position: absolute;
  left: 8px;
  top: 10px;
}

h1 {
  text-align: center;
  color: #d70000;
  font-size: 1.2rem;
  padding: 1.5rem 0;
}

table {
  width: 100%;
  display: flex;
  flex-direction: column;
}

table thead {
  background-color: #d70000;
  color: #fff;
}

table tbody {
  background-color: #eff5fb;
  color: #8c8181;
}

table thead,
table tbody {
  width: 100%;
}

table thead tr,
table tbody tr {
  width: 100%;
  display: flex;
  padding: 1.2rem 0;
  justify-content: space-between;
}

table thead tr td,
table tbody tr td {
  width: 33.33%;
  text-align: center;
}

.table-btn-actions {
  width: 10%;
}

.btn-remove {
  color: #d70000;
}
@media (min-width: 1024px) {
}
</style>
