import Register from "@/components/Register.vue"
import { BootstrapVue } from "bootstrap-vue";
import { shallowMount, createLocalVue } from "@vue/test-utils"
const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe("Register", () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(Register, {
            localVue,
            stubs: ["v-select"]
        })
    }),

    it("should init to a valid instance", () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    })

})