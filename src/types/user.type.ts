import Joi from 'joi';
type User = {
  id?: string;
  email?: string;
  firstname: string;
  lastname: string;
  password: string;
};
const schema = Joi.object({
  email: Joi.string().email().min(7).max(20),
  firstname: Joi.string().min(3).max(15).required(),
  lastname: Joi.string().min(3).max(15).required(),
  password: Joi.string().min(4).max(25).required(),
});
export { User, schema as userSchema };
