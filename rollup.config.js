import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import commonjs from "rollup-plugin-commonjs";
import svgr from "@svgr/rollup";
import url from "rollup-plugin-url";

const extensions = [".js", ".jsx", ".ts", ".tsx"]; // 어떤 확장자를 처리 할 지 정함

export default {
  input: "src/index.tsx",
  output: {
    file: "dist/index.js",
    format: "es",
  },
  plugins: [
    peerDepsExternal(),
    typescript({
      typescript: require("typescript"),
      objectHashIgnoreUnknownHack: true,
    }),
    url(),
    svgr(),
    resolve({ extensions }),
    commonjs({
      include: "node_modules/**",
    }),
  ],
  external: [
    "react",
    "socket.io-client",
    "react-textarea-autosize",
    "react-infinite-scroller",
    "styled-components",
  ],
};
