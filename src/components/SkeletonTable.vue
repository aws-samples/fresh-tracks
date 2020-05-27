<script>
    import VueContentLoading from 'vue-content-loading';

    export default {
      components: {
        VueContentLoading,
      },
    };
  </script>

 <template>
   
   
    <vue-content-loading :width="700" :height="100">


     <rect x="0" y="0" rx="4" ry="4" width="200" height="10" />
     <rect x="220" y="0" rx="4" ry="4" width="50" height="10" />

     <rect x="0" y="30" rx="4" ry="4" width="200" height="10" />
     <rect x="220" y="30" rx="4" ry="4" width="50" height="10" />

     <rect x="0" y="60" rx="4" ry="4" width="200" height="10" />
     <rect x="220" y="60" rx="4" ry="4" width="50" height="10" />


    <rect x="300" y="20" rx="4" ry="4" width="70" height="30" />
    <text x="300" y="70" class="small">Reading File</text>

    <rect x="350" y="35" rx="4" ry="4" width="100" height="2" />
    

    <rect x="450" y="20" rx="4" ry="4" width="70" height="30" />
    <text x="450" y="70" class="small">Calculating</text>
 
    <rect x="500" y="35" rx="4" ry="4" width="100" height="2" />

    <rect x="600" y="20" rx="4" ry="4" width="70" height="30" />
    <text x="600" y="70" class="small">Saving</text>


     
     

    </vue-content-loading>
  </template>

  <svg viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg">
  <style>
    .small { font: italic 13px sans-serif; font-size:1em;  color:black}
    .heavy { font: bold 30px sans-serif; }

    /* Note that the color of the text is set with the    *
     * fill property, the color property is for HTML only */
    .Rrrrr { font: italic 40px serif; fill: red; }
  </style>