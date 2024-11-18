import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { customTheme } from "./theme";
import { HashRouter } from "react-router-dom";
import { isEnvBrowser } from "./utils/misc";
import { VisibilityProvider } from "./providers/VisibilityProvider";
import { Notifications } from '@mantine/notifications';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import pt from 'javascript-time-ago/locale/pt'

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LocalizationProvider from "./providers/LocalizationProvider";

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(pt)

if (isEnvBrowser()) {
  const root = document.getElementById("root");
  // https://i.imgur.com/vDGEfYg.png - Night time img
  root!.style.backgroundImage = 'url("https://i.imgur.com/iPTAdYV.jpeg")';
  root!.style.backgroundSize = "cover";
  root!.style.backgroundRepeat = "no-repeat";
  root!.style.backgroundPosition = "center";
}

const container = document.createElement("div");
container.id = "mantine-shared-tooltip-portal";
document.body.appendChild(container);

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {},
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider>
      <HashRouter>
        <MantineProvider withNormalizeCSS withGlobalStyles theme={customTheme}>
          <ModalsProvider>
              <VisibilityProvider>
                <Notifications position="top-right"/>
                <App />
              </VisibilityProvider>
          </ModalsProvider>
        </MantineProvider>
      </HashRouter>
    </LocalizationProvider>
  </React.StrictMode>
);
