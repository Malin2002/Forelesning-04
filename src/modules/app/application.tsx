import React, { useEffect, useRef, useState } from "react";
import { useGeographic } from "ol/proj";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";

import "ol/ol.css";

import "./application.css";
import { BackgroundLayerSelect } from "../layer/backgroundLayerSelect";

useGeographic();

const map = new Map({});

export function Application() {
  const [layers, setLayers] = useState<TileLayer[]>([
    new TileLayer({ source: new OSM() }),
  ]);

  const [view, setView] = useState(
    new View({ center: [10.8, 59.9], zoom: 10 }),
  );

  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    map.setTarget(mapRef.current!);
  }, []);
  useEffect(() => {
    map.setLayers(layers);
  }, [layers]);
  useEffect(() => {
    map.setView(view);
  }, [view]);

  return (
    <>
      <header>
        <h1>My map application</h1>
      </header>
      <nav>
        <BackgroundLayerSelect setLayers={setLayers} setView={setView} />
      </nav>
      <main>
        <div ref={mapRef}></div>
      </main>
    </>
  );
}
