<template>
     <div>Two way binding to edit counter: 
      <q-input v-model="storeCounter.count" type="numberdsdsds"/>
    </div>
    <div>
      <q-item>
        {{ storeCounter.count }}
      </q-item>
    </div>
    Counter is at: {{ storeCounter.oddOrEven }}
    <div >
      <q-btn color="primary" label="Increment" @click="storeCounter.Increment" />
    </div>
    <div>
      <q-btn color="primary" label="Decrement" @click="storeCounter.Decrement" />
    </div>
</template>

<script setup>
//
import { useCounterStore } from "src/stores/counter-setup";

const storeCounter = useCounterStore();

</script>