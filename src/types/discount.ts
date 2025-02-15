export interface CartData {
  [key: string]: any;
}

export interface DiscountTarget {
  cartLine: {
    id: string;
  };
}

export interface DiscountValue {
  percentage: {
    value: string;
  };
}

export interface Discount {
  targets: DiscountTarget[];
  value: DiscountValue;
  message: string;
}

export interface DiscountRecommendation {
  discounts: Discount[];
  discountApplicationStrategy: string;
}

export interface PromptRequest {
  cart: CartData;
  discountPrompt: string;
}