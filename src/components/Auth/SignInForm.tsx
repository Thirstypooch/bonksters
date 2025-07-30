// Use react-hook-form for state management and Zod for validation, just as the shadcn/ui documentation recommends for its Form component.
//  import the client. In your form's onSubmit handler, call supabase.auth.signInWithPassword(...) or supabase.auth.signUp(...).
//
// Use the toast function from sonner to provide feedback to the user (e.g., "Check your email to verify your account" or "Invalid credentials").

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Github } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { TSignInSchema, SignInSchema } from '@/lib/validators/auth';

export default function SignInForm() {
    const router = useRouter();
    const form = useForm<TSignInSchema>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: TSignInSchema) => {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        if (error) {
            toast.error(error.message);
        } else {
            // A page refresh will automatically update the session and UI
            // due to the middleware. The dialog should also be closed here.
            router.refresh();
            toast.success('Signed in successfully!');
        }
    };

    const handleGitHubSignIn = async () => {
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
    };

    return (
        <Form {...form}>
            <div className="space-y-4">
                <Button variant="outline" className="w-full" onClick={handleGitHubSignIn}>
                    <Github className="mr-2 h-4 w-4" />
                    Sign in with GitHub
                </Button>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>
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
                        {form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>
            </div>
        </Form>
    );
}