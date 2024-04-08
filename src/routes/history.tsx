import { createBrowserHistory } from "history";
import { FC, ReactNode, createElement, useLayoutEffect, useState } from "react";
import { Router } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const history = createBrowserHistory();

interface HistoryRouterProps {
  history: typeof history;
}

interface HistoryRouterProps {
  history: typeof history;
  children: ReactNode;
}

export const HistoryRouter: FC<HistoryRouterProps> = ({ history, children }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    history.listen(setState);
  }, [history]);

  return createElement(Router, Object.assign({ children, navigator: history }, state));
};
