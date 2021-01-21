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
        <a href="https://github.com/aws-samples/fresh-Tracks">
      <div class="logo"></div>
      <p>
        Source code available on Github
      </p>
      </a>
        <p class="site-footer__copy">
              <a href="https://aws.amazon.com/privacy/">Privacy</a> | 
              <a href="https://aws.amazon.com/terms/">Site Terms</a> |
              &copy; Copyright 2020 Amazon.com, Inc. or its affiliates. All rights reserved.
        </p><!-- /.site-footer__copy -->

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
  }
  
};
</script>
