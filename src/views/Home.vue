<template>
  <div>
    <h1><span v-if="user.name">{{user.name}}, </span> Seja bem vindo!</h1>
    <p v-if="user.email"><strong>Email: </strong>{{user.email}}</p>
    <p v-if="user.role"><strong>Nivel de acesso: </strong>{{user.role}}</p>
  </div>
</template>

<script>
export default {
    created() {
        this.user.name = this.$route.params.name;
        this.user.email = this.$route.params.email;
        this.user.role = this.$route.params.role;
    },
    data () {
        return {
            user: {}
        }
    }
}
</script>

<style>

</style>