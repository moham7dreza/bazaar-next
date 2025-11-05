'use client'

import React from 'react';
import CityList from "@/app/components/ui/home/CityList";
import CategoryHeader from "@/app/components/ui/home/CategoryHeader";
import {useFilters} from "@/app/contexts/FilterProvider";

const SearchFilters = () => {

    const {filters, setFilter} = useFilters()

    return (
        <>
            <section className="hidden lg:flex text-gray-500">
                <CityList
                    onCityChanged={(city) => setFilter('city', city)}
                    selectedCity={filters.city}
                />
            </section>

            <section className="hidden lg:flex text-gray-500">
                <CategoryHeader
                    onCategoryChanged={(category) => setFilter('category', category)}
                    selectedCategory={filters.category}
                />
            </section>

            <section className="container mx-4 lg:mx-0 lg:w-2/6 flex justify-center items-center bg-gray-100 rounded-sm">
                <input
                    onChange={(e) => setFilter('phrase', e.target.value)}
                    value={filters.phrase}
                    type="text"
                    placeholder="جستجو در همه آگهی ها"
                    className="fa border-l lg:border-l-0 border-gray-300 w-5/6 py-1 my-2 ps-2 lg:w-[94%] placeholder:text-gray-400 placeholder:text-lg bg-gray-100"
                />
                <div className="mx-1 flex justify-center lg:hidden  items-center space-x-2 space-x-reverse">
                    <button className="text-gray-600 ms-2">تهران</button>
                    <i className="fa fa-map-marker text-xl text-gray-400"></i>
                </div>
            </section>
        </>
    );
};

export default SearchFilters;
