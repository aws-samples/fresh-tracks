/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 */

<template>
  <div id="app" class="d-flex flex-column h-100">
    <nav-bar />
    <div class="container flex-grow-1">
      <error />
      <div class="mt-5">
        <router-view />
      </div>
    </div>
    <footer class="bg-light text-center p-3">
        <a href="https://github.com/bls20AWS/freshTracks">
      <div class="logo"></div>
      <p>
        Source code available on Github
      
      </p>
      </a>
    </footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Error from "./components/Error";






export default {
  components: {
    NavBar,
    Error
  },
  mounted(){


  }
};
</script>
