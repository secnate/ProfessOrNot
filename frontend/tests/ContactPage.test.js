import ContactPage from "@/components/ContactPage.vue"
import { BootstrapVue } from "bootstrap-vue";
import { shallowMount, createLocalVue } from "@vue/test-utils"
const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe("ContactPage", () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(ContactPage, {
            localVue,
            stubs: ["b-icon"]
        })
    }),

    it("should init to a valid instance", () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    })

})