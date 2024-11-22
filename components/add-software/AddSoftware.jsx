"use client";

import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";

// Sub-component for Plans Pricing
const PlanPricing = ({ plansPricing, handleArrayChange, addPlan }) => (
    <div>
      <label className="block mb-2 text-sm font-medium">Plans Pricing</label>
      {plansPricing.map((plan, index) => (
        <div key={index} className="mb-4 border p-3 rounded-md">
          {/* Plan Name */}
          <input
            type="text"
            placeholder="Plan Name"
            value={plan.planName}
            onChange={(e) => handleArrayChange(e, index, "planName", "plansPricing")}
            className="w-full mb-2 p-2 border border-gray-300 rounded-md"
            required
          />
  
          {/* Plan Price */}
          <input
            type="text"
            placeholder="Price"
            value={plan.price}
            onChange={(e) => handleArrayChange(e, index, "price", "plansPricing")}
            className="w-full mb-2 p-2 border border-gray-300 rounded-md"
            required
          />
  
          {/* Additional Info */}
          <input
            type="text"
            placeholder="Additional Info"
            value={plan.additionalInfo}
            onChange={(e) => handleArrayChange(e, index, "additionalInfo", "plansPricing")}
            className="w-full mb-2 p-2 border border-gray-300 rounded-md"
          />
  
          {/* Features Included */}
          <textarea
          placeholder="Features Included (comma separated)"
          defaultValue={plan.featuresIncluded} // Join with a space after commas for display
          onBlur={(e) => {
            const inputValue = e.target.value;
            const updatedFeatures = inputValue.split(",").map((item) => item.trim()); // Split and trim by commas
            handleArrayChange(
              { target: { value: updatedFeatures } },
              index,
              "featuresIncluded",
              "plansPricing"
            );
          }}
          className="w-full mb-2 p-2 border border-gray-300 rounded-md"
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
  );

// Sub-component for Features Functionality
const FeaturesFunctionality = ({
    featuresFunctionality,
    handleFeatureDescriptionChange,
    addFeatureDescription,
  }) => (
    <div>
      <label className="block mb-1 font-semibold">Features Description</label>
      {featuresFunctionality.FeaturesDescription.map((feature, index) => (
        <div key={index} className="flex gap-4 mb-2">
          <input
            type="text"
            placeholder="Title"
            value={feature.title}
            onChange={(e) =>
              handleFeatureDescriptionChange(index, "title", e.target.value)
            }
            className="w-1/2 border px-2 py-1 rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={feature.description}
            onChange={(e) =>
              handleFeatureDescriptionChange(index, "description", e.target.value)
            }
            className="w-1/2 border px-2 py-1 rounded"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addFeatureDescription}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
      >
        Add Feature Description
      </button>
    </div>
  );
  
// Main Component
export default function AddSoftware() {
    const [formData, setFormData] = useState({
        category: "",
        name: "",
        affiliateUrl: "",
        description: "",
        logo: "",
        priceRating: "",
        easeOfUseRating: "",
        featuresRating: "",
        supportRating: "",
        plansPricing: [{ planName: "", price: "", additionalInfo: "", featuresIncluded: [] }],
        expertReview: { summary: "", pros: [], cons: [] },
        customerSupport: "",
        featuresFunctionality: { generalFeatures: "", FeaturesDescription: [{ title: "", description: "" }] },
        easeOfUse: "",
        verdict: "",
        promotions: "",
      });
    
      const [categories, setCategories] = useState([]);
      const [error, setError] = useState("");
      // URL validation function
      const isValidUrl = (url) => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      };
    
      // Fetch categories from the database
      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch("/api/softwares/get-categories");
            if (response.ok) {
              const data = await response.json();
              setCategories(data.map((category) => ({ value: category, label: category })));
            } else {
              console.error("Failed to fetch categories");
            }
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
    
        fetchCategories();
      }, []);
    
      const handleCategoryChange = (selectedOption) => {
        setFormData({ ...formData, category: selectedOption ? selectedOption.value : "" });
      };
    
      const handleCreateCategory = async (inputValue) => {
        try {
          const response = await fetch("/api/softwares/add-category", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ category: inputValue }),
          });
    
          if (response.ok) {
            const data = await response.json();
            setCategories((prevCategories) => [
              ...prevCategories,
              { value: data.category, label: data.category },
            ]);
            setFormData({ ...formData, category: data.category });
          } else {
            const errorData = await response.json();
            console.error("Failed to add category:", errorData.message);
          }
        } catch (error) {
          console.error("Error adding category:", error);
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      const handleChangeGeneralFeature = (e) => {
        const { value } = e.target;
        setFormData((prev) => ({
          ...prev,
          featuresFunctionality: {
            ...prev.featuresFunctionality,
            generalFeatures: value, // Update only the generalFeatures field
          },
        }));
      };
      const handleArrayChange = (e, index, field, arrayName) => {
        const updatedArray = [...formData[arrayName]];
        updatedArray[index][field] = e.target.value; // Update the specific field in the array
        setFormData({ ...formData, [arrayName]: updatedArray });
      };
    
      const addPlan = () => {
        setFormData((prev) => ({
          ...prev,
          plansPricing: [
            ...prev.plansPricing,
            { planName: "", price: "", additionalInfo: "", featuresIncluded: "" },
          ],
        }));
      };
    
      const handleFeatureDescriptionChange = (index, field, value) => {
        const updatedFeatures = [...formData.featuresFunctionality.FeaturesDescription];
        updatedFeatures[index][field] = value;
        setFormData({
          ...formData,
          featuresFunctionality: { ...formData.featuresFunctionality, FeaturesDescription: updatedFeatures },
        });
      };
    
      const addFeatureDescription = () => {
        setFormData({
          ...formData,
          featuresFunctionality: {
            ...formData.featuresFunctionality,
            FeaturesDescription: [...formData.featuresFunctionality.FeaturesDescription, { title: "", description: "" }],
          },
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate logo URL
        if (!isValidUrl(formData.logo)) {
          setError("Please enter a valid URL for the logo.");
          return;
        }
    
        // const formattedFormData = {
        //   ...formData,
        //   pros: formData.pros.split(",").map((item) => item.trim()), // Split pros into an array
        //   cons: formData.cons.split(",").map((item) => item.trim()), // Split cons into an array
        //   plansPricing: formData.plansPricing.map((plan) => ({
        //     ...plan,
        //     featuresIncluded: plan.featuresIncluded
        //       .split(",")
        //       .map((feature) => feature.trim()), // Split featuresIncluded into an array
        //   })),
        //   featuresFunctionality: {
        //     generalFeatures: formData.generalFeatures,
        //     FeaturesDescription: formData.featuresFunctionality,
        //   },
        // };
    
        try {
          const response = await fetch("/api/softwares/add-software", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            alert("Software added successfully!");
            setFormData({
              category: "",
              name: "",
              affiliateUrl: "",
              description: "",
              logo: "",
              priceRating: "",
              easeOfUseRating: "",
              featuresRating: "",
              supportRating: "",
              plansPricing: [{ planName: "", price: "", additionalInfo: "", featuresIncluded: "" }],
              expertReview: { summary: "", pros: [], cons: [] },

              customerSupport: "",
              featuresFunctionality: { generalFeatures: "", FeaturesDescription: [{ title: "", description: "" }] },

              easeOfUse: "",
              verdict: "",
              promotions: "",
            });
          } else {
            alert("Failed to add software");
          }
        } catch (error) {
          console.error("Error adding software:", error);
          alert("Error adding software");
        }
      };
      const handleExpertReviewChange = (field, index, value) => {
        const updatedReview = { ...formData.expertReview };
        if (Array.isArray(updatedReview[field])) {
          updatedReview[field][index] = value;
        } else {
          updatedReview[field] = value;
        }
        setFormData({ ...formData, expertReview: updatedReview });
      };
      const addExpertReviewEntry = (field) => {
        setFormData({
          ...formData,
          expertReview: {
            ...formData.expertReview,
            [field]: [...formData.expertReview[field], ""],
          },
        });
      };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg pt-10 pb-24">
      <h1 className="text-2xl font-bold mb-4">Add Software</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <div>
          <label className="block mb-2 text-sm font-medium">Category</label>
          {categories.length === 0 ? (
            <p>Loading categories...</p>
          ) : (
            <CreatableSelect
              isClearable
              onChange={handleCategoryChange}
              onCreateOption={handleCreateCategory}
              options={categories}
              value={categories.find((option) => option.value === formData.category)}
              className="w-full"
              classNamePrefix="react-select"
            />
          )}
        </div>
        {/* Name */}
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
        {/* Affiliate URL */}
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
        {/* Description */}
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
        {/* Logo */}
        <div>
          <label className="block mb-2 text-sm font-medium">Logo URL</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={(e) => {
              handleChange(e);
              setError(""); // Clear error on input change
            }}
            className={`w-full p-2 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
            required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
        <PlanPricing
          plansPricing={formData.plansPricing}
          handleArrayChange={handleArrayChange}
          addPlan={addPlan}
        />
        {/* Expert Review Summary */}
        {/* <div>
          <label className="block mb-2 text-sm font-medium">Expert Review Summary</label>
          <textarea
            name="expertReviewSummary"
            value={formData.expertReviewSummary}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div> */}
        {/* Pros and Cons */}
        <div>
          <label className="block mb-1 font-semibold">Expert Review Summary</label>
          <textarea name="summary" value={formData.expertReview.summary} onChange={(e) => handleExpertReviewChange("summary", null, e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Pros</label>
          {formData.expertReview.pros.map((pro, index) => (
            <input key={index} type="text" value={pro} onChange={(e) => handleExpertReviewChange("pros", index, e.target.value)} className="w-full border px-2 py-1 rounded mb-2" />
          ))}
          <button type="button" onClick={() => addExpertReviewEntry("pros")} className="mt-2 px-3 py-1 bg-green-500 text-white rounded">Add Pro</button>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Cons</label>
          {formData.expertReview.cons.map((con, index) => (
            <input key={index} type="text" value={con} onChange={(e) => handleExpertReviewChange("cons", index, e.target.value)} className="w-full border px-2 py-1 rounded mb-2" />
          ))}
          <button type="button" onClick={() => addExpertReviewEntry("cons")} className="mt-2 px-3 py-1 bg-green-500 text-white rounded">Add Con</button>
        </div>
        {/* Customer Support */}
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
        {/* General Features */}
        <div>
  <label className="block mb-2 text-sm font-medium">General Features</label>
  <textarea
    name="generalFeatures"
    value={formData.featuresFunctionality.generalFeatures} // Access the nested field
    onChange={handleChangeGeneralFeature} // Use the updated handler
    className="w-full p-2 border border-gray-300 rounded-md"
    required
  />
</div>
        {/* Features Functionality */}
        <FeaturesFunctionality
          featuresFunctionality={formData.featuresFunctionality}
          handleFeatureDescriptionChange={handleFeatureDescriptionChange}
          addFeatureDescription={addFeatureDescription}
        />
        {/* Ease of Use */}
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
        {/* Verdict */}
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
        {/* Promotions */}
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
        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Submit
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      </form>
    </div>
  );
}
