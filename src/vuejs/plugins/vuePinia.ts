import pinia from '@/store';

// Type
import type {App} from "vue";


export default function registerVuePinia(app: App): App {
    app.use(pinia);
    return app;
}