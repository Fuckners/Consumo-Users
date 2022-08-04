<template>
    <div>
        <h1 class="title is-1">Editar usuário</h1>
        <hr>
        <div class="columns is-centered">
            <div class="column is-half">
                <label for="name" class="label">Nome:</label>
                <input type="text" class="input" id="name" v-model="name">

                <label for="email" class="label">Email:</label>
                <input type="text" class="input" id="email" v-model="email">

                <label for="role" class="label">Cargo</label>
                <input type="text" class="input" id="role" v-model="role">
                <small v-if="erro"><p class="has-text-danger">{{ erro }}</p></small>
                <button type="submit" class="button success" @click="editUser">Editar</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            req: { headers: { Authorization: '' } },
            id: '', 
            name: '', 
            email: '', 
            role: '',
            erro: false
        }
    },
    created() {
        this.req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        this.id = this.$route.params.id,
        this.name = this.$route.params.name,
        this.email = this.$route.params.email,
        this.role = this.$route.params.role
    },
    methods: {
        async editUser() {
            try {
                await axios.put(`http://localhost:6969/user/${this.id}`, { email: this.email, name: this.name, role: this.role }, this.req);
            } catch (error) {
                console.log(error);
                this.erro = error.response.data.err;
            }

            this.$router.push({ name: 'users' });
        }
    }
}
</script>

<style scoped>
    button {
        margin-top: 20px;
    }
</style>