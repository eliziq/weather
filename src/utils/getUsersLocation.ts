import useLocationStore from '../store/location.store';

export const getUsersLocation = () => {
  if (!navigator.geolocation) {
    return;
  }

  const { setLocation } = useLocationStore.getState();

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    () => {
      console.log('Geolocation denied, keeping default location');
    }
  );
};
