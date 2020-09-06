import React, { useCallback } from "react";
import Maltese from "react-maltese";

import "./index.css";

function App() {
  const errorHandler = useCallback((errorStatus) => {
    // errorStatus: number

    if (errorStatus === 401) {
      // refreshing
    } else {
      // ...
    }
  }, []);

  return (
    <div className="App">
      <Maltese
        token={"토큰"}
        isLogin={"로그인여부"}
        errorHandler={errorHandler}
      />
    </div>
  );
}

export default App;
