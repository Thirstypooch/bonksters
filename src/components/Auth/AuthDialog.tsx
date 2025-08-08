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
import { useAuthDialogStore } from '@/lib/store/authDialog';

export default function AuthDialog() {
    const {isOpen, close} = useAuthDialogStore();
    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) close();
        }}>
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
                        <SignInForm onSuccess={close}/>
                    </TabsContent>
                    <TabsContent value="sign-up" className="mt-4">
                        <SignUpForm onSuccess={close}/>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}