import Main from "@/components/Main.vue"
import { BootstrapVue } from "bootstrap-vue";
import { shallowMount, createLocalVue } from "@vue/test-utils"
const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe("Main", () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(Main, {
            localVue 
        })
    }),

    it("should init to a valid instance", () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    })

})