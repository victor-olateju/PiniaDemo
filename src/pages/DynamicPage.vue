<template>
  <div class="q-ma-md">
    <q-input
      v-model="searchInput"
      :debounce="DEBOUNCE_TIME"
      filled
      placeholder="Search"
      class="q-mr-auto"
      width="50"
      data-testid="search-input"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-list bordered separator class="rounded-borders q-mt-md">
      <q-item v-for="task in filteredTasks" :key="task.id">
        <q-item-section>
          <q-item-label class="text-weight-bold">{{ task.title }}</q-item-label>
          <q-item-label caption>{{ task.description }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label caption>{{ task.date }}</q-item-label>
          <q-item-label class="text-weight-bold">{{ task.amount }}</q-item-label>
          <q-btn
            @click="getElements(task.id)"
            :icon="task.done ? 'done' : 'close'"
            :color="task.done ? 'positive' : 'negative'"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-list bordered separator class="rounded-borders q-mt-lg">
      <q-item v-for="item in fetched" :key="item.id" class="column q-mt-lg">
        <q-item-section class="col">
          <q-item-label class="text-weight-bold">{{ item.title }}</q-item-label>
          <q-item-label caption>{{ item.description }}</q-item-label>
        </q-item-section>

        <q-item-section class="col">
          <div class="row q-col-gutter-md">
            <q-item v-for="field in item.fields" :key="field.id" :class="sizeClass(field.size)">
              <q-item-section>
                <q-item-label v-if="field.type === 'paragraph'">
                  {{ field.content }}
                </q-item-label>

                <q-item-label v-if="['inputText', 'inputDocument'].includes(field.type)" class="text-weight-bold q-mb-sm capitalize">{{ field.label }}</q-item-label>
                <q-input v-if="field.type === 'inputText'" type="text" v-model="formData[field.name]" outlined dense
                  :rules="validateTextField({...field.validation, optional: field.optional})" :disable="item.status === 'completed'"
                />

                <q-file v-if="field.type === 'inputDocument'" dense outlined :accept="field.validation.acceptType" v-model="formData[field.name]" :disable="item.status === 'completed'">
                  <template v-slot:append>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </q-item-section>
            </q-item>

            <q-item v-if="item.requiresSubmit" class="q-ml-auto">
              <q-item-section class="justify-end">
                <q-btn label="Submit" color="primary" :disable="!canSubmit || item.status === 'completed'" @click="onSubmit" :loading="isSubmitting" />
              </q-item-section>
            </q-item>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { computed, ref, toRaw, watch } from 'vue';
import { TASK_COLLECTION, TASK_ITEMs } from '../stores/mock.js';

const DEBOUNCE_TIME = 500;

const fetched = ref([]);
const searchInput = ref('');
const formData = ref({});
const canSubmit = ref(false);
const isSubmitting = ref(false);

function getElements(id) {
  fetched.value = TASK_ITEMs.filter((item) => item.id === id);
}

const filteredTasks = computed(() => {
  return TASK_COLLECTION.filter((task) => {
    return task.title.toLowerCase().includes(searchInput.value.toLowerCase());
  });
});

const sizeClass = (size) => {
  return `
    col-xs-${size.xs}
    col-sm-${size.sm}
    col-md-${size.md}
    col-lg-${size.lg}
  `;
};

const validateTextField = ({ maxLength, minLength, optional }) => {
  return [
    (v) => !v && !optional ? 'Required.' : true,
    (v) => (v && v.length < minLength) ? `Min ${minLength} characters` : true,
    (v) => (v && v.length > maxLength) ? `Max ${maxLength} characters` : true,
  ];
};

watch(formData, (newVal) => {
  canSubmit.value = Object.keys(newVal).every((key) => {
    const field = TASK_ITEMs.find(item => item.fields.some(f => f.name === key)).fields.find(f => f.name === key);
    const rules = validateTextField({ ...field.validation, optional: field.optional });
    return rules.every(rule => rule(newVal[key]) === true);
  });
}, { deep: true });

const onSubmit = async () => {
  isSubmitting.value = true;
  try {
    console.log('Form submitted with data:', toRaw(formData.value));
    await new Promise(resolve => setTimeout(resolve, 2000));
  } catch (error) {
    console.error('Submission failed:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

