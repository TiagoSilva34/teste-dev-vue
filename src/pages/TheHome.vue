<script setup>
import TheButton from '../components/TheButton.vue'
import axios from 'axios'
</script>

<script>
export default {
  mounted() {
            axios({ method: "GET", "url": "https://jsonplaceholder.typicode.com/todos" }).then(result => {
               console.log(result)
            }, error => {
                console.error(error);
            });
        },
}
</script>

<template>
  <table>
    <h1>Conheça todos os nossos fornecedores</h1>
    <thead class="table-header">
      <tr>
        <td>Empresa</td>
        <td>CNPJ / CPF</td>        
        <td>Açoes</td>

      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Empresa fantasia</td>
        <td>66.298.251/0001-02</td>
        <td class="table-btn-actions">
          <TheButton class="btn-edit">edit</TheButton>
          <TheButton class="btn-remove">x</TheButton>
        </td>
      </tr>
      <tr>
        <td>Empresa fantasia</td>
        <td>66.298.251/0001-02</td>
        <td class="table-btn-actions">
          <TheButton class="btn-edit">edit</TheButton>
          <TheButton class="btn-remove">x</TheButton>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
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
    color: #FFF;
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
