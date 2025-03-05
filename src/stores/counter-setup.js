import { defineStore } from 'pinia'
import { computed, ref } from 'vue'


export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function Increment() {
    count.value++;
  }
  
  function Decrement() {
    if (count.value <= 0) return;
    count.value--;
  }
  
  const oddOrEven = computed(() => {
    return count.value % 2 === 0 ? "Even" : "Odd";
  })

  return {
    // state
    count,

    // actions
    Increment,
    Decrement,

    // getters
    oddOrEven
  }
})