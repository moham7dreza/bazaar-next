"use client";

import {createContext, useContext, useState} from "react";

const FilterContext = createContext({
    filters: {
        phrase: "",
        city: "",
        category: "",
    },
    updateFilters: () => {
    },
    setFilter: () => {
    },
});

export const FilterProvider = ({children}) => {
    const [filters, setFilters] = useState({
        phrase: "",
        city: "",
        category: "",
    });

    const updateFilters = (newFilters) => {
        setFilters((prevFilters) => ({...prevFilters, ...newFilters}));
    };

    const setFilter = (key, value) => {
        setFilters((prevFilters) => ({...prevFilters, [key]: value}));
    };

    return (
        <FilterContext.Provider value={{filters, updateFilters, setFilter}}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilters = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilters must be used within a FilterProvider");
    }
    return context;
};
