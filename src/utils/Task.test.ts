// __tests__/Task.test.ts
import { mount } from '@vue/test-utils';
import Task from '@/components/Task.vue';

const mockTask = {
  taskId: 1,
  name: 'Test Task',
  description: 'Test description',
  status: 'Not started',
  dueDate: '2024-01-31',
};

describe('Task.vue', () => {
  it('renders task with dueDate', () => {
    const wrapper = mount(Task, {
      props: {
        task: mockTask,
        columnId: '1',
      },
    });

    // Check if the dueDate is present in the rendered output
    expect(wrapper.text()).toContain(mockTask.dueDate);

    // Check if there is a specific class associated with dueDate (customize based on your implementation)
    expect(wrapper.find('.your-dueDate-class').exists()).toBe(true);
  });

  // Other tests...

  it('matches snapshot', () => {
    const wrapper = mount(Task, {
      props: {
        task: mockTask,
        columnId: '1',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
