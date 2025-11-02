'use client'
import React from 'react';

const CityModal = ({cities, onCityChanged, selectedCity}) => {
    const [showModal, setShowModal] = React.useState(false);

    const handleCitySelect = (city) => {
        if (onCityChanged) {
            onCityChanged(city);
        }
        setShowModal(false);
    }

    return (
        <>
            <div className="flex items-center space-x-reverse space-x-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                onClick={() => setShowModal(true)}
            >
                <i className="fa fa-map-marker text-xl text-gray-500"></i>
                <p>{selectedCity || 'انتخاب شهر'}</p>
                <i className="fa fa-angle-down text-xl text-gray-500"></i>
            </div>
            {
                showModal && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]'>
                        <div className='bg-white rounded-lg p-9 w-96 max-h-96 overflow-y-auto'>
                            <div className='flex items-center justify-between mb-4'>
                                <h3 className='text-lg font-semibold'>
                                    انتخاب شهر
                                </h3>
                                <button onClick={() => setShowModal(false)}>
                                    <i className='fa fa-times'></i>
                                </button>
                            </div>
                            <div className="space-y-2">
                                {
                                    cities?.data.map((city, index) => (
                                        <button
                                            className="w-full text-start py-2 ps-3 hover:text-gray-400 rounded text-sm hover:border-blue-500 transition-colors cursor-pointer"
                                            key={index}
                                            onClick={() => handleCitySelect(city.name)}
                                        >
                                            {city.name}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default CityModal;
