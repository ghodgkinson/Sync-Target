import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var H: any;
declare var jQuery: any;

@Component({
  selector: 'app-outage-report',
  templateUrl: './outage.report.component.html',
  styleUrls: ['./outage.report.component.css']
})
export class OutageReportComponent implements OnInit {

  @ViewChild('map', { static: true }) public mapElement: ElementRef;

  public lat: any = '33.74832';
  public lng: any = '-84.39111';
  public bbox: any = [-84.55097, 33.64672, -84.28972, 33.88719];

  public width: any = '700px';
  // = '1000px';
  public height: any = '475px';
  // = '600px';

  private platform: any;
  private map: any;

  appId: any = 'rl8HG5qeMhawyBhtxD1z';
  appCode: any = 'YZUFlLGL9LQ3xdp93QqATg';

  public query: string;
  private search: any;
  private ui: any;
  public address: any = '';
  public cities: any;
  results: string[];
  placeName: any;

  public constructor() {
    this.query = '';
  }

  public ngOnInit() {
    this.platform = new H.service.Platform({
      app_id: this.appId,
      app_code: this.appCode,
      useHTTPS: true
    });
    this.search = new H.places.Search(this.platform.getPlacesService());
    this.cities = [
      {
        name: 'Atlanta',
        outage: 4,
        cord: [33.7490, -84.3880],
        bbox: [-84.55097, 33.64672, -84.28972, 33.88719]
      },
      {
        name: 'Augusta-Richmond County',
        outage: 1,
        cord: [33.4735, -82.0105],
        bbox: [-82.35365, 33.22715, -81.82807, 33.54501]
      },
      {
        name: 'Columbus',
        outage: 3,
        cord: [39.9612, -82.9988],
        bbox: [-85.0807, 32.3736, -84.6676, 32.60803]
      },
      {
        name: 'Macon-Bibb County',
        outage: 5,
        cord: [32.8407, -83.6324],
        bbox:  [-83.89277, 32.65941, -83.48948, 32.95308]
      },
      {
        name: 'Savannah',
        outage: 1,
        cord: [32.0809, -81.0912],
        bbox: [-81.37143, 31.88729, -81.02929, 32.18974]
      },
      {
        name: 'Athens-Clarke County',
        outage: 2,
        cord: [33.9519, -83.3576],
        bbox: [-83.53748, 33.84796, -83.24097, 34.04026]
      },
      {
        name: 'Sandy Springs',
        outage: 0,
        cord: [33.9304, -84.3733],
        bbox: [-84.44763, 33.87695, -84.25851, 34.0102]
      }
    ];
  }

  public ngAfterViewInit() {
    const pixelRatio = window.devicePixelRatio || 1;
    const defaultLayers = this.platform.createDefaultLayers({
      tileSize: pixelRatio === 1 ? 256 : 512,
      ppi: pixelRatio === 1 ? undefined : 320
    });

    this.map = new H.Map(this.mapElement.nativeElement,
      defaultLayers.normal.map, { pixelRatio: pixelRatio });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);

    this.map.setCenter({ lat: this.lat, lng: this.lng });
    this.map.setZoom(12);
    this.dropMarker({ 'lat': this.lat, 'lng': this.lng }, {});
    this.dropRectangle(this.bbox, this.bbox);

    this.setUpClickListener(this.map);
  }


  public onCityClick(event) {
    this.map.removeObjects(this.map.getObjects());
    const cord = event.cord;
    const bbox = event.bbox;
    this.lat = cord[0];
    this.lng = cord[1];
    this.map.setCenter({ lat: this.lat, lng: this.lng });
    this.map.setZoom(12);
    this.dropMarker({ 'lat': this.lat, 'lng': this.lng }, cord);
    this.dropRectangle(bbox, event);
  }

  public  searchHandler(event) {
        this.places(event.query);
        // .then(data => {
        //     this.results = data;
        // });
    }

  public places(query: string) {
    this.map.removeObjects(this.map.getObjects());
    console.log('place name', this.placeName);
    // this.search.request({ "q": query, "at": this.lat + "," + this.lng }, {}, data => {
    this.search.request({ "q": query, "at": this.lat + "," + this.lng }, {}, data => {
      // console.log(data);
      this.results = data.results.items;
      // console.log('place name', this.placeName);
    }, error => {
      console.error(error);
    });
  }

  public onSelectPlace(event) {
    console.log(event);
    this.lat = event.position[0];
    this.lng = event.position[1];
    this.map.setCenter({ lat: this.lat, lng: this.lng });  
    this.map.setZoom(12);
    this.dropMarker({ "lat": this.lat, "lng": this.lng }, event);
    this.dropRectangle(event.bbox, event);
  }

  private dropMarker(coordinates: any, data: any) {
    const marker = new H.map.Marker(coordinates);
    marker.setData("<p>" + data.title + "<br>" + data.vicinity + "</p>");  
    marker.addEventListener('tap', event => {
      const bubble = new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData()
      });
      this.ui.addBubble(bubble);
    }, false);
    this.map.addObject(marker);
  }

  private dropRectangle(bbox: any, data: any) {
    // Create a style object:
    let customStyle = {
      strokeColor: 'black',
      fillColor: 'rgba(255, 255, 255, 0.5)',
      lineWidth: 5,
      lineCap: 'square',
      lineJoin: 'bevel'
    };

    // Create a rectangle and pass the custom style as an options parameter:
    const rect = new H.map.Rect(new H.geo.Rect(85.5, 24.8, 85.564, 24.92), 
      { style: customStyle });

    // Add the rectangle to the map:
    this.map.addObject(rect);

    // Instantiate a circle object (using the default style):
    const circle = new H.map.Circle({lat: this.lat, lng: this.lng}, 4000);
    let bubble;
    circle.addEventListener('pointerenter', event => {
      console.log(event);
      bubble = new H.ui.InfoBubble(event.target.o, {
        content: `
          <div">
          <h5>City: Atlanta</h5>
          <h5>Zip Code: Atlanta</h5>
          <h5>Total Affected: 1</h5>
          <hr/>
          <h5>Customer Out: Atlanta</h5>
          <h5>Cause: Not Yet Determined</h5>
          <h5>Status: Creq Assigned</h5>
          <h5>Estimated Restoration: 10/01/2019 11:20am Eastern</h5>
          </div>
          `
      });
      this.ui.addBubble(bubble);
    }, false);
    circle.addEventListener('pointerleave', event => {
      console.log(event);
      bubble.close();
    }, false);
    // Add the circle to the map:
    this.map.addObject(circle);
  }

  public setUpClickListener(map: any) {
    let self = this;
    this.map.addEventListener('tap', function(evt: any) {
      let coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);  
      self.lat = Math.abs(coord.lat.toFixed(4)) + ((coord.lat > 0) ? 'N' : 'S');  
      self.lng = Math.abs(coord.lng.toFixed(4)) + ((coord.lng > 0) ? 'E' : 'W');  
      self.fetchAddress(coord.lat, coord.lng);
    });
  }

  private fetchAddress(lat: any, lng: any): void {
    let self = this;
    let geocoder: any = this.platform.getGeocodingService(),
      parameters = {
        prox: lat + ', ' + lng + ',20',
        mode: 'retrieveAreas',
        gen: '9'
      };
  
  
    geocoder.reverseGeocode(parameters,  
      function (result) {  
        let data = result.Response.View[0].Result[0].Location.Address;  
        self.address = data.Label + ', ' + data.City + ', Pin - ' + data.PostalCode + ' ' + data.Country;  
      }, function (error) {  
        alert(error);  
      });  
  }  

}
