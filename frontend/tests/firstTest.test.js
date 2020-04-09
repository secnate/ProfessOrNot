// import the mount method from test utils
// and the component to be tested.
import { mount } from'@vue/test-utils'
import AboutUs from '../src/components/AboutUs'

describe('AboutUs', () => {
    // Now mount the component and you have the wrapper
    const wrapper = mount(AboutUs)
    const vm = wrapper.vm
    console.log(wrapper)
    
    instanceof('renders card', () => {
        expect(wrapper.html()).toContain('<div class="card-body"></div>')
    })
})