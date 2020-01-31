import Vuex from 'vuex'
import Vue from 'vue'
import auth from './modules/auth'

const {Builder, By, Key, util} = require("selenium-webdriver");
async function example() {
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("dev.professor.com");
    await driver.findElement(By.name("q")).sendKeys("Selenium",Key.RETURN);
}
example();

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth
    }
})