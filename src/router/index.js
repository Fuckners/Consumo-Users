import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '../views/Register.vue';
import LoginView from '../views/Login.vue';
import UsersView from '../views/Users';
import HomeView from '../views/Home';
import EditView from '../views/Edit.vue';
import axios from 'axios';

async function admAuth(to, from, next) {
  try {
    const req = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    await axios.post('http://localhost:6969/tokenValidate', {}, req);
    next();
  } catch (error) {
    next('/login');
  }
}

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
    beforeEnter: admAuth
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
