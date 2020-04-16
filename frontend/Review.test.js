import Review from "@/components/Review.vue"
import { BootstrapVue } from "bootstrap-vue";
import { shallowMount, createLocalVue } from "@vue/test-utils"
const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe("Review", () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(Review, {
            localVue,
            propsData: {
                hideProfessorName: true,
                hideCourseName: true,
                review: {text: "reviewtext"}
            }
        })
    }),

    it("should init to a valid instance", () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    })

})