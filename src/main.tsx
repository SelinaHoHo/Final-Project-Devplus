import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import App from "./App.tsx";
import "./config/axios.ts";
import i18n from "./config/i18n.ts";
import "./index.css";
import store from "./redux/store.ts";
import "./theme.scss";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </QueryClientProvider>,
);
