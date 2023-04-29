import React, { Component } from "react";
import ProtoTypes from 'prop-types'
import mapbox from 'mapbox';

import Loader from './loader';

/**
 * present the usseer with a typeahead so they can pick a location
 * @type {object}
 */
export default class LocationTypeAhead extends Component {
    static ProtoTypes = {
        onLocationUpdate: ProtoTypes.func.isRequired,
        onLocationSelect: ProtoTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            locations: [],
            selectedLocation: null,
            error: null
        };
        this.mapbox=new mapbox(process.env.MAPBOX_API_TOKEN);
        this.attemptGetLocation=this.attemptGetLocation.bind(this);
        this.handleLocationUpdate=this.handleLocationUpdate.bind(this);
        this.handleSearchChange=this.handleSearchChange.bind(this);
        this.handleSelectLocation=this.handleSelectLocation.bind(this);
        this.resetSearch=this.resetSearch.bind(this);
    }
    commentDidUpdate(prevProps,prevState) {
        if (prevState.text ==='' && this.state.locations.length) {
            this.setState(() => ({ locations: []}));
        }
    }
    commentWillUnmount() {
        this.resetSearch();
    }
    handleLocationUpdate(location) {
        this.setState(() => {
            return {
                text: location.name,
                locations: [],
                selectedLocation: location
            };
        });
        this.props.onLocationUpdate(location);
    }
    handleSearchChange(e) {
        const text = e.target.value;
        this.setState(() => ({text}));
        if (!text) return;
        this.mapbox.geocodeForward(text,{}).then(loc => {
            if (!loc.entity.features || !loc.entity.features.length) {
                return;
            }
            const locations=loc.entity.features.map(feature => {
                const [lng,lat] = feature.center;
                return {
                    name: feature.place_name,
                    lat,
                    lng
                };
            });
            this.setState(() => ({locations}));
        });
    }
    attemptGetLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                ({coords}) => {
                    const {lattitude,longitude}=coords;
                    this.mapbox.geocodeReverse({lattitude,longitude}, {}).then(loc => {
                        if (!loc.entity.features || !loc.entity.features.length) {
                            return;
                        }
                        const feature=loc.entity.features[0];
                        const [lng,lat]=feature.center;
                        const currentLocation={
                            name: feature.place_name,
                            lat,
                            lng
                        };
                        this.setState(() => ({
                            locations: [currentLocation],
                            selectedLocation: currentLocation,
                            text: currentLocation.name
                    }));
                    this.handleLocationUpdate(currentLocation);
                });
            },
            null,
            {
                  enableHighAccuracy: true,
                  timeout: 5000,
                  maximumAge: 0
            }
        );
    }
}
resetSearch() {
    this.setState(() => {
        return {
            text: '',
            locations: [],
            selectedLocation: null
        };
    });
}
handleSelectLocation() {
    this.props.onLocationSelect(this.state.selectedLocation);
}
render() {
    // as of react 16,you can return arrays from render and no longer need to return
    // a wrapping element(like a div) around everything
    return [
        <div key="location-typeahead" className="location-typeahead">
            <i className="fa fa-location-arrow" onClick={this.attemptGetLocation} />
            <input
                onChange={this.handleSearchChange}
                type="text"
                placeholder="Enter a location...."
                value={this.state.text} 
                />
                {this.state.searching ? (
                    <Loader />
                ) : (
                    <button
                         disabled={!this.state.selectedLocation}
                         onClick={this.handleSelectLocation}
                         className="open" >
                           
                            select
                         </button>
                )}
        </div>,
        this.state.text.length && this.state.locations.length ? (
            <div key="location-typeahead-results" className="location-typeahead-results">
                {this.state.locations.map(location => {
                    return (
                        <div 
                           onClick={e => {
                            e.preventDefault();
                            this.handleLocationUpdate(location);
                           }}
                           key={location.name}
                           className="result"
                           >
                            {location.name}
                        </div>
                    );
                })}
            </div>
        ) : null
    ];
}
}
