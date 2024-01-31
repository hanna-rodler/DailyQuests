import { mount } from '@vue/test-utils';
import Navbar from '../components/Navbar.vue' // Adjust the import path according to your project structure

describe('Navbar.vue', () => {
  it('adjusts layout for mobile screens', async () => {
    // Mount the component
    const wrapper = mount(Navbar);

    // Set the viewport to a mobile screen size
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));

    await wrapper.vm.$nextTick();

    // Check if the navbar container has the expected mobile class/style
    expect(wrapper.find('.navbar-container').classes()).toContain('mobile-specific-class'); // Replace 'mobile-specific-class' with an actual class or style that indicates mobile layout
  });
});
