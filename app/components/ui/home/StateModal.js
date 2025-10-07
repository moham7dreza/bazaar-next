'use client'
import React from 'react';

const StateModal = ({states}) => {
    const [showModal, setShowModal] = React.useState(false);
    // use selected state
    const [selectedState, setSelectedState] = React.useState('انتخاب محله');

    const handleStateSelect = (state) => {
        setSelectedState(state);
        setShowModal(false);
    }

    return (
        <>
            <div className="border w-full text-start py-2 ps-2 text-gray-400 text-sm hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => setShowModal(true)}
            >
                {selectedState}
            </div>
            {
                showModal && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]'>
                        <div className='bg-white rounded-lg p-9 w-96 max-h-96 overflow-y-auto'>
                            <div className='flex items-center justify-between mb-4'>
                                <h3 className='text-lg font-semibold'>
                                    انتخاب محله
                                </h3>
                                <button onClick={() => setShowModal(false)}>
                                    <i className='fa fa-times'></i>
                                </button>
                            </div>
                            <div className="space-y-2">
                                {
                                    states?.data.map((state, index) => (
                                        <button
                                            className="w-full text-start py-2 ps-3 hover:text-gray-400 rounded text-sm hover:border-blue-500 transition-colors cursor-pointer"
                                            key={index}
                                            onClick={() => handleStateSelect(state.name)}
                                        >
                                            {state.name}
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

export default StateModal;
