    // Instantiate MDC Drawer
const drawerEl = document.querySelector('.mdc-drawer');
const drawer = new mdc.drawer.MDCDrawer.attachTo(drawerEl);

    // Instantiate MDC Top App Bar (required)
const topAppBarEl = document.querySelector('.mdc-top-app-bar');
const topAppBar = new mdc.topAppBar.MDCTopAppBar.attachTo(topAppBarEl);
topAppBar.setScrollTarget(document.querySelector('.main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
drawer.open = !drawer.open;
});


 
//Function that Hides all screens
const hide = () => {
    let views = document.querySelectorAll("div.view");
    for(let i = 0; i<views.length; i++){
        views[i].style.display = "none";
    }
};

//Add click events to all options in drawer
let items = document.querySelectorAll("aside.mdc-drawer a.mdc-list-item");
for(let i = 0; i<items.length; i++){
    items[i].addEventListener("click", event => {
        hide();
        let target = items[i].getAttribute("href");
        document.querySelector(target).style.display = "block";
        drawer.open = false;
        
    });
}

//event listener to hide all screens on load , so it can display properly.
window.addEventListener("load", (e) =>{
    hide();
    let home = document.querySelector("aside.mdc-drawer a.mdc-list-item");
    home.style.display = "block";
});

document.querySelector("#gitHubTab").addEventListener("click", event => {
    window.open("https://chrisagrams.github.io/", '_blank');
});


//fetching handlers
const apiKey = "58625c1e9555d4b2c4147a3578773d21"

const locationsURL = "https://api.eia.gov/category/?api_key="+apiKey+"&category_id=245143%22";

//fetch the locations availble
let locations = [];
let selectedRegion = "";
let userLocation = {lat: 0, lng: 0};

fetch(locationsURL)
.then(response => response.json())
.then(data =>{
    console.log(data);
    let childcategories = data.category.childcategories;
    console.log(childcategories);
    locations = childcategories;
    let datalist = document.querySelector("#regions");
    for(let i = 0; i<childcategories.length; i++){
        let option = document.createElement("option");
        option.value = childcategories[i].name; 
        datalist.append(option);
    }
    
});

let mapCenter = {lat: 40.674, lng: -73.945};


const redrawMap = (selectedRegion) =>{
    document.querySelector("#selectedRegionHeader").textContent = selectedRegion;
    let geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+selectedRegion+"&key=AIzaSyBg3ypNQcp81zKIARzFCwDj6msMX6HyJJE";
    fetch(geocodeURL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        mapCenter = data.results[0].geometry.location;
        console.log(mapCenter);
        initMap();
    });
}
//map ok button handler
document.querySelector("#mapOkButton").addEventListener('click', (e) =>{
    selectedRegion = document.querySelector("#regionInput").value;
    redrawMap(selectedRegion);
});


const showposition = (position) => {
    console.log(position);
    userLocation.lat = position.coords.latitude;
    userLocation.lng = position.coords.longitude;
    console.log(userLocation);
    
    let geocodeLLURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + userLocation.lat + "," + userLocation.lng + "&key=AIzaSyBg3ypNQcp81zKIARzFCwDj6msMX6HyJJE";
    fetch(geocodeLLURL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data.results[0].address_components[5].long_name);
        document.querySelector("#regionInput").value = data.results[0].address_components[5].long_name;
        redrawMap(document.querySelector("#regionInput").value);
    })
}

//get geolocation button handler
document.querySelector("#getGeolocation").addEventListener('click', (e) =>{
     if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showposition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
})



function initMap() {
        // Styles a map in night mode.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: mapCenter,
          zoom: 6,
          disableDefaultUI: true,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });
      }

//this fetches lat and long based on string name
// fetch("https://maps.googleapis.com/maps/api/geocode/json?address=US&key=AIzaSyBg3ypNQcp81zKIARzFCwDj6msMX6HyJJE").then((response)=>{console.log(response.json())});