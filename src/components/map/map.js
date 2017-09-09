import './map.css';
import state from '../state/state';

const directionsService = new google.maps.DirectionsService();
const directionsDisplay = new google.maps.DirectionsRenderer();
const map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 39.7642548, lng: -104.9951937},
  zoom: 5
});

//TEMP
window.map = map;

directionsDisplay.setMap(map);

let routeMarkers = [];
let recAreaMarkers = [];

state.route.on('change', function(e){
   //remove all markers
   routeMarkers.forEach((m) => {
      m.setMap(null);
   });
   routeMarkers = [];

   // //add new markers
   if(state.route.locationCount === 1){
      directionsDisplay.set('directions', null);
      map.fitBounds(e.val[0].data.geometry.viewport);
      addMarker(e.val[0].data.geometry.location, 'route');
      //update route with one location
      state.map.directions.update(e.val[0].data.geometry.location);
   }
   else if(state.route.locationCount){
      //get directions
      let request = {
         origin: state.route.origin,
         destination: state.route.destination,
         travelMode: 'DRIVING'
      }
      if(state.route.waypoints)
         request.waypoints = state.route.waypoints;
      directionsService.route(request, function(result, status) {
         if (status == 'OK') {
            state.map.directions.update(result.routes[0]);
            directionsDisplay.setDirections(result);
         }
         //else show some error toast?
      });
   }
   else{
      state.map.directions.update(null);
   }
})


state.recreation.filtered.on('change', function(e){
   console.log(e);
   let bounds = new google.maps.LatLngBounds();
   //remove all markers
   recAreaMarkers.forEach((m) => {
      m.setMap(null);
   });
   recAreaMarkers = [];

   e.val.forEach((r) => {
      let latLng = {
         lat: r.RecAreaLatitude,
         lng: r.RecAreaLongitude
      };
      addMarker(latLng, 'rec', r);
      bounds.extend(latLng);
   });
   if( e.val.length){
      map.fitBounds(bounds);
   }
})



function addMarker(location, type, area) {
   let kwargs = {
      position: location,
      map: map
   }
   if(type === 'route'){
      kwargs.label = 'A';
   }
   let marker = new google.maps.Marker(kwargs);
   if(area){
      let info = new google.maps.InfoWindow({content: makePreview(area)});
      marker.addListener('mouseover', (e) => {
         info.open(map, marker);
      });
      marker.addListener('mouseout', (e) => {
         info.close();
      });
      marker.addListener('click', area.showDetails);
   }
   if( type === 'rec'){
      recAreaMarkers.push(marker);
   }
   else if(type === 'route'){
      routeMarkers.push(marker);
   }
   else{
      throw new Error('marker type must be either "rec" or "route"');
   }
}

function makePreview(recArea){
   return `
   <strong>${recArea.RecAreaName}</strong>
   `
}



