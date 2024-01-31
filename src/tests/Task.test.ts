// Import useLocalStorage directly for testing the mock
import { useLocalStorage } from '@vueuse/core';

describe('useLocalStorage Mock Sanity Check', () => {
  it('mocks useLocalStorage correctly', () => {
    // Directly call the mocked useLocalStorage with a test key and default value
    const testStorage = useLocalStorage('testKey', 'defaultValue');

    // Check if the returned object has a value property equal to the default value
    expect(testStorage.value).toBe('defaultValue');

    // Modify the value to test reactivity of the mock
    testStorage.value = 'newValue';

    // Verify the value has been updated
    expect(testStorage.value).toBe('newValue');
  });
});
