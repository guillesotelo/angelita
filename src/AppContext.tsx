import React, { createContext } from 'react'

type AppContextType = {
    lang: string
    isMobile: boolean
    setLang: (lang: string) => void
    search: string[]
    setSearch: (search: string[]) => void
    isLoggedIn: boolean
    setIsLoggedIn: (value: boolean) => void
    renderAll: boolean
    setRenderAll: (value: boolean) => void
    service: number
    setService: (value: number) => void
    checkout: string
    setCheckout: (value: string) => void
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<AppContextType> = ({
    lang,
    setLang,
    isMobile,
    setIsLoggedIn,
    isLoggedIn,
    search,
    setSearch,
    renderAll,
    setRenderAll,
    service,
    setService,
    checkout,
    setCheckout,
    children
}) => (
    <AppContext.Provider value={{
        lang,
        setLang,
        search,
        setSearch,
        isMobile,
        setIsLoggedIn,
        isLoggedIn,
        renderAll,
        setRenderAll,
        service,
        setService,
        checkout,
        setCheckout,
    }}>{children}</AppContext.Provider>
);
