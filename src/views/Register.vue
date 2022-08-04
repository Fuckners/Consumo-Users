<template>
  <div @change="delError">
    <h1 class="title is-1">Registro de Usuários</h1>
    <hr>
    <div class="columns is-centered">
      <div class="column is-half">
        <label for="name" class="label">Nome:</label>
        <input type="text" id="name" v-model="name" placeholder="xxExemploxx_" required class="input is-normal">

        <label for="email" class="label">Email:</label>
        <input type="email" id="email" v-model="email" placeholder="exemplo@exemplo.com" required class="input is-normal">

        <label for="password" class="label">Senha:</label>
        <input type="password" :class="[validPassword === 'none' ? '' : validPassword ? 'is-success' : 'is-danger']" id="password" v-model="password" placeholder="********" required class="input is-normal">

        <label for="repassword" class="label">Confirmar senha:</label>
        <input type="password" :class="[validPassword === 'none' ? '' : validPassword ? 'is-success' : 'is-danger']" id="repassword" v-model="repassword" placeholder="********" required class="input is-normal">
        <br><br>
        <small class="has-text-danger">{{ erro }}</small>
        <br>
        <button type="submit" @click="cadastrar" class="button is-light">Cadastrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
      return { 
        name: '',
        email: '',
        password: '',
        repassword: '',
        erro: '',
        validPassword: 'none'
       }
  },
  methods: {
    passwordValidate() {
      if (this.password === this.repassword && /^\w{8,}$/.test(this.password)) {
        this.validPassword = true
      } else if (this.password === '' && this.repassword === '') {
        this.validPassword = 'none'
      }else {
        this.validPassword = false
      }
    },
    async cadastrar() {
      this.erro = ''
      if (this.validPassword !== true) {
        this.erro = 'Senha inválida.';
      } else {
        try {
          const response = await axios.post('http://localhost:6969/user', { email: this.email, name: this.name, password: this.password });
          // this.name = ''
          // this.email = ''
          // this.password = ''
          // this.repassword = ''
          console.log(response);
          this.$router.push({ name: 'login' });
        } catch (error) {
          this.erro = error.response.data.err;
        }
      }
    },
    delError() {
      this.erro = ''
    }
  },
  watch: {
    password: {
      handler() {
        this.passwordValidate();
      }
    },
    repassword: {
      handler() {
        this.passwordValidate();
      }
    }
  }
}
</script>

<style scoped>
  h1 {
    font-family: Trebuchet MS, sans-serif;
  }
</style>