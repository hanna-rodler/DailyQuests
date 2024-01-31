import { handleDoneTask, DONE_STORE } from '../stores/doneTasksStore';


// Mocking useLocalStorage
jest.mock('@vueuse/core', () => ({
  useLocalStorage: jest.fn().mockImplementation(() => ({
    value: [],
  })),
}));

describe('Kanban Store Tests', () => {
  beforeEach(() => {
    // Reset DONE_STORE before each test
    DONE_STORE.value = [];
  });

  it('should add a task to DONE_STORE when marked as done', () => {
    const task = { taskId: '1', name: 'Test Task', status: 'Not Started' };
    handleDoneTask(task);
    expect(DONE_STORE.value).toContainEqual({ taskId: '1', task });
  });
});
