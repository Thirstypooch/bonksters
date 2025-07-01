'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

const ProfileSection = () => {
  // This would come from user context/state in a real app
  const [profile, setProfile] = React.useState<UserProfile>({
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+1 234 567 8901'
  });
  
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState<UserProfile>(profile);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated profile to a server
    setProfile(formData);
    setIsEditing(false);
  };
  
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
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button type="submit" className="bg-bonkster-blue hover:bg-bonkster-blue/90">Save Changes</Button>
              <Button type="button" variant="outline" onClick={() => {
                setIsEditing(false);
                setFormData(profile);
              }}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-500">Name:</div>
              <div className="font-medium">{profile.name}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-500">Email:</div>
              <div className="font-medium">{profile.email}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-500">Phone:</div>
              <div className="font-medium">{profile.phone}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
