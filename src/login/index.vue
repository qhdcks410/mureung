<!-- eslint-disable @typescript-eslint/no-unused-vars -->

<script setup lang="ts">
import * as loginApi from '@/api/login.js'
import {ref} from "vue";
import {useLoginStore} from "@/store/login";
import { useRouter } from "vue-router";

const username = ref();
const password = ref();
const loginForm = ref();
const loginStore = useLoginStore();
const router = useRouter();

//login Logic
const login = async () => {
    try {
        // Your login logic here
        const response = await loginApi.login(username.value, password.value);

        if (response.status === 200) {
            await loginStore.setToken(response.data.token);
            localStorage.setItem('access_token', response.data.token)
            await loginStore.getUserInfo();

            await router.push({path: '/'})
        }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e : any) {
        alert(e.response.data.message)
    }
}

//Validation loginForm
async function validation (){
    const { valid } = await loginForm.value.validate();

    if (valid) await login();
    else {
        alert('로그인 양식에 맞지 않습니다.')
    }
}
const usernameRules = ref([
    value => {
        if (value) return true
        return '아이디를 적어주세요.'
    },
])
const passwordRules = ref([
    value => {
        if (value) return true
        return '비밀번호를 적어주세요.'
    },
])

const visible = ref(false)

</script>
<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a>
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        <!-- <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
        </v-card-text> -->
      </v-card>

      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
      >
        Log In
      </v-btn>

      <!-- <v-card-text class="text-center"> -->
        <!-- <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a> -->
      <!-- </v-card-text> -->
    </v-card>
  </div>
</template>
