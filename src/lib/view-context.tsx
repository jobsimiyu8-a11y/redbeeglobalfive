import React, { createContext, useContext, useState, useCallback } from "react";

export type ViewName =
  | "feed"
  | "discover"
  | "provider-page"
  | "agency-page"
  | "bookings"
  | "dashboard"
  | "my-profile"
  | "register"
  | "login"
  | "messenger"
  | "settings";

interface ViewContextType {
  currentView: ViewName;
  navigate: (view: ViewName, data?: Record<string, unknown>) => void;
  viewData: Record<string, unknown>;
  history: ViewName[];
  goBack: () => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = useState<ViewName>("feed");
  const [viewData, setViewData] = useState<Record<string, unknown>>({});
  const [history, setHistory] = useState<ViewName[]>(["feed"]);

  const navigate = useCallback((view: ViewName, data?: Record<string, unknown>) => {
    setCurrentView(view);
    if (data) setViewData(data);
    setHistory(prev => [...prev, view]);
  }, []);

  const goBack = useCallback(() => {
    setHistory(prev => {
      if (prev.length <= 1) return prev;
      const newHistory = prev.slice(0, -1);
      setCurrentView(newHistory[newHistory.length - 1]);
      return newHistory;
    });
  }, []);

  return (
    <ViewContext.Provider value={{ currentView, navigate, viewData, history, goBack }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error("useView must be inside ViewProvider");
  return ctx;
}
