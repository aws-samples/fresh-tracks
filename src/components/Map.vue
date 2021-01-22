<template>
<div class="container">
    <div class="row align-items-top">
        <div style="col-md-12 height:500px; min-width: 100%; "  >
          <h3>
            {{name}}
          </h3>
          <l-map style="height:500px;" ref="myMap"
            :zoom="14"
            
            :options="mapOptions"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
          >
            <l-tile-layer
              :url="url"
              :attribution="attribution"
            />

          </l-map>
        </div>
      </div>
        <div v-if="name" id="meta">
            <table style="width:100%; border:0px">
              <tr>
                <td style="">
                  
                      <h3 v-if="distance > 0">Total Distance</h3>
                      <p v-if="distance >0" class="stat">{{Math.round(distance/1000).toFixed(2)}} KM</p>

                </td>
                <td style="">
                      <h3 v-if="elevation > 0">Total Elevation</h3>
                      <p v-if="elevation > 0" class="stat">{{elevation}} M</p>
                </td>
              </tr>
              <tr>
                <td style="">
                      <h3 v-if="elevationLoss > 0">Verticle Skied</h3>
                      <p v-if="elevationLoss > 0" class="stat">{{elevationLoss}} M</p>
                </td>
                <td style="">
                      <h3 v-if="averageSpeed > 0">Average Speed</h3>
                      <p v-if="averageSpeed > 0" class="stat">{{averageSpeed}} KM/H</p>
                </td>
                <td style="">
                      <h3 v-if="totalTime > 0">Moving Time</h3>
                      <p v-if="totalTime > 0" class="stat">{{totalTime}}</p>
                </td>
              </tr>
            </table>
          
            <p v-if="heartrate > 0"> <img class="mb-1 icon xs" src="/icons/map/030-route.png" alt="Fresh tracks"/>  Avg Heartrate: {{heartrate}}</p>
            <hr v-if="heartrate > 0" />
            <p v-if="temp > 0"> <img class="mb-1 icon xs" src="/icons/map/030-route.png" alt="Fresh tracks"/>  Avg Temp: {{temp}} </p>
            <hr v-if="temp > 0" />
        </div>
      </div>
  
</template>

<script>
import { latLng } from "leaflet";
import 'leaflet-gpx';

import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import axios from 'axios';
var L = window.L; // to get around the ESLint failure


export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  data() {
    return {
      //initializeGPXData//
      gpxfile:"",
      toggle:false,
      elevation: 0, 
      heartrate: 0,
      temp: 0,
      evevationGain:0,
      elevationLoss:0,
      averageSpeed:0,
      totalTime:0,
      startTime:0,
      endTime:0,
      distance:0,
      name:"",

      //buildMap//
  
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      currentZoom: 4.5,
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: false
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = 'gpx.getBounds().getCenter()';
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
    revealMap(){
      this.showMap=true
    },
    async drawMap(){
        var self = this
        const token =  await self.$auth.getTokenSilently()
        let mapObject = this.$refs.myMap.mapObject
      
          axios({
            method: "GET",
            headers:{ Authorization: `Bearer ${token}` } ,  
            url: process.env.VUE_APP_APIGW_URL+'/activity',
            params:{"ID": this.$route.query.ID},

          }).then(response => {

              this.success = 'Data retrieved successfully';
            //this.response = JSON.stringify(response, null, 2)
              self.gpxfile = response.data

            const track = new L.GPX(self.gpxfile, 
              { async: true,
                gpx_options:{
                  parseElements: ['track', 'route', 'waypoint'],
                  joinTrackSegments: false,
                },
                  polyline_options: {
                  opacity: 0.55,
                  weight: 4,
                  lineCap: 'round'
                },
                marker_options: {
                  wptIconUrls: {
                      '': 'icons/map/005-pin-1.png',
                      'Geocache Found': 'img/gpx/geocache.png',
                      'Park': 'img/gpx/tree.png'
                    },
                  startIconUrl: 'icons/map/005-pin-1.png',
                  endIconUrl: 'icons/map/024-flag.png',
                  shadowUrl: ''
                }
              })
              track.on('loaded', function (e) {
              var gpx = e.target;
                  mapObject.fitBounds(gpx.getBounds());
                  self.name= gpx.get_name()
                  self.elevation = gpx.get_elevation_max().toFixed(0)
                  self.heartrate= gpx.get_average_hr().toFixed(2)
                  self.temp= gpx.get_average_temp().toFixed(2)
                  self.elevationLoss= gpx.get_elevation_loss().toFixed(0)
                  self.averageSpeed= gpx.get_moving_speed().toFixed(2)
                  self.totalTime= gpx.get_duration_string_iso(gpx.get_total_time())
                  self.startTime= gpx.get_start_time();
                  self.endTime= gpx.get_end_time();
                  self.distance = gpx.get_distance().toFixed(2)
                    gpx.showMap= true
            })
            track.addTo(mapObject)
          
            var layer = new L.TileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png');
            mapObject.addLayer(layer);

        }).catch(error => {
          
            this.response = 'Error: ' + error.response.status
          })
            
    }

  },
  mounted(){
    
    this.drawMap()
    
  }
  
};
</script>


<style scoped>
#meta{padding:10px; background: #fff;}
.icon.xs{max-width: 40px; display: inline;}
.icon.sm{max-width: 80px; display: inline;}
h3{font-style: italic; font-weight: 100;;}
.stat{font-weight: 900;}
h3{font-size:1rem;}
</style>