import 'dotenv/config';
import express, { Request, Response, RequestHandler } from 'express';
import cors from 'cors';
import { DiscountService } from './services/discountService';

import { PromotionDiscountPrompt } from './models/promotionDiscountPrompt';
import promotionDiscountPromptRoutes from './routes/promotionDiscountPromptRoutes';

const app = express();
app.use(cors());
app.use(express.json());



// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

const promptHandler: RequestHandler = async (req, res) => {
  try {
    const { cart } = req.body;
    
    if (!cart) {
      res.status(400).json({ error: 'Cart data is required' });
      return;
    }

    const promotionPrompt = await PromotionDiscountPrompt.findOne();

    if (!promotionPrompt) {
      res.status(404).json({ error: 'No discount prompt found' });
      return;
    }

    const discountRules = await DiscountService.getDiscountRecommendations(cart, promotionPrompt.prompt);
    res.json(discountRules);

  } catch (error) {
    console.error('Error processing prompt:', error);
    res.status(500).json({ error: 'Failed to process prompt' });
  }
};

app.post('/api/prompt', promptHandler);

app.use('/api/promotion-discount-prompts', promotionDiscountPromptRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});