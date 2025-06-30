
import React from 'react';
import { Bell, Lock, HelpCircle, LogOut } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Settings = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h2 className="font-display font-bold text-xl">Settings</h2>
      </div>
      
      <div className="p-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Bell className="h-5 w-5 text-gray-600" />
              Notifications
            </h3>
            <div className="space-y-3 ml-7">
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push notifications</Label>
                <Switch id="push-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email notifications</Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="order-updates">Order status updates</Label>
                <Switch id="order-updates" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="promo-emails">Promotional emails</Label>
                <Switch id="promo-emails" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Lock className="h-5 w-5 text-gray-600" />
              Security
            </h3>
            <div className="space-y-4 ml-7">
              <Button variant="outline" size="sm">Change Password</Button>
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor">Two-factor authentication</Label>
                <Switch id="two-factor" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-gray-600" />
              Help & Support
            </h3>
            <div className="space-y-2 ml-7">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Contact Support
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                FAQs
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Terms of Service
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Privacy Policy
              </Button>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <Button 
              variant="ghost" 
              className="text-red-500 hover:text-red-600 hover:bg-red-50 flex items-center gap-2"
              size="sm"
            >
              <LogOut size={16} />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
