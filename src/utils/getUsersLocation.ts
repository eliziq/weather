import useLocationStore from '../store/location.store';

export const getUsersLocation = () => {
  if (!navigator.geolocation) {
    return;
  }

  const { setFullLocation } = useLocationStore.getState();

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setFullLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    () => {
      console.log('Geolocation denied, keeping default location');
    }
  );
};
