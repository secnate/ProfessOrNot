import QuizQuestion from "@/components/QuizQuestion.vue"
import { BootstrapVue } from "bootstrap-vue";
import { shallowMount, createLocalVue } from "@vue/test-utils"
const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe("QuizQuestion", () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(QuizQuestion, {
            localVue,
            propsData: {
                question: { text: "say what?" }
            }
        })
    }),

    it("should init to a valid instance", () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    })

})