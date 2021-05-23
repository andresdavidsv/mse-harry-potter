import Vue from 'vue'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSkull,
  faCrown,
  faDungeon,
  faHatWizard,
  faHammer,
  faGem
} from '@fortawesome/free-solid-svg-icons'
import {
  faVuejs,
  faBootstrap,
  faFontAwesome,
  faGithub
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faSkull,
  faCrown,
  faDungeon,
  faHatWizard,
  faHammer,
  faGem,
  faVuejs,
  faBootstrap,
  faFontAwesome,
  faGithub
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
