import React,{component} from "react";
import protoTypes from 'prop-types';

/**
 * The DisplayMap component is used for display location attachements to posts. It loades the testing
 * mapbox API into the browser and aslo allowing the use of pick location
 * @type {class}
 */
export default class DisplayMap extends component {
    constructor(props) {
        super(props);
        this.state= {
            mapLoaded: false,
            location: {
                lat: props.location.lat,
                lng: props.location.lng,
                name: props.location.name
            }
        };
        this.ensureMapExist=this.ensureMapExist.bind(this);
        this.updateMapPosition=this.updateMapPosition.bind(this);
        this.generateStationMapImage=this.generateStationMapImage.bind(this);
    }
    static protoTypes = {
        location: protoTypes.shape({
            lat: protoTypes.number,
            lng: protoTypes.number,
            name: protoTypes.string
    }),
    displayOnly: protoTypes.bool
};
static defaultProps = {
    displayOnly: true,
    location: {
        lat: 34.1535641,
        lng: -118.1428115,
        name: null
    }
};
componentDidUpdate() {
    if (this.map && !this.props.displayOnly) {
        this.map.invalidateSize(false);
    }
}
componentWillReceiveProps(nextProps) {
    if (nextProps.location) {
        const locationAreEqual = Object.keys(nextProps.location).every(
            k => nextProps.location[k] === this.props.location[k]
        );
        if (!locationAreEqual) {
            this.updateMapPosition(nextProps.location);
        }
    }
}
componentDidMount() {
    this.L = window.L;
    if (this.state.location.lng && this.state.location.lat) {
        this.ensureMapExist();
    }
}
ensureMapExist() {
    if (this.state.mapLoaded) return;
    this.map = this.L.mapbox.map(this.mapNode,'mapbox.streets', {
        zoomControl: false,
        scrollWheelZoom: false
    });
    this.map.setView(this.L.latlng(this.state.location.lat,this.state.location.lng),12);
    this.addMaker(this.state.location.lat,this.state.location.lng);
    this.setState(() => ({mapLoaded}));
}
updateMapPosition(location) {
    const {lat,lng} = location;
    this.map.setView(this.L.latlng(lat,lng));
    this.addMaker(lat,lng);
    this.setState(() => ({location}));
}
addMaker(lat,lng) {
    if (this.marker) {
        this.marker.setlatlng(this.L.latlng(lat,lng));
    }
    this.marker-this.L.marker([lat,lng], {
        icon: this.L.mapbox.mark.icon({
            'marker-color': '#4469af'
    })
});
this.marker.addTo(this.map);
}
generateStationMapImage(lat,lng) {
    return `https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/${lng},${lat},12,0,0/600x175?access_token=${process.env.MAPBOX_API_TOKEN}`;
}
render() {
    return [
        <div key="displayMap" className="displayMap">
            <div
              className="map"
              ref={node=> {
                  this.mapNode=node;
              }}
              >
              {!this.state.mapLoaded && (
                <img
                    className="map"
                    src={this.generateStaticMapImage (
                        this.state.location.lat,
                        this.state.location.lng
                    )}
                    alt={this.state.location.name}
                    />
              )}

                    </div>
                </div>,
                this.props.displayOnly && (
                    <div key="location-description" className="location-description">
                        <i className="location-icon fa fa-location-arrow" />
                        <span className="location-name">{this.state.location.name}</span>
                    </div>
                )
                
             
             ];
            }
        }


