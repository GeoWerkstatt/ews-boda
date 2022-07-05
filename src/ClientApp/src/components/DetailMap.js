import React, { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import WMTS from "ol/source/WMTS";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import { optionsFromCapabilities } from "ol/source/WMTS";
import { WMTSCapabilities } from "ol/format";
import { Projection, addProjection } from "ol/proj";
import { Vector } from "ol/layer";
import { Point } from "ol/geom";
import { Style, Circle, Fill, Stroke } from "ol/style";
import "ol/ol.css";

export default function DetailMap(props) {
  const { standorte } = props;
  const [map, setMap] = useState();
  const [bohrungenLayer, setBohrungenLayer] = useState();

  const mapElement = useRef();

  const defaultStyle = new Style({
    image: new Circle({
      radius: 4,
      stroke: new Stroke({
        color: [25, 118, 210, 1],
        width: 2,
      }),
      fill: new Fill({
        color: [25, 118, 210, 0.3],
      }),
    }),
  });

  // Initialize map on first render
  useEffect(() => {
    // Add custom projection for LV95
    const projection = new Projection({
      code: "EPSG:2056",
      extent: [2572670, 1211017, 2664529, 1263980],
      units: "m",
    });
    addProjection(projection);

    // Create map and feature layer
    const bohrungenLayer = new Vector({
      zIndex: 1,
      source: new VectorSource(),
      style: defaultStyle,
    });

    const initialMap = new Map({
      target: mapElement.current,
      layers: [bohrungenLayer],
      view: new View({
        projection: projection,
        maxZoom: 8,
        zoom: 2,
      }),
    });

    // Save map and vector layer references to state
    setMap(initialMap);
    setBohrungenLayer(bohrungenLayer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle asynchronous calls to layer sources
  // Baselayer
  useEffect(() => {
    const parser = new WMTSCapabilities();
    const url = "https://geo.so.ch/api/wmts/1.0.0/WMTSCapabilities.xml";
    fetch(url)
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        const result = parser.read(text);
        const options = optionsFromCapabilities(result, {
          layer: "ch.so.agi.hintergrundkarte_sw",
        });
        const landeskarte = new TileLayer({
          source: new WMTS(options),
          zIndex: 0,
        });
        map && map.addLayer(landeskarte);
      });
  }, [map]);

  // BohrungenLayer
  useEffect(() => {
    const parser = new WMTSCapabilities();
    const url = "https://geo.so.ch/api/wmts/1.0.0/WMTSCapabilities.xml";
    fetch(url)
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        const result = parser.read(text);
        const options = optionsFromCapabilities(result, {
          layer: "ch.so.agi.hintergrundkarte_sw",
        });
        const landeskarte = new TileLayer({
          source: new WMTS(options),
          zIndex: 0,
        });
        map && map.addLayer(landeskarte);
      });
  }, [map]);

  // BohrungenLayer
  useEffect(() => {
    if (standorte && bohrungenLayer) {
      let parsedFeatures;
      let bohrungen = standorte?.flatMap((s) => s.bohrungen);
      if (bohrungen.length) {
        parsedFeatures = bohrungen.map(
          (f) =>
            new Feature({
              geometry: new Point([f.geometrie.coordinates[0], f.geometrie.coordinates[1]]),
              Id: f.id,
              Bezeichnung: f.bezeichnung,
              "Standort Id": f.standortId,
            })
        );
      } else {
        parsedFeatures = [];
      }
      bohrungenLayer.setSource(
        new VectorSource({
          features: parsedFeatures,
        })
      );
      if (bohrungen.length) {
        const currentExtent = bohrungenLayer.getSource().getExtent();
        map.getView().fit(currentExtent, {
          padding: [30, 30, 30, 30],
        });
      }
    }
  }, [standorte, bohrungenLayer, map]);

  return (
    <div>
      <div ref={mapElement} className="detail-map"></div>
    </div>
  );
}