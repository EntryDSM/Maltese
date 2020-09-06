# Maltese

Entry Q&amp;A system front

## 사용방법

```ter
npm i -D react react-dom axios react-textarea-autosize socket.io-client styled-components react-infinite-scroller

npm i https://github.com/EntryDSM/Maltese.git
```

```
"react": "^16.8.6",
"react-dom": "^16.8.6",
"axios": "0.19.2",
"react-textarea-autosize": "^7.1.0",
"socket.io-client": "^2.2.0",
"styled-components": "^4.3.1",
"react-infinite-scroller": "^1.2.4"
```

해당 라이브러리가 peerDependencies로 들어가있음. 만약 위의 lib들이 전부 develop에 install되어 있다면 해당 단계는 건너뛰어도 무관.

## 사용 예시

```js
import React, { useCallback } from "react";
import Maltese from "entry-maltese";

import "./index.css";

function App() {
  const errorHandler = useCallback((errorStatus: number) => {
    if (errorStatus === 401) {
      // refreshing token
    } else {
      // ...
    }
  }, []);

  return (
    <div className="App">
      <Maltese token={토큰} isLogin={로그인여부} errorHandler={errorHandler} />
    </div>
  );
}

export default App;
```
