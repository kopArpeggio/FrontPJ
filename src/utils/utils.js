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

const height = 35;
export const MenuList = (props) => {
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
