'use client';
import React from 'react';
import {Plus, Home, Briefcase, Trash, Star} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { trpc } from '@/lib/trpc/client';
import { Checkbox } from '@/components/ui/checkbox';

const addressSchema = z.object({
  label: z.string().optional(),
  fullAddress: z.string().min(10, { message: 'Enter a correct address.' }),
  isDefault: z.boolean().optional(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

const Addresses = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { data: addresses, isLoading, refetch } = trpc.address.getAddresses.useQuery();

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: '',
      fullAddress: '',
      isDefault: false,
    },
  });

  const addAddressMutation = trpc.address.addAddress.useMutation({
    onSuccess: () => {
      toast.success('Address added successfully!');
      refetch();
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error) => toast.error(`Failed to add address: ${error.message}`),
  });

  const deleteAddressMutation = trpc.address.deleteAddress.useMutation({
    onSuccess: () => {
      toast.success('Address removed.');
      refetch();
    },
    onError: (error) => toast.error(`Failed to remove address: ${error.message}`),
  });

  const setDefaultMutation = trpc.address.setDefaultAddress.useMutation({
    onSuccess: () => {
      toast.success('Default address updated.');
      refetch();
    },
    onError: (error) => toast.error(`Failed to update: ${error.message}`),
  });

  function onSubmit(data: AddressFormValues) {
    addAddressMutation.mutate(data);
  }

  if (isLoading) {
    return <Skeleton className="h-64 w-full" />;
  }
  return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-display font-bold text-xl">Saved Addresses</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus size={16} className="mr-2" />
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a New Address</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                      control={form.control}
                      name="fullAddress"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main Street, Anytown, USA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="label"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Label (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Home, Work, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="isDefault"
                      render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Set as default address</FormLabel>
                            </div>
                          </FormItem>
                      )}
                  />
                  <Button type="submit" disabled={addAddressMutation.isPending}>
                    {addAddressMutation.isPending ? 'Saving...' : 'Save Address'}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            {addresses && addresses.length > 0 ? (
                addresses.map((address) => (
                    <div
                        key={address.id}
                        className={`border rounded-md p-4 transition-colors ${
                            address.isDefault ? 'border-bonkster-orange/30 bg-orange-50' : 'border-gray-200'
                        }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {address.label?.toLowerCase() === 'home' ? (
                                <Home className="h-5 w-5 text-gray-600" />
                            ) : address.label?.toLowerCase() === 'work' ? (
                                <Briefcase className="h-5 w-5 text-gray-600" />
                            ) : (
                                <Briefcase className="h-5 w-5 text-gray-600" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{address.label || 'Address'}</h3>
                              {address.isDefault && (
                                  <span className="bg-bonkster-orange/10 text-bonkster-orange text-xs px-2 py-0.5 rounded">
                                                        Default
                                                    </span>
                              )}
                            </div>
                            <p className="text-gray-700 mt-1">{address.fullAddress}</p>
                          </div>
                        </div>

                        <div className="flex gap-1">
                          {!address.isDefault && (
                              <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setDefaultMutation.mutate({ id: address.id })}
                                  disabled={setDefaultMutation.isPending}
                              >
                                <Star size={18} className="text-gray-400 hover:text-yellow-500"/>
                              </Button>
                          )}
                          <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500"
                              onClick={() => deleteAddressMutation.mutate({ id: address.id })}
                              disabled={deleteAddressMutation.isPending}
                          >
                            <Trash size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500 py-8">You have no saved addresses.</div>
            )}
          </div>
        </div>
      </div>
  );
};

export default Addresses;
