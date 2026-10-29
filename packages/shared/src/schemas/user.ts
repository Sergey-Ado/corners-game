import z from 'zod';

export const LoginInputSchema = z.object({
  email: z.email('login.error.email'),
  password: z
    .string()
    .trim()
    .min(6, 'login.error.min')
    .regex(/^\S+$/, 'login.error.space'),
});
