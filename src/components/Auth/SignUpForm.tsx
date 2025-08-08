// Use react-hook-form for state management and Zod for validation, just as the shadcn/ui documentation recommends for its Form component.

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { TSignUpSchema, SignUpSchema } from '@/lib/validators/auth';

interface SignUpFormProps {
    onSuccess?: () => void;
}

export default function SignUpForm({ onSuccess }: SignUpFormProps) {
    const form = useForm<TSignUpSchema>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: TSignUpSchema) => {
        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
        });

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Check your email!', {
                description: 'We sent you a verification link. Please confirm your email to sign in.',
            });
            form.reset();
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </Button>
            </form>
        </Form>
    );
}