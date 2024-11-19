'use client';
import { useState } from 'react';

export default function AddSoftware() {
    const [formData, setFormData] = useState({
        category: '',
        name: '',
        affiliateUrl: '',
        description: '',
        logo: '',
        priceRating: '',
        easeOfUseRating: '',
        featuresRating: '',
        supportRating: '',
        plansPricing: [{ planName: '', price: '', additionalInfo: '', featuresIncluded: '' }],
        expertReviewSummary: '',
        pros: '',
        cons: '',
        customerSupport: '',
        generalFeatures: '',
        featuresFunctionality: [{ title: '', description: '' }],
        easeOfUse: '',
        verdict: '',
        promotions: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleArrayChange = (e, index, field, arrayName) => {
        const updatedArray = [...formData[arrayName]];
        updatedArray[index][field] = e.target.value;
        setFormData({
            ...formData,
            [arrayName]: updatedArray,
        });
    };

    const addPlan = () => {
        setFormData({
            ...formData,
            plansPricing: [...formData.plansPricing, { planName: '', price: '', additionalInfo: '', featuresIncluded: '' }],
        });
    };

    const addFeatureFunctionality = () => {
        setFormData({
            ...formData,
            featuresFunctionality: [...formData.featuresFunctionality, { title: '', description: '' }],
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formattedFormData = {
          ...formData,
          expertReview: {
              summary: formData.expertReviewSummary,
              pros: formData.pros.split(',').map((item) => item.trim()),
              cons: formData.cons.split(',').map((item) => item.trim()),
          },
          generalFeatures: formData.generalFeatures,
          plansPricing: formData.plansPricing.map((plan) => ({
              ...plan,
              featuresIncluded: plan.featuresIncluded.split(',').map((item) => item.trim()),
          })),
          // Formatting featuresFunctionality according to the schema
          featuresFunctionality: {
              generalFeatures: formData.generalFeatures,
              FeaturesDescription: formData.featuresFunctionality.map((feature) => ({
                  title: feature.title,
                  description: feature.description,
              })),
          },
      };
  
      try {
          const response = await fetch('/api/softwares/add-software', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formattedFormData),
          });
          if (response.ok) {
              alert('Software added successfully!');
              setFormData({
                  category: '',
                  name: '',
                  affiliateUrl: '',
                  description: '',
                  logo: '',
                  priceRating: '',
                  easeOfUseRating: '',
                  featuresRating: '',
                  supportRating: '',
                  plansPricing: [{ planName: '', price: '', additionalInfo: '', featuresIncluded: '' }],
                  expertReviewSummary: '',
                  pros: '',
                  cons: '',
                  customerSupport: '',
                  generalFeatures: '',
                  featuresFunctionality: [{ title: '', description: '' }],
                  easeOfUse: '',
                  verdict: '',
                  promotions: '',
              });
          } else {
              alert('Failed to add software');
          }
      } catch (error) {
          console.error('Error adding software:', error);
          alert('Error adding software');
      }
  };
  

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg pt-10 pb-24">
            <h1 className="text-2xl font-bold mb-4">Add Software</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2 text-sm font-medium">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Affiliate URL</label>
                    <input
                        type="text"
                        name="affiliateUrl"
                        value={formData.affiliateUrl}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Logo URL</label>
                    <input
                        type="text"
                        name="logo"
                        value={formData.logo}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                {/* Ratings */}
                <div>
                    <label className="block mb-2 text-sm font-medium">Price Rating (up to 5)</label>
                    <input
                        type="number"
                        name="priceRating"
                        value={formData.priceRating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                        step="0.1"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Ease of Use Rating (up to 5)</label>
                    <input
                        type="number"
                        name="easeOfUseRating"
                        value={formData.easeOfUseRating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                        step="0.1"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Features Rating (up to 5)</label>
                    <input
                        type="number"
                        name="featuresRating"
                        value={formData.featuresRating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                        step="0.1"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Support Rating (up to 5)</label>
                    <input
                        type="number"
                        name="supportRating"
                        value={formData.supportRating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                        step="0.1"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                {/* Plans Pricing */}
                <div>
                    <label className="block mb-2 text-sm font-medium">Plans Pricing</label>
                    {formData.plansPricing.map((plan, index) => (
                        <div key={index} className="mb-4 border p-3 rounded-md">
                            <input
                                type="text"
                                placeholder="Plan Name"
                                value={plan.planName}
                                onChange={(e) => handleArrayChange(e, index, 'planName', 'plansPricing')}
                                className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Price"
                                value={plan.price}
                                onChange={(e) => handleArrayChange(e, index, 'price', 'plansPricing')}
                                className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Additional Info"
                                value={plan.additionalInfo}
                                onChange={(e) => handleArrayChange(e, index, 'additionalInfo', 'plansPricing')}
                                className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <textarea
                                placeholder="Features Included (comma separated)"
                                value={plan.featuresIncluded}
                                onChange={(e) => handleArrayChange(e, index, 'featuresIncluded', 'plansPricing')}
                                className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addPlan}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Add Plan
                    </button>
                </div>
                {/* Expert Review */}
                <div>
                    <label className="block mb-2 text-sm font-medium">Expert Review Summary</label>
                    <textarea
                        name="expertReviewSummary"
                        value={formData.expertReviewSummary}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Pros (comma separated)</label>
                    <textarea
                        name="pros"
                        value={formData.pros}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Cons (comma separated)</label>
                    <textarea
                        name="cons"
                        value={formData.cons}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Customer Support</label>
                    <input
                        type="text"
                        name="customerSupport"
                        value={formData.customerSupport}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">General Features</label>
                    <textarea
                        name="generalFeatures"
                        value={formData.generalFeatures}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                {/* Features Functionality */}
                <div>
                    <label className="block mb-2 text-sm font-medium">Features Functionality</label>
                    {formData.featuresFunctionality.map((feature, index) => (
                        <div key={index} className="mb-4 border p-3 rounded-md">
                            <input
                                type="text"
                                placeholder="Feature Title"
                                value={feature.title}
                                onChange={(e) => handleArrayChange(e, index, 'title', 'featuresFunctionality')}
                                className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <textarea
                                placeholder="Feature Description"
                                value={feature.description}
                                onChange={(e) => handleArrayChange(e, index, 'description', 'featuresFunctionality')}
                                className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addFeatureFunctionality}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Add Feature
                    </button>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Ease of Use</label>
                    <textarea
                        name="easeOfUse"
                        value={formData.easeOfUse}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Verdict</label>
                    <textarea
                        name="verdict"
                        value={formData.verdict}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Promotions</label>
                    <textarea
                        name="promotions"
                        value={formData.promotions}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    Submit
                </button>
            </form>
        </div>
    );
}
