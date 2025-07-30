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
                <DialogHeader>
                    <DialogTitle>Authentication</DialogTitle>
                    <DialogDescription>
                        Sign in to your account or create a new one to continue.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="sign-in" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="sign-in" className="mt-4">
                        <SignInForm />
                    </TabsContent>
                    <TabsContent value="sign-up" className="mt-4">
                        <SignUpForm />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}