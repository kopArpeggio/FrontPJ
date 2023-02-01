export const getCoordinatesFromGoogleMapURL = (url) => {
  const regex = /@([-\d.]+),([-\d.]+)/;
  const match = url.match(regex);
  if (match) {
    const latitude = parseFloat(match[1]);
    const longtitude = parseFloat(match[2]);
    return { latitude, longtitude };
  }
  return null;
};
