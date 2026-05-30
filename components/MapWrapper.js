"use client";

import dynamic from "next/dynamic";

const MapInner = dynamic(() => import("./MapInner"), {
  ssr: false,
});

export default function MapWrapper({ properties }) {
  return <MapInner properties={properties} />;
}
