import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

// Except for main.js, modules requiring Vue should import { Vue } from '@/config.js'
// so that unit tests and regular runtime have the same configuration
export let Vue

export default function options(vueClass) {
    Vue = vueClass

    vueClass.config.productionTip = false
    vueClass.config.devtools = false

    // vueClass.$logger = vueClass.prototype.$logger = new Logger({
    //     // See https://github.com/felixpy/logger#logger
    //     config: {
    //         // Log priority: ALL, DEBUG, LOG, INFO, WARN, ERROR, OFF
    //         level: 'LOG',
    //
    //         // Prefix pattern: %t=date, %p=priority, %c=logger name, %m=method name
    //         prefix: '[%t] [%m]',
    //
    //         // Separator between prefix and messages
    //         separator: '',
    //     }
    // })

    Vue.use(VueMaterial)
}
