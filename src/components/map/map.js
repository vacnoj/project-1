import './map.css';
import state from '../state/state';
import map from './mapconstant';

const directionsService = new google.maps.DirectionsService();
const directionsDisplay = new google.maps.DirectionsRenderer();


directionsDisplay.setMap(map);

let routeMarkers = [];

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

let recAreaMarkers = [];

state.recreation.filtered.on('change', function(e){
   let markerMap = {};
   let newMarkers = [];
   e.val.forEach((r) => {
      if(!r.marker){
         r.addMarker();
         r.marker.setMap(map);
      }
      else if(!r.markerDisplayed){
         r.marker.setMap(map);
      }
      r.markerDisplayed = true;
      markerMap[r.id] = true;
      newMarkers.push(r);
   });

   //remove filtered out markers
   recAreaMarkers.forEach((r) => {
      if(!markerMap[r.id]){
         r.marker.setMap(null);
         r.markerDisplayed = false;
      }
   });
   recAreaMarkers = newMarkers;
});



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

map.addListener('idle', function(){
   state.recreation.filterAll();
})

