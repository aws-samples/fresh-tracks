<template>
  <div id="contact" class="hello">
    <div v-if="activities.length >0">
      <h3>Activities</h3>
      <p>Select one of your activites below to view on the map</p>
     
          <SkeletonTable v-if="showSkeleton"/>
       
            <table v-if="!showSkeleton" id="activities">
              <thead>
                <tr>
                  <td>Name</td><td>Distance</td>
                </tr>
               </thead> 
               {{ message }}
                <tr v-for="(item,index) in activities" :key="item.index">
                 <!--  <td>
                    {{ JSON.parse(item.metadata.S).gpxMeta.time }}
                  </td> -->
                  <td>
                    <a v-bind:id="index" v-bind:href="'/activities?ID='+ item.ID.S ">{{ JSON.parse(item.metadata.S).gpxMeta.name }} </a>
                  </td>
                  <td>
                    <a v-bind:href="'/activities?ID='+ item.ID.S ">{{ parseInt(JSON.parse(item.metadata.S).gpxMeta['length']) }} km </a>
                  </td>
   
                </tr>
            </table>
      </div>
      <div v-else>
        <h3> 
          You haven't uploaded any activities yet. Drag a GPX file into the drop zone below to get started.
          <img style="float: right; max-width: 130px;" src="/images/downArrow.png">
        
         </h3>
        <br/>
      </div>

       <h1></h1>
    <IoT/>
    </div>
</template>

<script>
import axios from 'axios';
import IoT from './Iot'
import SkeletonTable from './SkeletonTable'

export default {
  name: 'List',

  data:()=>{
    return {
      componentKey:0,
      activities:'',
      message: '',
      response: '',
      success: '',
      total:0,
      showSkeleton:1,
    }
  },
  components: {
    IoT,
    SkeletonTable,
  },
  props: {
    msg: String,
    user_id:String
  },

  methods: {

    loading() {
        this.showSkeleton=1;
    },

    async getActivities() {
      const token = await this.$auth.getTokenSilently()
      console.log( 'Token:'+token)
      axios({
        method: "GET",
        headers:{ Authorization: `Bearer ${token}` } ,  
        url: process.env.VUE_APP_APIGW_URL+'/activities',
        params:{"user_id": this.user_id},
      }).then(response => { 
        this.success = 'Data retrieved successfully';
        //this.response = JSON.stringify(response, null, 2)
        this.activities= response.data.Items

        let total =   this.total
        this.showSkeleton=0;
        this.activities.forEach(function(item) {
             //total += JSON.parse(item.metadata.S).gpxMeta['length']
            total += JSON.parse(item.metadata.S).gpxMeta['length']
            
        });
         this.$emit('DistanceTotal',total)
      }).catch(error => {
        console.log(error)
        this.response = 'Error: ' + error.response.status
      })

    },
  },
  mounted(){
     this.getActivities()
  },
  created () {
    this.$root.$on('send', (text) => {
      //this.message = text.message
      //this.activities+=text.message
      this.getActivities()
    }),
    this.$root.$on('loading', (text) => {
      //this.message = text.message
      //this.activities+=text.message
      this.loading()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#app {
  display: flex;
  justify-content: center;
  font-family: 'Work Sans', sans-serif;
}
form {
  width: 500px;
  padding: 10px 40px;
  margin: 0 auto;
  text-align: left;
}
  label {
    text-transform: uppercase;
    font-size: 20px;
    letter-spacing: 0.03em;
    font-weight: bold;
    margin-top:10px;
    margin-bottom:10px;
    
  }
  input, textarea {
    border: 1px solid #ccc;
    color: #333;
    width: calc(100% - 30px);
    font-size:20px;
    padding:10px;
    margin-bottom:20px;
  }
  input, textarea, button {
    border-radius: 4px;
    padding: 8px 15px;
    font-family: 'Work Sans', sans-serif;
    font-weight: 300;
  }
button {
  color:#000;
  border: none;
  width: calc(100% - 30px);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: #eee;
  cursor: pointer;
  font-size:20px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  transition: 0.25s all ease;
  margin-top:20px;
  width: 100%;
  padding:10px;
}
#response{
   margin: 0 auto;
font-size: 14px;
text-align: left;
background: #eee;
padding: 20px;
width: auto;
overflow: scroll;
max-width: 400px;
border:solid;
  }

  table{
  border: solid 3px #eee !important;
  width:100%;
  margin-bottom:10px
}

table thead tr td{
  background-color: #eee;
  font-weight:100;
  font-style: italic;
}

table tr td{
  padding:10px; 
}
h3{font-style: italic; font-weight: 100;;}

</style>