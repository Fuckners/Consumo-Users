<template>
    <div>
        <h1 class="title is-1">Painel ADM</h1>

        <div class="columns is-centered">
            <h2 @click="openlista" class="lista" v-if="!lista">Lista de usuários ˅</h2>
            
            <div class="column is-three-quarters" v-else>
                <h2 @click="openlista" class="lista">Lista de usuários ˄</h2>
                <table class="table is-hoverable is-bordered is-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Cargo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(usuario, index) in usuarios" :key="index">
                            <td>{{ usuario.id }}</td>
                            <td>{{ usuario.name }}</td>
                            <td>{{ usuario.email }}</td>
                            <td>{{ usuario.role }}</td>
                            <td>
                                <router-link :to="{ name: 'edit', params: {id, name, email, role} = usuario }">
                                    <button class="button is-warning">Editar</button>
                                </router-link>
                                <button class="button is-danger" @click="openModal(usuario.id)">Deletar</button>
                                </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div id="modal" :class="{ 'modal': true, 'is-active': showModal }">
        <div class="modal-content">
            <p>Deseja deletar este usuário?</p>
            <button id="yes" class="button is-success" @click="delUser()">Sim!</button>
            <button id="no" class="button is-danger" @click="closeModal">Não.</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            req: { headers: { Authorization: '' } },
            lista: true,
            usuarios: '',
            showModal: false,
            userID: ''
        }
    },
    async created() {
        this.req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        await this.searchUsers();
    },
    methods: {
        async searchUsers() {
            try {
                this.usuarios = (await axios.get('http://localhost:6969/users', this.req)).data;
            } catch (error) {
                console.error('nenhum usuário foi encontrado!');
            }
        },
        openlista() {
            this.lista = !this.lista;
        },
        openModal(id) {
            this.showModal = true;
            this.userID = id;
        },
        closeModal() {
            this.showModal = false;
        },
        async delUser() {
            console.log(this.userID);
            try {
                await axios.delete(`http://localhost:6969/user/${this.userID}`, this.req);
            } catch (error) {
                console.log('Não foi possível deletar o usuário');
            }

            this.userID = '';
            this.closeModal();
            this.searchUsers();
        }
    }
}
</script>

<style scoped>
h2.lista {
    cursor: pointer;
}

table {
    margin: auto
}

.modal {
    background-color: transparent;
    backdrop-filter: blur(2px);
}

.modal-content {
    background-color: aliceblue;
    border-radius: 15px;
    padding: 10px;
    width: fit-content;
}

button.is-danger {
    margin-left: 10px;
}
</style>