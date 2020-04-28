import CreateReview from "@/components/CreateReview.vue"
import { BootstrapVue } from "bootstrap-vue";
import { shallowMount, createLocalVue } from "@vue/test-utils"
const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe("CreateReview", () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(CreateReview, {
            localVue,
            stubs: ["v-select"]
        })
    }),

    it("should init to a valid instance", () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    })

})