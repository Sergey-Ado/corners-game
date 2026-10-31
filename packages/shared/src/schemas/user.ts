import z from 'zod';

export const LoginInputSchema = z.object({
  email: z.email('login.error.email'),
  password: z
    .string()
    .trim()
    .min(6, 'login.error.min')
    .regex(/^\S+$/, 'login.error.space'),
});

export const RegisterInputSchema = z.object({
  email: z.email('login.error.email'),
  username: z.string().trim().min(5, 'register.error.min'),
  password: z
    .string()
    .trim()
    .min(6, 'login.error.min')
    .regex(/^\S+$/, 'login.error.space'),
});

export const UserOutputSchema = z.object({
  id: z.string(),
  username: z.string(),
});
