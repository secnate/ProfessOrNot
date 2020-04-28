import ErrorPage from "@/components/ErrorPage.vue"
import { BootstrapVue } from "bootstrap-vue";
import { shallowMount, createLocalVue } from "@vue/test-utils"
const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe("ErrorPage", () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(ErrorPage, {
            localVue,
            stubs: ["b-icon"]
        })
    }),

    it("should init to a valid instance", () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    })

})