import { openai } from '../config/openai';
import { DISCOUNT_SYSTEM_PROMPT } from '../config/prompts';
import { CartData, DiscountRecommendation } from '../types/discount';

export class DiscountService {
  private static readonly SYSTEM_PROMPT = DISCOUNT_SYSTEM_PROMPT;

  public static async getDiscountRecommendations(
    cart: CartData,
    discountPrompt: string
  ): Promise<DiscountRecommendation> {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: [
        {
          role: "system",
          content: this.SYSTEM_PROMPT
        },
        {
          role: "user",
          content: JSON.stringify({ cart, discountPrompt })
        }
      ],
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.4'),
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '1000', 10)
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Invalid response from OpenAI API');
    }

    return JSON.parse(content);
  }
}