import React, { useEffect, useRef } from 'react';
import UserLayout from './UserLayout';

function LiveLocation() {
  const mapContainer = useRef(null);
  let map;
  let marker;
  let trafficLayer;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAL1dpRK3hh19hFrWMi44JA2yxgGkNrOTY`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => {
      initMap();
    });
    document.body.appendChild(script);
  }, []);

  const initMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        if (!map) {
          map = new window.google.maps.Map(mapContainer.current, {
            center: { lat, lng },
            zoom: 15
          });

          trafficLayer = new window.google.maps.TrafficLayer();
          trafficLayer.setMap(map);
        } else {
          if (!marker) {
            marker = new window.google.maps.Marker({
              position: { lat, lng },
              map: map,
              title: 'Live Location'
            });
          } else {
            marker.setPosition({ lat, lng });
          }
          map.setCenter({ lat, lng });
        }
      });
    }
  };

  return (
    <><UserLayout /><div ref={mapContainer} style={{ height: '800px' }}></div></>
  );
}

export default LiveLocation;