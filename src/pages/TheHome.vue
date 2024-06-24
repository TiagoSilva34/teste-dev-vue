<script setup>
import TheButton from "../components/TheButton.vue";
import SearchIcon from "../components/icons/search-521.vue";
</script>

<script>
import API from "../config/apiConfig";
export default {
  data() {
    return {
      showModel: false,
      allSupliersLength: 0,
      allSupliers: [],
      search: "",
      data: {},
    };
  },

  mounted() {
    API()
      .get("/fornecedores")
      .then((response) => {
        this.allSupliers = response.data;
        this.allSupliersLength = response.data.length;
      });
  },

  methods: {
    handleOpenModal(supplier) {
      this.data = supplier;
      this.showModel = true;
    },
    handleDelete() {
      API()
        .delete(`/fornecedores/${this.data.id}`)
        .then(() => {
          window.location.reload();
        });
    },
    searchByNameOrCpfCnpj() {
      API()
        .get("/fornecedores")
        .then((res) => {
          if (this.search) {
            this.allSupliers = res.data.filter((people) =>
              people.empresa.toLowerCase().includes(this.search.toLowerCase())
            );
          }
        });
    },
  },

  created() {
    this.searchByNameOrCpfCnpj();
  },
};
</script>

<template>
  <div class="dialog-container" v-if="showModel === true">
    <div class="dialog">
      <span class="close">x</span>
      <h1>Deseja realmente deletar o fornecedor {{ data.factory }}?</h1>
      <p>
        Todos os dados serão automaticamente excluídos da base dados ao clicar
        no botão sim.
      </p>
      <div class="dialog-btn-actions">
        <TheButton class="btn-yes" @click="handleDelete()">Sim</TheButton>
        <TheButton class="btn-no" @click="showModel = false">Não</TheButton>
      </div>
    </div>
  </div>
  <div class="header-container-input">
    <SearchIcon class="search-icon" #icon />
    <input
      v-model="search"
      type="text"
      class="search"
      placeholder="Busque por nome ou cpf"
      @input="searchByNameOrCpfCnpj()"
    />
  </div>
  <h1 v-if="allSupliersLength === 0" class="message-info">
    Não há nenhum fornecedor cadastrado no momento
  </h1>
  <table v-if="allSupliersLength > 0">
    <h1>Conheça todos os nossos fornecedores</h1>
    <thead>
      <tr>
        <td>Empresa</td>
        <td>CNPJ / CPF</td>
        <td>Açoes</td>
      </tr>
    </thead>
    <tbody v-for="supplier in allSupliers" :key="supplier.id">
      <tr>
        <td>{{ supplier.factory }}</td>
        <td>{{ supplier.cnpj || supplier.cpf }}</td>
        <td class="table-btn-actions">
          <TheButton class="btn-edit">
            <router-link :to="{ name: 'editar', params: { id: supplier.id } }"
              >edit</router-link
            >
          </TheButton>
          <TheButton
            type="button"
            class="btn-remove"
            @click="handleOpenModal(supplier)"
            >x</TheButton
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.dialog-container {
  background-color: rgba(0, 0, 0, 0.5);
  inset: 0;
  position: fixed;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.dialog {
  width: 400px;
  height: 250px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.dialog .close {
  position: absolute;
  right: 10px;
  height: 30px;
  width: 30px;
  z-index: 100;
  color: #d70000;
  font-size: 1.4rem;
  background-color: #cecece;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 50px;
}

.dialog h1 {
  text-align: center;
  color: #d70000;
  font-size: 1.2rem;
}

.dialog p {
  text-align: center;
  color: #d70000;
  font-size: 0.8rem;
}

.dialog .btn-yes,
.dialog .btn-no {
  padding: 0.6rem 1.2rem;
  width: 100px;
  border-radius: 5px;
  border: 0;
  margin: 1rem 0;
  font-weight: 400;
}

.dialog .btn-yes {
  color: #fff;
  background-color: #b00811;
  margin-right: 0.6rem;
}

.dialog .btn-no {
  background-color: #cecece;
  margin-left: 0.6rem;
}

.header-container-input {
  width: 80%;
  display: flex;
  justify-content: center;
  position: relative;
  bottom: 50px;
}

.search {
  padding: 0.8rem 0;
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
  width: 15%;
  text-align: center;
}

.table-btn-actions {
  width: 10%;
  border: 0;
}

button {
  border: 0;
  font-size: 1.2rem;
}

.btn-remove {
  color: #d70000;
  margin-left: 0.4rem;
}

@media (min-width: 800px) {
  table {
    max-width: 900px;
    font-size: 1.2rem;
  }

  .header-container-input {
    width: 40%;
    display: flex;
    justify-content: center;
    position: relative;
    bottom: 80px;
  }

  table thead tr,
  table tbody tr {
    width: 100%;
    justify-content: space-around;
  }

  table thead tr td,
  table tbody tr td {
    width: 15%;
  }
}
</style>
