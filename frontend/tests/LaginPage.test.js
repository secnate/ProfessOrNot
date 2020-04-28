import LoginPage from "@/components/LoginPage.vue"
import { BootstrapVue } from "bootstrap-vue";
import { shallowMount, createLocalVue } from "@vue/test-utils"
const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe("LoginPage", () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(LoginPage, {
            localVue 
        })
    }),

    it("should init to a valid instance", () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    })

})