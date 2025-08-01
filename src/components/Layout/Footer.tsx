
import React from 'react';
import Link from "next/link";
import Image from "next/image";


const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <div className="mr-2 relative">
                <div className="h-12 w-12 rounded-full flex items-center justify-center">
                  <Image
                      src="/logo.png"
                      alt="Bonkster's Logo"
                      width={40}
                      height={40}
                      className="rounded-full"
                  />
                </div>
              </div>
              <div className="font-display font-bold text-lg leading-none">
                <span className="text-bonkster-orange">Booster&#39;s</span>
                <br />
                <span className="text-bonkster-blue text-sm">Your Food Buddy</span>
              </div>
            </Link>
            <p className="text-gray-600 text-sm">
              Bonkster, your delivery buddy, brings your favorite foods right to your doorstep.
            </p>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-bonkster-orange">Home</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-bonkster-orange">Restaurants</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-bonkster-orange">Cuisines</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-bonkster-orange">Offers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Info</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-bonkster-orange">About Us</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-bonkster-orange">Contact</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-bonkster-orange">Help Center</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-bonkster-orange">Partner with us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-bonkster-orange">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-bonkster-orange">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-bonkster-orange">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Booster&#39;s Food Delivery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
