import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApplicationConstants } from 'src/app/core/constants/application.constant';
import { ApplicationService } from 'src/app/shared/application.service';
// import { } from '@types/googlemaps';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() appLatitude: number;
  @Input() appLongitute: number;
  @Input() zoom: number = 13;
  @Input() agmPaths: any;
  // marker: any;
  // map: google.maps.Map;
// currentLatitude: number;
  // currentLongitute: number;
  // defaultCenter = {lat: 55.5815245, lng: 36.8251383};
  // currentCenter = Object.assign({}, this.defaultCenter);

  @ViewChild('agmMap', {static: true}) agmMap;

  constructor(public appService: ApplicationService) {
  }

  ngOnInit() {
    // this.mapListeners();
    this.searchCode();
    this.showCurrentPosition();
  }

  mapListeners() {
    // this.agmMap.mapReady.subscribe(map => {
    //   // this.getLatLngByZipcode("75202");
    // });
  }

  searchCode() {
    let coordinates = [];
    this.appLatitude = 7.119082288502541;
    this.appLongitute = -73.120029012106;

    coordinates.push(this.buildCoordinatesArrayFromString(ApplicationConstants.BERMUDA_COORDINATES));
    coordinates.push(this.buildCoordinatesArrayFromString(ApplicationConstants.BERMUDA_COORDINATES_1));
    this.agmPaths = coordinates;
  }

  buildCoordinatesArrayFromString(multiGeometryCoordinates) {
    var finalData = [];
    var grouped = multiGeometryCoordinates.split("\n");

    grouped.forEach(function (item, i) {
      let a = item.trim().split(',');

      finalData.push({
        lng: parseFloat(a[0]),
        lat: parseFloat(a[1])
      });
    });

    return finalData;
  }

  showCurrentPosition() {
    // if (navigator && navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(pos => {
    //         this.appLatitude = pos.coords.latitude;
    //         this.appLongitute = pos.coords.longitude;
    //         console.log(this.appLatitude + " <---showCurrentPosition location--> " + this.appLongitute);
    //       });
    // } else {
    //   alert("Geolocation is not supported by this browser.");
    // }
  }

  // showPosition(position) {
  //   this.currentLat = position.coords.latitude;
  //   this.currentLong = position.coords.longitude;

  //   let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //   this.map.panTo(location);

  //   if (!this.marker) {
  //     this.marker = new google.maps.Marker({
  //       position: location,
  //       map: this.map,
  //       title: 'Got you!'
  //     });
  //   }
  //   else {
  //     this.marker.setPosition(location);
  //   }
  // }

  mapReady() {
    console.log("<--mapReady-->");
    this.getLatLngByZipcode(this.appService.userProfile.fullAddress);
  }

  getLatLngByZipcode(zipcode) {
    var geocoder = new google.maps.Geocoder();
    var address = zipcode;
    const self = this;
    geocoder.geocode({ 'address': address }, function (results, status) {
      
      if (status == google.maps.GeocoderStatus.OK) {
        self.appLatitude = results[0].geometry.location.lat();
        self.appLongitute = results[0].geometry.location.lng();
        console.log(self.appLatitude + " <---getLatLngByZipcode location--> " + self.appLongitute);
      } else {
        alert("Request failed.")
      }
    });

    // return [latitude, longitude];
  }

  // geocode(address: string): Promise<any> {
  //   const geocoder = new google.maps.Geocoder();
  //   return new Promise((resolve, reject) => {
  //     geocoder.geocode(
  //       {
  //         address: address
  //       },
  //       (results, status) => {
  //         if (status === google.maps.GeocoderStatus.OK) {
  //           resolve(results[0]);
  //         } else {
  //           reject(new Error(status));
  //         }
  //       }
  //     );
  //   });
  // }
}
