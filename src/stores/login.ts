import {defineStore} from "pinia";
import {ref} from "vue";
import loginApi from '@/api/login'


export const useLoginStore = defineStore("login", () => {
    //state
    const token = ref(null);
    const userNo = ref(null);
    const username = ref(null);
    const role = ref(null);

    //actions
    const  setToken = async  (newToken) => {
        token.value = newToken;
    }

    //유저 정보
    async function getUserInfo() {
        try {
            const localToken = localStorage.getItem('access_token');
            const response = await loginApi.getUserInfo(localToken);

            token.value = localToken;
            userNo.value = response.data.data.userNo;
            username.value = response.data.data.username;
            role.value = response.data.data.role;
        } catch (e) {
            localStorage.removeItem('access_token');
        }
    }

    return {
        token,
        userNo,
        username,
        role,
        setToken,
        getUserInfo,
    }
})
