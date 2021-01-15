<template>
  <div id="contact" class="hello">
      <h1>{{ msg }}</h1>
            <label>File
              <input type="file" id="file" ref="file" v-on:change="selectedFile()"/>
            </label>
      <div v-if="response" id="response">
        <h2>Thank you, here's the response</h2>
        <pre >{{ response }}</pre>
      </div>
      <div v-else>
        <form @submit.prevent="submitForm">
          <div class="large-12 medium-12 small-12 cell">
          </div>
          <button :class="[name ? activeClass : '']" type="submit">Submit</button>
        </form>
      </div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Upload',
  props: {
    msg: String
  },
  data() {
    console.log(process.env.VUE_APP_POST_URL)
    return {
      userID: 1,
      name: '',
      user_id: '',
      message: '',
      response: '',
      success: '',
      GPXData:'',
      activeClass: 'active'
    }
  },
  methods: {
    submitForm() {

      const formData = new FormData();
      
      formData.append("user_id", this.user_id);
      formData.append("ADDRESS","BEN");
      
    
      //console.log(this.GPXData)
      axios({
        method: "POST",
        url: process.env.VUE_APP_APIGW_URL,
        data: {"user_id": this.$auth.user.sub,"xmlData":this.GPXData},
      }).then(response => {
        console.log(response);
        // this.response = response.data
        this.success = 'Data saved successfully';
        this.response = JSON.stringify(response, null, 2)
      }).catch(error => {
        console.log(error)
        this.response = 'Error: ' + error.response.status
      })
      this.name = '';
      this.user_id = '';
      this.message = '';
    },
    selectedFile() {

      let file = this.$refs.file.files[0];
     // if(!file || file.type !== 'text/plain') return;
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");

      reader.onload =  evt => {
       this.GPXData=evt.target.result
      }
      reader.onerror = evt => {
        console.error(evt);
      }
    }
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