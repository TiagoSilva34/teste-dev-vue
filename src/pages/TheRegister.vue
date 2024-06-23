<script setup>
import TheHeader from "../components/TheHeader.vue";
import TheInput from "../components/TheInput.vue";
import TheButton from "../components/TheButton.vue";
import validateCpfCnpj from '../utils/validateCpfCnpj';
import maskCpfCnpj from '../utils/validateCpfCnpj'

function getValidationCpfCnpj(value) {
  console.log(value)
  validateCpfCnpj(value)
}
</script>

<template>
    <TheInput>
      <div>
        <input type="text" placeholder="Digite seu nome" />
        <input type="text" placeholder="Digite seu Sobrenome" />
        <div></div>
        <input type="text" placeholder="Digite o nome  da empresa" />
        <input type="text" placeholder="Digite um telefone de contato" />
      </div>
      <div>
        <input type="text" placeholder="Digite o cep" />
        <input type="text" placeholder="Digite o estado" />
        <input type="text" placeholder="Digite a cidade" />
        <input type="text" placeholder="digite um CPF / CNPJ" :value="text" @input="event => text = getValidationCpfCnpj(event.target.value)"/>
      </div>
    </TheInput>
    <TheButton class="btn-register"> Cadastrar </TheButton>
</template>

<style scoped>
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
}

.main .form-control div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main .form-control div input {
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

@media (min-width: 1024px) {
}
</style>
