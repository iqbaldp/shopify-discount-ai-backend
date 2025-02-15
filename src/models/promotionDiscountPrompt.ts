import { supabase } from '../config/supabase';

export interface IPromotionDiscountPrompt {
  id?: string;
  store_id: string;
  title: string;
  prompt: string;
  priority: number;
  created_at?: Date;
  updated_at?: Date;
}

export class PromotionDiscountPrompt {
  static async findOne(): Promise<IPromotionDiscountPrompt | null> {
    const { data, error } = await supabase
      .from('promotion_discount_prompts')
      .select('id, store_id, title, prompt, priority, created_at, updated_at')
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching promotion discount prompt:', error);
      return null;
    }

    return data || null;
  }

  static async findAll(): Promise<IPromotionDiscountPrompt[]> {
    const { data, error } = await supabase
      .from('promotion_discount_prompts')
      .select('id, store_id, title, prompt, priority, created_at, updated_at')
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching promotion discount prompts:', error);
      return [];
    }

    return data || [];
  }

  static async create(prompt: Omit<IPromotionDiscountPrompt, 'id' | 'created_at' | 'updated_at'>): Promise<IPromotionDiscountPrompt | null> {
    const { data, error } = await supabase
      .from('promotion_discount_prompts')
      .insert([prompt])
      .select()
      .single();

    if (error) {
      console.error('Error creating promotion discount prompt:', error);
      return null;
    }

    return data;
  }

  static async update(id: string, prompt: Partial<Omit<IPromotionDiscountPrompt, 'id' | 'created_at' | 'updated_at'>>): Promise<IPromotionDiscountPrompt | null> {
    const { data, error } = await supabase
      .from('promotion_discount_prompts')
      .update(prompt)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating promotion discount prompt:', error);
      return null;
    }

    return data;
  }

  static async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('promotion_discount_prompts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting promotion discount prompt:', error);
      return false;
    }

    return true;
  }
}