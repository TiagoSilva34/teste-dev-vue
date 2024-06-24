<script setup>
import TheForm from "../components/TheForm.vue";
import TheButton from "../components/TheButton.vue";
</script>

<script>
import validateCep from "../utils/validateCep";
import maskCpfCnpj from "../utils/maskCpfCnpj";
import phoneMask from "../utils/phoneMask";
import API from "../config/apiConfig";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  name: "SendFormData",
  data() {
    const route = useRoute();

    const id = computed(() => route.params.id);
    return {
      form: {},
      id,
      showModal: false,
    };
  },
  mounted() {
    API()
      .get("/fornecedores")
      .then((response) => {
        let responseFiltered = response.data.filter(
          (item) => item.id === this.id
        );
        for (let supplier of responseFiltered) {
          this.form = supplier;
        }
      });
  },
  methods: {
    submitForm(supplier) {
      API()
        .put(`/fornecedores/${this.id}`, supplier)
        .then(() => {
          this.showModal = true;
        })
        .catch((err) => console.log(err));
    },
    getStateAndCity() {
      axios
        .get(` https://cep.awesomeapi.com.br/json/${this.form.cep}`)
        .then((response) => {
          if (response.data.cep) {
            this.form.city = response.data.city;
            this.form.state = response.data.state;
          }
        });
    },
    setValidateCpfCnpj() {
      if (this.form.cpf !== "") this.form.cpf = maskCpfCnpj(this.form.cpf);

      if (this.form.cnpj !== "") this.form.cnpj = maskCpfCnpj(this.form.cnpj);
    },
    setValidateCep() {
      this.form.cep = validateCep(this.form.cep);
    },
    setValidatePhone() {
      this.form.contact = phoneMask(this.form.contact);
    },
  },
};
</script>

<template>
  <div class="dialog-container" v-if="showModal === true">
    <div class="dialog">
      <span class="close">x</span>
      <h1>Deseja realmente deletar o fornecedor ?</h1>
      <p>
        Todos os dados serão automaticamente excluídos da base dados ao clicar
        no botão sim.
      </p>
      <div class="dialog-btn-actions">
        <TheButton class="btn-no"
          ><router-link to="/">Fechar</router-link></TheButton
        >
      </div>
    </div>
  </div>
  <h1>Ediatr Forncedor</h1>

  <TheForm v-on:submit.prevent="submitForm(form)">
    <div>
      <input
        required
        v-model="form.factory"
        name="empresa"
        type="text"
        placeholder="Digite o nome  da empresa"
      />
      <input
        required
        v-model="form.contact"
        maxlength="15"
        name="contato"
        type="text"
        placeholder="Digite um telefone de contato"
        @input="setValidatePhone()"
      />
      <input
        required
        v-model="form.email"
        maxlength="15"
        name="email"
        type="text"
        placeholder="Digite um e-mail de contato"
        @input="setValidateEmail()"
      />
      <input
        required
        v-model="form.cep"
        maxlength="8"
        name="cep"
        type="text"
        placeholder="Digite o cep"
        @input="setValidateCep()"
        @change="getStateAndCity()"
      />
    </div>
    <div>
      <input
        required
        v-model="form.state"
        name="estado"
        type="text"
        placeholder="Digite o estado"
      />
      <input
        required
        v-model="form.city"
        name="cidade"
        type="text"
        placeholder="Digite a cidade"
      />
      <input
        required
        v-model="form.city"
        name="bairro"
        type="text"
        placeholder="Digite a bairro"
      />  
      <input
        required
        v-if="form.cnpj !== ''"
        v-model="form.cnpj"
        maxlength="18"
        name="Cnpj"
        type="text"
        placeholder="Digite um CNPJ"
        @input="setValidateCpfCnpj()"
      />
      <input
        required
        v-if="form.cpf !== ''"
        v-model="form.cpf"
        maxlength="14"
        name="cpf"
        type="text"
        placeholder="Digite um CPF"
        @input="setValidateCpfCnpj()"
      />
    </div>
    <TheButton class="btn-register"> Atualizar</TheButton>
  </TheForm>
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

.dialog .btn-no {
  padding: 0.6rem 1.2rem;
  width: 100px;
  border-radius: 5px;
  border: 0;
  margin: 1rem 0;
  font-weight: 400;
}

.dialog .btn-no {
  background-color: #cecece;
  margin-left: 0.6rem;
}

h1 {
  text-align: center;
  color: #d70000;
  font-size: 1.2rem;
  padding: 1.5rem 0;
}

.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main .form-control {
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main .form-control div {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main .form-control div input,
.main .form-control div select {
  width: 100%;
  margin: 0.6rem 0;
  background-color: #eff5fb;
  border: 0;
  padding: 0.8rem 0;
  padding-left: 1rem;
}

.btn-register {
  color: #fff;
  background-color: #b00811;
  padding: 0.6rem 1.2rem;
  width: 160px;
  border-radius: 5px;
  border: 0;
  margin: 1rem 0;
  font-weight: 400;
}

@media (min-width: 800px) {
  h1 {
    font-size: 2rem;
  }

  .main .form-control {
    max-width: 1200px;
  }

  .main .form-control div input,
  .main .form-control div select {
    font-size: 1rem;
  }

  .btn-register {
    font-size: 1rem;
  }
}
</style>
