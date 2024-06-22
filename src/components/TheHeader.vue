<script setup>
import SearchIcon from './icons/search-521.vue'
import TheButton from './TheButton.vue'
</script>

<template>
    <header class="header">
        <router-link class="btn-add" to="/cadastrar">Cadastrar fonecedor</router-link>
        <div>
            <router-link to="/">
                <img class="header-logo" src="https://revendamais.com.br/wp-content/uploads/2023/09/logo-revenda-mais.png" alt="Logo"/>
            </router-link>
            <div class="header-container-input">
                <SearchIcon class="search-icon" #icon />
                <input type="text" class="search" placeholder="Busque por nome ou cpf" />
            </div>
        </div>
    </header>
</template>

<style scoped>
    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        box-shadow: 1px 1px 5px #cecece;
        padding: 1.2rem;
    }

    .btn-add {
        color: #b00811;
        border: 1px solid #b00811;
        background-color: #FFF;
        padding: .4rem 1rem;
        width: 180px;
        position: absolute;
        right: 8px;
        top: 8px;
        border-radius: 5px;
    }

    .header > div {
        width: 100%;
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .header-logo {
        width: 150px;
        margin-bottom: 1.2rem;
        margin-top: 2.5rem;
    }

    .header-container-input {
        width: 100%;
        display: flex;
        justify-content: center;
        position: relative
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
        top: 6px;
    }
</style>