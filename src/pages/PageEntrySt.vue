<template>
  <div class="q-ma-md">
    PAGHE STEORE
  <q-list bordered separator class="rounded-borders">
      <q-slide-item @left="onEntrySlideLeft({...$event, id: entry.id})" @right="onEntrySlideRight({...$event, id: entry.id})" v-for="entry in entriesStore.entries" :key="entry.title">
        <template v-slot:left>
          <q-icon name="delete" class="text-white" />
        </template>
        <template v-slot:right>
          <q-icon name="done" class="text-white" />
        </template>

        <q-item >
          <q-item-section :class="useAmountColor(entry.amount)">
            <q-item-label class="text-weight-bold" :class="entry.done ? 'text-strike' : ''">{{
              entry.title
            }}</q-item-label>
            <q-item-label caption lines="2">{{ entry.caption }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label caption>{{ entry.date }}</q-item-label>
            <q-item-label
              class="text-weight-bold"
              :class="useAmountColor(entry.amount)"
              >{{ useCurrencify(entry.amount) }}</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-slide-item>
    </q-list> 
    </div>  
</template>

<script setup>
 import { useEntriesStore } from 'src/stores/entries-store';
//   import { useAmountColor } from 'src/use/useAmountColor';
//   import { useCurrencify } from 'src/use/useCurrencify';
  console.log("PageEntrySt")
  const entriesStore = useEntriesStore();
  console.log(entriesStore.getItem())
</script>
