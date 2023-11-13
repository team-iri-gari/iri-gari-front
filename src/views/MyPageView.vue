<template>
    <div>
        <h1>마이페이지</h1>
        <div v-if="userInfo">
            <p>{{ userInfo }}</p>
            <!-- 여기에 필요한 사용자 정보를 더 표시 -->
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            userInfo: null
        };
    },
    
    created() {
        this.decodeToken();
    },

    methods: {
        decodeToken() {
            const token = localStorage.getItem('token');
            if (token) {
                const payload = token.split('.')[1];
                if (payload) {
                    this.userInfo = JSON.parse(atob(payload));
                }
            }
        }
    }
};
</script>