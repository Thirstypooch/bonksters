import { z } from 'zod';

export const SignUpSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
});
export type TSignUpSchema = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(1, { message: 'Password is required.' }), // Password can't be empty
});
export type TSignInSchema = z.infer<typeof SignInSchema>;