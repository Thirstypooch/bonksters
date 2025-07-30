//  This component will use the Dialog from shadcn/ui and contain Tabs for switching between "Sign In" and "Sign Up".
//  import the client. In your form's onSubmit handler, call supabase.auth.signInWithPassword(...) or supabase.auth.signUp(...).
//
// Use the toast function from sonner to provide feedback to the user (e.g., "Check your email to verify your account" or "Invalid credentials").

'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

interface AuthDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <Tabs defaultValue="sign-in" className="w-full">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-center">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                                <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                            </TabsList>
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <TabsContent value="sign-in">
                        <SignInForm />
                    </TabsContent>
                    <TabsContent value="sign-up">
                        <SignUpForm />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}