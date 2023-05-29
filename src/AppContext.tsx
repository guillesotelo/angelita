import React, { createContext } from 'react'

type AppContextType = {
    lang: string
    isMobile: boolean
    setLang: (lang: string) => void
    search: string[]
    setSearch: (search: string[]) => void
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<AppContextType> = ({ lang, setLang, isMobile, search, setSearch, children }) => (
    <AppContext.Provider value={{ lang, setLang, search, setSearch, isMobile }}>{children}</AppContext.Provider>
);
