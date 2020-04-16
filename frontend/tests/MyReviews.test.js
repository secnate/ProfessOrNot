import MyReviews from "@/components/MyReviews.vue"
import { BootstrapVue } from "bootstrap-vue";
import { shallowMount, createLocalVue } from "@vue/test-utils"
const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe("MyReviews", () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(MyReviews, {
            localVue 
        })
    }),

    it("should init to a valid instance", () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    })

})