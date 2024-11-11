import ReactLoading from "react-loading";

const LoadingScreen = () => {
  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className="flex items-center justify-center w-full h-full"
    >
      <ReactLoading type="spin" color="#000" />
    </div>
  );
};

export default LoadingScreen;
