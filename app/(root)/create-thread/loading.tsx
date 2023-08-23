import { PropagateLoader } from "react-spinners";

function Loading() {
  return (
    <div className="flex justify-center items-center min-w-full h-full">
      <PropagateLoader color="#0095F6" />;
    </div>
  );
}

export default Loading;
