<template>
  <div class="q-ma-md">
    <q-list bordered separator class="rounded-borders">
      <q-slide-item @left="onEntrySlideLeft({...$event, id: entry.id})" @right="onEntrySlideRight({...$event, id: entry.id})" v-for="entry in entries" :key="entry.title">
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

    <q-footer>
      <div class="row q-pa-md q-py-sm shadow-up-3 q-mb-md bg-white">
        <div class="col text-h6 text-grey-8">Balance</div>
        <div class="col-auto text-weight-bold" :class="useAmountColor(balance)">
          {{ useCurrencify(balance) }}
        </div>
      </div>
      <q-form class="row q-px-sm q-pb-lg q-col-gutter-sm" @submit="addEntry">
        <div class="col q-mx-md">
          <q-input
            bg-color="white"
            outlined
            dense
            v-model="addEntryForm.title"
            placeholder="Title"
            ref="titleRef"
          />
        </div>
        <div class="col q-mx-md">
          <q-input
            bg-color="white"
            outlined
            dense
            type="number"
            step="0.01"
            placeholder="Amount"
            v-model.number="addEntryForm.amount"
            input-class="text-right"
          />
        </div>
        <div class="col-auto">
          <q-btn
            color="amber"
            type="submit"
            label="Add"
            icon="add"
            text-color="black"
          />
        </div>
      </q-form>
    </q-footer>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { uid, useQuasar } from "quasar";
// Import Composables
import { useCurrencify } from "src/use/useCurrencify";
import { useAmountColor } from "src/use/useAmountColor";

const $q = useQuasar();
const titleRef = ref(null);

const entries = ref([
  {
    id: 1,
    title: "Salary",
    caption:
      "Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.",
    icon: "star",
    color: "yellow",
    amount: 500,
    date: "5 min ago",
    done: false
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
    done: false
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
    done: false
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
    done: true
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
    done: false
  },
]);

const balance = computed(() => {
  return entries.value.reduce((acc, entry) => acc + entry.amount, 0);
});

const defaultValues = {
  title: "",
  amount: null,
};

const addEntryForm = reactive({
  ...defaultValues,
});

const addEntry = () => {
  const newEntry = Object.assign({}, addEntryForm, {
    id: uid(),
    date: new Date().toLocaleString(),
  });
  entries.value.push(newEntry);
  entriesFormReset();
};

const entriesFormReset = () => {
  Object.assign(addEntryForm, defaultValues);
  titleRef.value.focus();
};


function confirmDialog({reset, id}) {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to delete this entry?",
    cancel: true,
    persistent: true,
    ok: {
      label: "Delete",
      color: "negative",
      noCaps: true
    },
    cancel: {
        color: "primary",
        noCaps: true
    }
  }).onOk(() => {
    deleteEntry();
    console.log("OK", id);
  }).onCancel(() => {
    console.log("Cancel", id);
    reset();
  }).onDismiss(() => {
    reset();
  });
}

const onEntrySlideLeft = ({reset}) => {
    console.log("Done Entry ", reset);

    reset && reset()
};

const onEntrySlideRight = (props) => {
    confirmDialog(props);
};

const deleteEntry = (id) => {
  const index = entries.value.findIndex((entry) => entry.id === id);
    entries.value.splice(index, 1);
    $q.notify({
      color: "negative",
      icon: "delete",
      message: "Entry deleted",
      position: "top-right",
    });
}

</script>
