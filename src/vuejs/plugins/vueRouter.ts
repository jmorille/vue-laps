import router from "@/router";

import type {App} from "vue";

export default function registerVueRouter(app: App): App {
    app.use(router);
    return app;
}