// models/software.js
import mongoose from 'mongoose';

// Schema for user reviews
const ReviewSchema = new mongoose.Schema({
    username: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// Main software schema
const SoftwareSchema = new mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    affiliateUrl: { type: String },
    description: { type: String },
    logo: { type: String },
    overallRating: { type: Number, min: 0, max: 5 }, // overall users rating
    priceRating: { type: Number, min: 0, max: 5 },
    easeOfUseRating: { type: Number, min: 0, max: 5 },
    featuresRating: { type: Number, min: 0, max: 5 },
    supportRating: { type: Number, min: 0, max: 5 },
    reviews: [ReviewSchema], // Array of user reviews
    plansPricing: [
        {
            planName: { type: String },
            price: { type: String },
            additionalInfo: { type: String },
            featuresIncluded: { type: Array }
        }
    ],
    expertReview: {
        summary: { type: String },
        pros: { type: Array },
        cons: { type: Array }
    },
    customerSupport: {type: String},
    featuresFunctionality: {
        generalFeatures: { type: String }, // [Anonymous Browsing,Kill Switch, Multi-Protocol]
        FeaturesDescription: { type: Array }  // [{title: '', description:''}, {title2: '', description2:''}]
    },
    easeOfUse: { type: String },
    verdict: { type: String },
    promotions: { type: String },
    readyToPublish: { type: Boolean },
}, { timestamps: true });

const Software = mongoose.models?.Software || mongoose.model('Software', SoftwareSchema);

export default Software;
