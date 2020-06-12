# Maltese

Entry Q&amp;A system front

## 사용방법

```ter
npm i -D react react-dom axios react-textarea-autosize socket.io-client styled-components react-infinite-scroller
```

"react": "^16.8.6",
"react-dom": "^16.8.6",
"axios": "0.19.2",
"react-textarea-autosize": "^7.1.0",
"socket.io-client": "^2.2.0",
"styled-components": "^4.3.1",
"react-infinite-scroller": "^1.2.4"

해당 라이브러리가 peerDependencies로 들어가있음.

## 사용 예시

```js
import React from "react";
import Maltese from "react-maltese";

import "./index.css";

function App() {
  return (
    <div className="App">
      <Maltese isLogin={로그인 여부} />
    </div>
  );
}

export default App;
```
