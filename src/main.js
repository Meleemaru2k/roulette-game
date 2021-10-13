import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", function () {
//     navigator.serviceWorker.register("/service-worker.js").then(
//       function (registration) {
//         // Registration was successful
//         console.log("ServiceWorker registration successful with scope: ", registration.scope);
//       },
//       function (err) {
//         // registration failed :(
//         console.log("ServiceWorker registration failed: ", err);
//       }
//     );
//   });
// }

createApp(App).mount("#app");
