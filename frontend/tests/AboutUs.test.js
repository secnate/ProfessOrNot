import AboutUs from "@/components/AboutUs.vue"
import { BootstrapVue } from "bootstrap-vue";
import { shallowMount, createLocalVue } from "@vue/test-utils"
const localVue = createLocalVue()
localVue.use(BootstrapVue)

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