/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 */

<template>
  <div>
    <hero />
   
    <hr />
    <home-content /> 
  </div>
</template>


<script>
import Hero from "../components/Hero";
import HomeContent from "../components/HomeContent";


export default {
  name: "home",
  components: {
    Hero,
    HomeContent, 
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
