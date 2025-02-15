import express, { Request, Response, RequestHandler } from 'express';
import { PromotionDiscountPrompt } from '../models/promotionDiscountPrompt';

const router = express.Router();

// Get all promotion discount prompts
const getAllPrompts: RequestHandler = async (req, res) => {
  try {
    const prompts = await PromotionDiscountPrompt.findAll();
    res.json(prompts);
  } catch (error) {
    console.error('Error in GET /promotion-discount-prompts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single promotion discount prompt
const getPromptById: RequestHandler = async (req, res) => {
  try {
    const prompt = await PromotionDiscountPrompt.findOne();
    if (!prompt) {
      res.status(404).json({ error: 'Promotion discount prompt not found' });
      return;
    }
    res.json(prompt);
  } catch (error) {
    console.error('Error in GET /promotion-discount-prompts/:id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new promotion discount prompt
const createPrompt: RequestHandler = async (req, res) => {
  try {
    const { store_id, title, prompt, priority } = req.body;
    const newPrompt = await PromotionDiscountPrompt.create({
      store_id,
      title,
      prompt,
      priority
    });
    if (!newPrompt) {
      res.status(400).json({ error: 'Failed to create promotion discount prompt' });
      return;
    }
    res.status(201).json(newPrompt);
  } catch (error) {
    console.error('Error in POST /promotion-discount-prompts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a promotion discount prompt
const updatePrompt: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { store_id, title, prompt, priority } = req.body;
    const updatedPrompt = await PromotionDiscountPrompt.update(id, {
      store_id,
      title,
      prompt,
      priority
    });
    if (!updatedPrompt) {
      res.status(404).json({ error: 'Promotion discount prompt not found' });
      return;
    }
    res.json(updatedPrompt);
  } catch (error) {
    console.error('Error in PUT /promotion-discount-prompts/:id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a promotion discount prompt
const deletePrompt: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await PromotionDiscountPrompt.delete(id);
    if (!success) {
      res.status(404).json({ error: 'Promotion discount prompt not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error in DELETE /promotion-discount-prompts/:id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

router.get('/', getAllPrompts);
router.get('/:id', getPromptById);
router.post('/', createPrompt);
router.put('/:id', updatePrompt);
router.delete('/:id', deletePrompt);

export default router;