<script setup>
import TheForm from "../components/TheForm.vue";
import TheButton from "../components/TheButton.vue";
import validateCep from "../utils/validateCep";
import maskCpfCnpj from "../utils/maskCpfCnpj";
import phoneMask from "../utils/phoneMask";
import validateEmail from "../utils/validateEmail"
</script>

<script>
import API from "../config/apiConfig";
import axios from "axios";
export default {
  name: "SendFormData",
  data() {
    return {
      form: {
        factory: "",
        contact: "",
        email: "",
        cep: "",
        state: "",
        city: "",
        district: "",
        cpf: "",
        cnpj: "",
        option: "Selecione CPF ou CNPJ",
      },
      showModal: false,
      cnpjErrorMessage: "",
    };
  },
  methods: {
    submitForm() {
      if (this.form.option === "Selecione CPF ou CNPJ") this.form.option = "";

      API()
        .post("/fornecedores", this.form)
        .then(() => {
          this.showModal = true;
        })
        .catch((err) => console.log(err));
    },
    checkIfISValidCNPJ(cnpj) {
      let cnpjFormatted = cnpj.replace(/[^0-9]/g, "");

      axios
        .get(`https://brasilapi.com.br/api/cnpj/v1/${cnpjFormatted}`)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          let status = err.response.status;
          if (status) {
            this.cnpjErrorMessage =
              status === 400
                ? `${err.response.data.message} Por favor, Digite um CNPJ válido` 
                : `${err.response.data.message} CNPJ não se encontra cadastrado na base da Receita Federal`;
          }
        });
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
      this.cnpjErrorMessage = ""

      if (this.form.cpf !== "") this.form.cpf = maskCpfCnpj(this.form.cpf);

      if (this.form.cnpj !== "") this.form.cnpj = maskCpfCnpj(this.form.cnpj);
    },
    setValidateCep() {
      this.form.cep = validateCep(this.form.cep);
    },
    setValidatePhone() {
      this.form.contact = phoneMask(this.form.contact);
    },
    setValidateEmail() {
      this.form.email = phoneMask(this.form.email);
    },
  },
};
</script>

<template>
  <div class="dialog-container" v-if="showModal === true">
    <div class="dialog">
      <span class="close">x</span>
      <h1>Dados cadastrados com sucesso</h1>
      <div class="dialog-btn-actions">
        <TheButton class="btn-no"
          ><router-link to="/">Fechar</router-link></TheButton
        >
      </div>
    </div>
  </div>

  <h1>Cadastrar Forncedor</h1>

  <TheForm v-on:input="validFields()" v-on:submit.prevent="submitForm()">
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
        v-model="form.contact"
        maxlength="15"
        name="cemail"
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
        v-model="form.bairro"
        name="bairro"
        type="text"
        placeholder="Digite a bairro"
      />
      <select v-model="form.option" name="option">
        <option>Selecione CPF ou CNPJ</option>
        <option value="cpf">CPF</option>
        <option value="cnpj">CNPJ</option>
      </select>
      <input
        required
        v-if="form.option === 'cnpj'"
        v-model="form.cnpj"
        maxlength="18"
        name="Cnpj"
        type="text"
        placeholder="Digite um CNPJ"
        @change="checkIfISValidCNPJ(form.cnpj)"
        @input="setValidateCpfCnpj()"
      />
      <input
        required
        v-if="form.option === 'cpf'"
        v-model="form.cpf"
        maxlength="14"
        name="cpf"
        type="text"
        placeholder="Digite um CPF"
        @input="setValidateCpfCnpj()"
      />
      <p class="error-message">{{ cnpjErrorMessage }}</p>
    </div>
    <TheButton class="btn-register"> Cadastrar </TheButton>
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

.dialog .btn-yes,
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

.error-message {
  color: #b00811;
  font-size: 1rem;
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
