<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';
import MyPageTemplete from "@/templates/MyPageTemplete.vue";
import Profile from '@/components/Profile.vue';

const route = useRoute();
const userId = route.params.id;
const user = ref([]);
const neighbors = ref([]);
const neighborRequestsReceived = ref([]);
const neighborRequestsSent = ref([]);

const deleteNeighbor = async (neighborId) => {
  try {
    await axios.delete(`http://localhost/api/neighbor/${userId}/${neighborId}`);
    await fetchNeighborData(); // 데이터 새로고침
  } catch (error) {
    console.error('Error deleting neighbor:', error);
  }
};

const acceptNeighborRequest = async (requesterId) => {
  try {
    await axios.post(`http://localhost/api/neighbor/accept/${requesterId}/${userId}`);
    await fetchNeighborData(); // 데이터 새로고침
  } catch (error) {
    console.error('Error accepting neighbor request:', error);
  }
};

const DeleteNeighborRequest = async (memberA, memberB) => {
  try {
    await axios.delete(`http://localhost/api/neighbor/request/${memberA}/${memberB}`);
    await fetchNeighborData(); // 데이터 새로고침
  } catch (error) {
    console.error('Error canceling neighbor request:', error);
  }
};

const fetchNeighborData = async () => {
  try {
    const neighborsResponse = await axios.get(`http://localhost/api/neighbor/${userId}`);
    neighbors.value = neighborsResponse.data;

    const neighborRequestsResponse = await axios.get(`http://localhost/api/neighbor/request/${userId}`);
    const requests = neighborRequestsResponse.data;
    neighborRequestsReceived.value = requests.filter(request => request.memberB === userId);
    neighborRequestsSent.value = requests.filter(request => request.memberA === userId);
  } catch (error) {
    console.error('Error fetching neighbor data:', error);
  }
};

onMounted(async () => {
  try {
    const userResponse = await axios.get(`http://localhost/api/member/${userId}`);
    user.value = userResponse.data;

    await fetchNeighborData();
  } catch (error) {
    console.error('Error on mounted:', error);
  }
});
</script>

<template>
  <MyPageTemplete :userData="user">
    <div id="container">
      <div class="neighbors-container">
        <h2>이웃 목록</h2>
        <div class="neighbors-list">
          <div class="neighbor" v-for="neighbor in neighbors" :key="neighbor.memberB">
            <div class="neighbor-details">
              <Profile :userid="neighbor.memberB" :size="50" />
              <p>{{ neighbor.memberB }}</p>
            </div>
            <button class="styeld-button" @click="deleteNeighbor(neighbor.memberB)">이웃 삭제</button>
          </div>
        </div>
      </div>
      <div class="neighbors-container">
        <h2>받은 이웃 신청</h2>
        <div class="neighbors-list">
          <div class="neighbor" v-for="neighbor in neighborRequestsReceived" :key="neighbor.memberA">
            <div class="neighbor-details">
              <Profile :userid="neighbor.memberA" :size="50" />
              <p>{{ neighbor.memberA }}</p>
            </div>
            <button class="styeld-button" @click="acceptNeighborRequest(neighbor.memberA)">수락</button>
            <button class="styeld-button" @click="DeleteNeighborRequest(neighbor.memberA, userId)">거절</button>
          </div>
        </div>
      </div>
      <div class="neighbors-container">
        <h2>보낸 이웃 신청</h2>
        <div class="neighbors-list">
          <div class="neighbor" v-for="neighbor in neighborRequestsSent" :key="neighbor.memberB">
            <div class="neighbor-details">
              <Profile :userid="neighbor.memberB" :size="50" />
              <p>{{ neighbor.memberB }}</p>
            </div>
            <button class="styeld-button" @click="DeleteNeighborRequest(userId, neighbor.memberB)">신청 취소</button>
          </div>
        </div>
      </div>
    </div>
  </MyPageTemplete>
</template>


<style scoped>
#container {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
}

.neighbors-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 33%;
  height: 100%;
}

.neighbors-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
}

.neighbor {
  display: flex;
  justify-content: space-between;
  /* 요소들 사이에 공간을 균등하게 분배 */
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  margin: 2px;
}

.neighbor-details {
  display: flex;
  align-items: center;
  gap: 10px;
  /* 프로필과 아이디 사이의 간격 */
}

.neighbor-details p {
  margin: 0;
  /* 기본 마진 제거 */
}

.styeld-button {
  background-color: #3662f4;
  /* 붉은색 계열의 배경색 */
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.styeld-button:hover {
  background-color: #2fa4d3;
  /* 호버 시 좀 더 어두운 색상 */
}
</style>
