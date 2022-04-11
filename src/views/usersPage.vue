<template>
  <div class="user-page">
    <b-button
      variant="danger"
      class="user-page__delete-user"
      title="Удалить клиента"
      :disabled="funcButtonDisabled"
      v-b-modal.delete-user
    >
      <b-icon icon="x-circle" scale="1.5"></b-icon>
    </b-button>
    <b-button
      variant="success"
      class="user-page__add-user"
      title="Добавить клиента"
      :disabled="funcButtonDisabled"
      v-b-modal.add-user
    >
      <b-icon icon="plus" scale="1.5"></b-icon>
    </b-button>
    <h2>Перечень клиентов</h2>
    <template v-cloak>
      <div class="user-page__empty" v-if="usersIsAbsent">
         <p>Клиенты отсутствуют</p>
      </div>
    </template>
    <b-spinner type="grow" class="user-page__loader" v-show="preloaderActive"></b-spinner>
    <div class="user-page__empty" v-if="wrongData">
      <p>Не удалось получить данные, повторите попытку</p>
    </div>
    <custom-table v-else-if="showTable" :field="fields" :items="users" :type="'users'"></custom-table>
    <b-modal
      id="delete-user"
      title="Удалить пользователя"
      :ok-disabled="okDisabledDeleteUser"
      @ok="deleteUser"
      hide-header-close
    >
      <div class="pt-2">
        <label for="user-id" class="popap-label">
          Идентификатор пользователя
        </label>
        <input type="number" name="user-id" v-model.number="userId" class="popap-input" />
      </div>
    </b-modal>
    <b-modal
      id="add-user"
      title="Добавить пользователя"
      :ok-disabled="okDisabledAddUser"
      @ok="addNewUser"
      hide-header-close
    >
      <div class="pt-2">
        <label for="user-name" class="popap-label">Имя пользователя</label>
        <input type="text" name="user-name" v-model="userFirstName" class="popap-input" />
      </div>
      <div class="pt-2">
        <label for="user-second-name" class="popap-label">Фамилия пользователя</label>
        <input type="text" name="user-second-name" v-model="userSecondName" class="popap-input" />
      </div>
      <div class="pt-2">
        <label for="user-last-name" class="popap-label">Отчество пользователя</label>
        <input type="text" name="user-last-name" v-model="userLastName" class="popap-input" />
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import CustomTable from "../components/customTable.vue";
import { ref, onMounted, computed } from "@vue/composition-api";
export default {
  name:'usersPage',
  components: {
    "custom-table": CustomTable,
  },
  setup() {
    const users = ref([]);
    const userId = ref("");
    const userFirstName = ref("");
    const userSecondName = ref("");
    const userLastName = ref("");
    const fields = ref(["Идентификатор", "Имя", "Фамилия", "Отчество"]);
    const preloaderActive = ref(true);
    const wrongGetData = ref(false);
    const deleteUser = () => {
      if (users.value.find((item) => item.id === userId.value)) {
        axios.delete(`http://localhost:3000/users/${userId.value}`);
        users.value.splice(
          users.value.findIndex((item) => item.id === userId.value),
          1
        );
      }
      userId.value = "";
    };
    const addNewUser = () => {
      const pushUserData = {
        id: users.value[users.value.length - 1].id + 1,
        firstName: userFirstName.value,
        secondName: userSecondName.value,
        lastName: userLastName.value,
      };
      axios.post("http://localhost:3000/users", pushUserData);
      users.value.push(pushUserData);
    };
    onMounted(() => {
      axios
        .get("http://localhost:3000/users")
        .then((array) => {
          users.value = array.data;
          wrongGetData.value = false;
          preloaderActive.value = false;
        })
        .catch((error) => {
          preloaderActive.value = false;
          wrongGetData.value = true;
          console.log(error);
        });
    });
    const usersIsPresent = computed(()=>{
      return users.value.length
    })
    const usersIsAbsent = computed(()=>{
      return !usersIsPresent.value && !preloaderActive.value && !wrongGetData.value
    })
    const showTable = computed(()=>{
      return !wrongGetData.value && !preloaderActive.value && usersIsPresent.value
    })
    const wrongData = computed(()=>{
      return wrongGetData.value && !preloaderActive.value
    })
    const funcButtonDisabled = computed(()=>{
      return wrongGetData.value || preloaderActive.value
    })
    const okDisabledDeleteUser = computed(() => {
      return !users.value.find((item) => item.id === userId.value);
    });
    const okDisabledAddUser = computed(() => {
      return (
        !userFirstName.value || !userSecondName.value || !userLastName.value
      );
    });
    return {
      deleteUser,
      addNewUser,
      userFirstName,
      showTable,
      usersIsAbsent,
      funcButtonDisabled,
      wrongData,
      okDisabledAddUser,
      userSecondName,
      userLastName,
      okDisabledDeleteUser,
      users,
      preloaderActive,
      wrongGetData,
      fields,
      userId,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
.user-page {
  padding: 50px 5px 5px;
  position: relative;
  &__loader{
    position: absolute;
    top: 100%;
    left: 48%;
  }
  &__empty{
    margin-top: 40px !important;
    width: 50%;
    margin: 0 auto;
    user-select: none;
    border:1px solid $black;
    border-radius: 10px;
    box-shadow: 0 0 5px $white;
    p{
      margin-top: 10px;
      text-align: center;
    }
  }
  &__delete-user {
    position: absolute;
    top: 5px;
    left: 5px;
  }
  &__add-user {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  h2 {
    text-align: center;
  }
}
.popap-label {
  width: 50%;
}
.popap-input {
  width: 188px;
}
</style>
