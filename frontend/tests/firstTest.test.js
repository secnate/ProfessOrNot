import AboutUs from "@/components/AboutUs.vue"
import { shallowMount, createLocalVue } from "@vue/test-utils"
const localVue = createLocalVue()

describe("AboutUs", () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(AboutUs, {
            localVue 
        })
    }),

    it("should init to a valid instance", () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    })

})