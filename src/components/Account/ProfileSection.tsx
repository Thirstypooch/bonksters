'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trpc } from '@/lib/trpc/client';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: profile, isLoading, refetch } = trpc.user.getUserProfile.useQuery(
      undefined,
      {
        // Prevent fetching when not logged in, which could cause an error toast
        enabled: true,
      }
  );

  const updateUserMutation = trpc.user.updateUserProfile.useMutation({
    onSuccess: () => {
      toast.success('Profile updated successfully!');
      refetch();
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(`Failed to update profile: ${error.message}`);
    }
  });

  // This state now correctly matches the form fields
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || '',
        phoneNumber: profile.phoneNumber || '',
      });
    }
  }, [profile]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate({
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data from the original profile state
    if (profile) {
      setFormData({
        fullName: profile.fullName || '',
        phoneNumber: profile.phoneNumber || '',
      });
    }
  };

  if (isLoading) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <Skeleton className="h-7 w-48" />
          </div>
          <div className="space-y-6 p-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
    )
  }

  return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-display font-bold text-xl">Personal Details</h2>
          {!isEditing && (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
          )}
        </div>

        <div className="p-6">
          {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Corrected: Input name is 'fullName' */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Name</Label>
                  <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                  />
                </div>

                {/* Email is read-only */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile?.email || ''}
                      disabled
                  />
                </div>

                {/* Corrected: Input name is 'phoneNumber' */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone</Label>
                  <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button type="submit" disabled={updateUserMutation.isPending}>
                    {updateUserMutation.isPending ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </form>
          ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 items-center">
                  <div className="text-gray-500">Name:</div>
                  <div className="font-medium col-span-2">{profile?.fullName || 'Not set'}</div>
                </div>

                <div className="grid grid-cols-3 gap-2 items-center">
                  <div className="text-gray-500">Email:</div>
                  <div className="font-medium col-span-2">{profile?.email}</div>
                </div>

                <div className="grid grid-cols-3 gap-2 items-center">
                  <div className="text-gray-500">Phone:</div>
                  <div className="font-medium col-span-2">{profile?.phoneNumber || 'Not set'}</div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default ProfileSection;