import { ref } from "vue";
import { Notify } from "quasar";
import { defineStore } from "pinia";

// import { api } from "src/boot/axios";
const entriesData = [
  {
    id: 1,
    title: "Salary",
    caption:
      "Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.",
    icon: "star",
    color: "yellow",
    amount: 500,
    date: "5 min ago",
    done: false,
  },
  {
    id: 2,
    title: "Dividends",
    caption:
      "Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.",
    icon: "star",
    color: "yellow",
    amount: 100,
    date: "10 min ago",
    done: false,
  },
  {
    id: 3,
    title: "Interest",
    caption:
      "Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.",
    icon: "star",
    color: "yellow",
    amount: 50,
    date: "15 min ago",
    done: false,
  },
  {
    id: 4,
    title: "Salary",
    caption:
      "Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.",
    icon: "star",
    color: "yellow",
    amount: -500,
    date: "5 min ago",
    done: true,
  },
  {
    id: 5,
    title: "Salary",
    caption:
      "Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.",
    icon: "star",
    color: "yellow",
    amount: 0,
    date: "5 min ago",
    done: false,
  },
];

const api = {
  getCollection: async (url) => {
    return entriesData;
  },
  getItem: async (url) => {
    return entriesData[0];
  },
  addItem: async (url, data) => {
    await entriesData.push(data);
    return entriesData;
  },
};

// function EntriesStore() {
//   const entries = ref([]);
//   const singleEntry = ref({});
//   const loading = ref(false);

//   function handleApiError(error) {
//     console.error(error);
//     Notify.create({
//       type: "negative",
//       message: "An error occurred. Please try again later." + error,
//     });
//   }

//   function handleApiSuccess(message) {
//     Notify.create({
//       type: "positive",
//       message: message,
//     });
//   }

//   function handleApiResponse(response) {
//     return new Promise((resolve, reject) => {
//       if (response.status) {
//         resolve(response);
//       } else {
//         reject(response);
//       }
//     });
//   }

//   function getItem(url = "url") {
//     loading.value = true;
//     const data = api.get(url);
//     //   .then(async (response) => {
//     //     await handleApiResponse(response);
//     //     console.log(response.data);
//     //     singleEntry.value = response.data;
//     //   })
//     //   .catch((error) => {
//     //     handleApiError(error);
//     //   })
//     //   .finally(() => {
//     //     loading.value = false;
//     //   });
//   }

//   function getCollection(url = "url") {
//     loading.value = true;
//     const data = api.get(url);

//     return data;
//     //   .then(async (response) => {
//     //     await handleApiResponse(response);
//     //     console.log(response.data);
//     //     entries.value = response.data;
//     //   })
//     //   .catch((error) => {
//     //     handleApiError(error);
//     //   })
//     //   .finally(() => {
//     //     loading.value = false;
//     //   });
//   }

//   return {
//     entries,
//     singleEntry,
//     loading,

//     getItem,
//     getCollection,
//   };
// }

export const useEntriesStore = defineStore("entries", () => {
  const entries = ref([]);
  const singleEntry = ref({});
  const loading = ref(false);

  function handleApiError(error) {
    console.error(error);
    Notify.create({
      type: "negative",
      message: "An error occurred. Please try again later." + error,
    });
  }

  function handleApiSuccess(message) {
    Notify.create({
      type: "positive",
      message: message,
    });
  }

  function handleApiResponse(response) {
    return new Promise((resolve, reject) => {
      if (response.status) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  }

  function getItem(url = "url") {
    loading.value = true;
    const data = api.getItem(url)
      .then(async (response) => {
        await handleApiResponse(response);
        console.log(response.data);
        singleEntry.value = response.data;
      })
      .catch((error) => {
        handleApiError(error);
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function getCollection(url = "url") {
    loading.value = true;
    const data = api.get(url);

    return data;
    //   .then(async (response) => {
    //     await handleApiResponse(response);
    //     console.log(response.data);
    //     entries.value = response.data;
    //   })
    //   .catch((error) => {
    //     handleApiError(error);
    //   })
    //   .finally(() => {
    //     loading.value = false;
    //   });
  }

  return {
    entries,
    singleEntry,
    loading,

    getItem,
    getCollection,
  };
});
