<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const myMode = import.meta.env.VITE_MY_MODE;

</script>

<template>
    <div v-if="user">
        <h1>Hi {{user.username}}!</h1>
        <!-- <p>This is <b>({{myMode}})</b> Version</p> -->
        <h5>You're logged in  Tom's Library Web-APP </h5>
        <p>This is <b>({{myMode}})</b> Version</p>
        <div v-if="user && user.role == 'ROLE_ADMIN'">
            <h5>관리자</h5>
            <p><router-link to="/users">Manage Users</router-link></p>
        </div>
    </div>
</template>