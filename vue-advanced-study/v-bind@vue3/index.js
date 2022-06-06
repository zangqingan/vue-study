// 引入App组件
import App from "./App.js";
// 引入核心库
import { createApp } from "./core/index.js";

// 创建
createApp(App).mount(document.querySelector("#app"))