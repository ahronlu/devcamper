const Map = ({ position, name }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <p>Map {position[0] + "," + position[1]}</p>
    </div>
  );
};

export default Map;
