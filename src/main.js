// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Auth0Plugin } from "./auth";
import HighlightJs from "./directives/highlight";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";



//******  STEP 1. Un comment the "import" line below *********************** /
// import { domain,clientId,audience } from "./auth/auth_config.json";
//************************************************************************ /

//****** STEP 2. Comment out the 3 lines below *************************** /
var domain = process.env.VUE_APP_Auth0_Domain
var clientId = process.env.VUE_APP_Auth0_ClientId
var audience = process.env.VUE_APP_Auth0_Audience
//************************************************************************ */

require('./assets/css/style.css')
Vue.config.productionTip = false;
  Vue.use(Auth0Plugin, {
    domain,
    clientId,
    audience,
    onRedirectCallback: appState => {
      router.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
      );
    }
  });





Vue.directive("highlightjs", HighlightJs);

library.add(faLink, faUser, faPowerOff);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
