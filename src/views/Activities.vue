/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 */

<template>
  <div class="container">
      <div class="row align-items-center profile-header">
      <div class="col-md-12">
        
        <div id="mapHolder">
         <Map v-if="this.$route.query.ID" />

         <div class="row align-items-center profile-header">
              <div class="col-md-12">
                <List v-if="this.$auth.user.sub" :user_id=this.$auth.user.sub  /> 
                <Dropzone  />
              </div>
         </div>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
import Map from "../components/Map";
//import Upload from "../components/Upload";
import List from "../components/List";
import Dropzone from '../components/Dropzone'





export default {
  name: "Activities",

  components: {
    Map,
    Dropzone,
    List,

  },
  methods:{
    
  }

};
</script>

<style lang="scss" scoped>
.next-steps {
  .fa-link {
    margin-right: 5px;
  }
}
</style>
