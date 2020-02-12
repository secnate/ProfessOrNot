import Vuex from 'vuex'
import Vue from 'vue'
import auth from './modules/auth'
import survey_questions from './modules/survey_questions';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth, survey_questions
    }
})