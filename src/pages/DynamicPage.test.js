{/* <template>
  <div>
    <DynamicPage />
  </div>
</template> */}

// follow link
// https://testing.quasar.dev/packages/unit-vitest/

import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { QIcon, QInput, QList, Quasar } from 'quasar';
import { TASK_COLLECTION, TASK_ITEMs } from '../stores/mock.js';
import { mount } from '@vue/test-utils';
import { beforeEach , describe, it, expect } from 'vitest';
import DynamicPage from './DynamicPage.vue';


installQuasarPlugin();

describe('DynamicPage.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(DynamicPage, {});
  });

  it('renders search input', () => {
    const searchInput = wrapper.find('[data-testid="search-input"]');
    expect(searchInput.exists()).toBe(true);
  });

  it('filters tasks based on search input', async () => {
    const searchInput = wrapper.find('[data-testid="search-input"]');
    await searchInput.setValue('task 1');

    expect(wrapper.vm.filteredTasks).toEqual(
      TASK_COLLECTION.filter((task) => task.title.toLowerCase().includes('task 1'))
    );
  });

  it('test search input debounce', async () => {
    const searchInput = wrapper.find('[data-testid="search-input"]');
    await searchInput.setValue('task 1');

    setTimeout(async () => {    
        await searchInput.setValue('task 2')
    }, 500);

    const start = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 300)); // wait for debounce time + buffer
    const end = Date.now();
    expect(end - start).toBeLessThan(500);

    expect(wrapper.vm.filteredTasks).toEqual(
      TASK_COLLECTION.filter((task) => task.title.toLowerCase().includes('task 1'))
    );
  });

  it('renders task items', () => {
    const taskItems = wrapper.findAllComponents({ name: 'q-item' });
    expect(taskItems.length).toBe(TASK_COLLECTION.length);
  });

  it('fetches elements on button click', async () => {
    const taskButton = wrapper.findAllComponents({ name: 'q-btn' }).at(0);
    await taskButton.trigger('click');
    expect(wrapper.vm.fetched).toEqual(TASK_ITEMs.filter((item) => item.id === TASK_COLLECTION[0].id));
  });

// it('validates form fields correctly', async () => {
//     const formData = {
//         field1: 'test',
//         field2: 'test',
//     };
//     wrapper.vm.formData = formData;
//     await wrapper.vm.$nextTick();
//     console.log("FRET ", wrapper.vm.canSubmit);

//     // expect(wrapper.vm.canSubmit).toBe(true);
// });

//   it('submits form data', async () => {
//     const formData = {
//       field1: 'test',
//       field2: 'test',
//     };
//     wrapper.vm.formData = formData;
//     await wrapper.vm.$nextTick();
//     const submitButton = wrapper.findComponent({ name: 'q-btn' });
//     await submitButton.trigger('click');
//     expect(wrapper.vm.isSubmitting).toBe(true);
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     expect(wrapper.vm.isSubmitting).toBe(false);
//   });
});