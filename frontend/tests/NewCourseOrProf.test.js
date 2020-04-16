import NewCourseOrProf from "@/components/NewCourseOrProf.vue"
import { BootstrapVue } from "bootstrap-vue";
import { shallowMount, createLocalVue } from "@vue/test-utils"
const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe("NewCourseOrProf", () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(NewCourseOrProf, {
            localVue 
        })
    }),

    it("should init to a valid instance", () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    })

})