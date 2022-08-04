<template>
  <div @change="delError">
    <h1 class="title is-1">Login</h1>
    <hr>
    <div class="columns is-centered">
      <div class="column is-half">
        <label for="email" class="label">Email:</label>
        <input type="email" :class="[ erro ? 'is-danger' : '' ]" id="email" v-model="email" placeholder="Email de usuário" required class="input is-normal">

        <label for="password" class="label">Senha:</label>
        <input type="password" :class="[ erro ? 'is-danger' : '' ]" id="password" v-model="password" @keypress.enter="logar" placeholder="Senha de usuário" required class="input is-normal">
        <br><br>
        <small class="has-text-danger">{{ erro }}</small>
        <br>
        <button type="submit" @click="logar" class="button is-light">Logar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
      return { 
        email: '',
        password: '',
        erro: ''
       }
  },
  methods: {
    async logar() {
      this.erro = ''
      try {
        const response = await axios.post('http://localhost:6969/login', { email: this.email, password: this.password });

        const token = response.data.token
        
        localStorage.setItem('token', token);
        console.log('logado!');

        const req = { headers: { authorization: `Bearer ${token}` } }

        const user = (await axios.get(`http://localhost:6969/user/${this.email}`, req)).data;

        this.$router.push({ name: 'home', params: { name: user.name, email: user.email, role: user.role } });

      } catch (error) {
        this.erro = error.response.data.err
      }
    },
    delError() {
      this.erro = ''
    }
  }
}
</script>

<style scoped>
  h1 {
    font-family: Trebuchet MS, sans-serif;
  }
</style>