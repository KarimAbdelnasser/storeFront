import Joi from 'joi';
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  user_id?: string;
};
const schema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  description: Joi.string(),
  price: Joi.number().min(1).required(),
});
export { Product, schema as productSchema };
