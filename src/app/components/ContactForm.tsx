import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        category: 'Sales_management',
        Name: '',
        // area: '500',
        // property: 'residential',
        // marble: 'new',
        // city: '',
        mobileNumber: '',
    });

    const resetForm = () => {
        setFormData({
            category: 'Sales_management',
            Name: '',
            // area: '500',
            // property: 'residential',
            // marble: 'new',
            // city: '',
            mobileNumber: '',
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadingToast = toast.loading('Initiating call...');
        try {
            // Only send category, Name, and mobileNumber in the body
            const { category, Name, mobileNumber } = formData;
            const response = await fetch('/api/initiate-call', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category, Name, mobileNumber }),
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Failed to initiate call');
            }
            toast.success('Call initiated successfully!', {
                id: loadingToast
            });
            resetForm();
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to initiate call. Please try again.', {
                id: loadingToast
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Seekho Becho Calling Agent</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    >
                        <option value="Sales_management">Sales Management</option>
                    </select>
                </div>

                <div className="  w-full ">
                    <div className="space-y-2">
                        <label htmlFor="Name" className="block text-sm font-medium text-gray-800">
                            Name
                        </label>
                        <input
                            type="text"
                            id="Name"
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* 
                    <div className="space-y-2">
                        <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                            Select Your Area
                        </label>
                        <select
                            id="area"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        >
                            <option value="">Select area</option>
                            <option value="500">500 sq ft</option>
                            <option value="1000">1000 sq ft</option>
                            <option value="2000">2000 sq ft</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="property" className="block text-sm font-medium text-gray-700">
                            Property Type
                        </label>
                        <select
                            id="property"
                            name="property"
                            value={formData.property}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        >
                            <option value="">Select property type</option>
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="marble" className="block text-sm font-medium text-gray-700">
                            Marble Type
                        </label>
                        <select
                            id="marble"
                            name="marble"
                            value={formData.marble}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        >
                            <option value="">Select marble type</option>
                            <option value="new">New Installation</option>
                            <option value="old">Old Re-polishing</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor='city' className='block text-sm font-medium text-gray-700'>
                            City
                        </label>
                        <input
                            type="text"
                            placeholder='Enter your city'
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        />
                    </div>
                    */}
                </div>

                <div className="space-y-2">
                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
                        Mobile Number
                    </label>
                    <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your mobile number"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full cursor-pointer py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}