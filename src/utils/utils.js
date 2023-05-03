import { FixedSizeList as List } from "react-window";

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

export const MenuList = (props) => {
  const height = 35;
  const { options, children, maxHeight, getValue } = props;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;

  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
};

export const getImageUrl = (filename) => {
  return `${process.env.REACT_APP_UPLOAD_HOST}/${process.env.REACT_APP_IMAGE_PATH}/${filename}`;
};
export const getPDFUrl = (filename) => {
  return `${process.env.REACT_APP_UPLOAD_HOST}/${process.env.REACT_APP_PDF_PATH}/${filename}`;
};

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
