import { useSelector } from "react-redux";
import AfterLoginContent from "./AfterLoginContent";
import Home from "./Home";
import authSelector from "./redux/selector/auth/AuthSelector";
import { useEffect } from "react";
function App() {
  const selector = useSelector(authSelector);
  useEffect(() => {
    console.log("selector", selector.data.token);
  }, [selector]);

  return (
    <div>
      {selector && selector?.data && selector?.data?.token ? (
        <AfterLoginContent />
      ) : (
        <Home />
      )}
    </div>
  );
}

export default App;
