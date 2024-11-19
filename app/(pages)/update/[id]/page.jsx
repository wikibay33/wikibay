"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateSoftware() {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    affiliateUrl: "",
    description: "",
    logo: "",
    overallRating: 0,
    priceRating: 0,
    easeOfUseRating: 0,
    featuresRating: 0,
    supportRating: 0,
    promotions: "",
    customerSupport: "",
    easeOfUse: "",
    verdict: "",
    plansPricing: [{ planName: "", price: "", additionalInfo: "", featuresIncluded: [] }],
    expertReview: { summary: "", pros: [], cons: [] },
    featuresFunctionality: { generalFeatures: "", FeaturesDescription: [{ title: "", description: "" }] },
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  
useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const response = await fetch(`/api/softwares/get-software/${id}`);
        const data = await response.json();
        setFormData({
          ...data,
          featuresFunctionality: {
            generalFeatures: data.featuresFunctionality?.generalFeatures || "",
            FeaturesDescription: data.featuresFunctionality?.FeaturesDescription || [{ title: "", description: "" }],
          },
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch software:", error);
      }
    };
    fetchSoftware();
  }, [id]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (index, field, value, arrayName) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray[index][field] = value;
    setFormData({ ...formData, [arrayName]: updatedArray });
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

  const handleFeatureDescriptionChange = (index, field, value) => {
    const updatedFeatures = [...formData.featuresFunctionality.FeaturesDescription];
    updatedFeatures[index][field] = value;
    setFormData({
      ...formData,
      featuresFunctionality: { ...formData.featuresFunctionality, FeaturesDescription: updatedFeatures },
    });
  };

  const addPlan = () => {
    setFormData({
      ...formData,
      plansPricing: [...formData.plansPricing, { planName: "", price: "", additionalInfo: "", featuresIncluded: [] }],
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

  const addExpertReviewEntry = (field) => {
    setFormData({
      ...formData,
      expertReview: {
        ...formData.expertReview,
        [field]: [...formData.expertReview[field], ""],
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/softwares/update-software/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Software updated successfully");
        router.push(`/software/${id}`);
      } else {
        alert("Failed to update software");
      }
    } catch (error) {
      console.error("Failed to update software:", error);
    }
  };

  if (loading || formData === null) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Update Software</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <input type="text" name="category" value={formData.category || ''} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Affiliate URL</label>
          <input type="text" name="affiliateUrl" value={formData.affiliateUrl} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Logo URL</label>
          <input type="text" name="logo" value={formData.logo} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        
        {/* Ratings */}
        {["overallRating", "priceRating", "easeOfUseRating", "featuresRating", "supportRating"].map((field) => (
          <div key={field}>
            <label className="block mb-1 font-semibold capitalize">{field.replace("Rating", " Rating")}</label>
            <input type="number" name={field} value={formData[field]} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
        ))}
        
        {/* Promotions */}
        <div>
          <label className="block mb-1 font-semibold">Promotions</label>
          <textarea name="promotions" value={formData.promotions} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        {/* Customer Support */}
        <div>
          <label className="block mb-1 font-semibold">Customer Support</label>
          <input type="text" name="customerSupport" value={formData.customerSupport} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        {/* Ease of Use */}
        <div>
          <label className="block mb-1 font-semibold">Ease of Use</label>
          <textarea name="easeOfUse" value={formData.easeOfUse} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        {/* Verdict */}
        <div>
          <label className="block mb-1 font-semibold">Verdict</label>
          <textarea name="verdict" value={formData.verdict} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        
        {/* Plans Pricing */}
        <div>
          <label className="block mb-1 font-semibold">Plans Pricing</label>
          {formData.plansPricing.map((plan, index) => (
            <div key={index} className="border p-3 rounded mt-2">
              <input type="text" placeholder="Plan Name" value={plan.planName} onChange={(e) => handleNestedChange(index, "planName", e.target.value, "plansPricing")} className="w-full border px-2 py-1 rounded mb-2" />
              <input type="text" placeholder="Price" value={plan.price} onChange={(e) => handleNestedChange(index, "price", e.target.value, "plansPricing")} className="w-full border px-2 py-1 rounded mb-2" />
              <textarea placeholder="Additional Info" value={plan.additionalInfo} onChange={(e) => handleNestedChange(index, "additionalInfo", e.target.value, "plansPricing")} className="w-full border px-2 py-1 rounded mb-2" />
              <textarea placeholder="Features Included (comma-separated)" value={plan.featuresIncluded.join(", ")} onChange={(e) => handleNestedChange(index, "featuresIncluded", e.target.value.split(",").map((item) => item.trim()), "plansPricing")} className="w-full border px-2 py-1 rounded" />
            </div>
          ))}
          <button type="button" onClick={addPlan} className="mt-2 px-3 py-1 bg-green-500 text-white rounded">Add Plan</button>
        </div>

        {/* Expert Review */}
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

        {/* Features Functionality */}
        <div>
          <label className="block mb-1 font-semibold">General Features</label>
          <input type="text" name="generalFeatures" value={formData.featuresFunctionality.generalFeatures} onChange={(e) => setFormData({ ...formData, featuresFunctionality: { ...formData.featuresFunctionality, generalFeatures: e.target.value } })} className="w-full border px-2 py-1 rounded mb-2" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Features Description</label>
          {formData.featuresFunctionality.FeaturesDescription.map((feature, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <input type="text" placeholder="Title" value={feature.title} onChange={(e) => handleFeatureDescriptionChange(index, "title", e.target.value)} className="w-1/2 border px-2 py-1 rounded" />
              <input type="text" placeholder="Description" value={feature.description} onChange={(e) => handleFeatureDescriptionChange(index, "description", e.target.value)} className="w-1/2 border px-2 py-1 rounded" />
            </div>
          ))}
          <button type="button" onClick={addFeatureDescription} className="mt-2 px-3 py-1 bg-green-500 text-white rounded">Add Feature Description</button>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
      </form>
    </div>
  );
}
