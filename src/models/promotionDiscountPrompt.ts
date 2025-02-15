import mongoose, { Document, Schema } from 'mongoose';

export interface IPromotionDiscountPrompt extends Document {
  storeId: string;
  title: string;
  prompt: string;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

const promotionDiscountPromptSchema = new Schema<IPromotionDiscountPrompt>(
  {
    storeId: { type: String, required: true },
    title: { type: String, required: true },
    prompt: { type: String, required: true },
    priority: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const PromotionDiscountPrompt = mongoose.model<IPromotionDiscountPrompt>(
  'PromotionDiscountPrompt',
  promotionDiscountPromptSchema
);