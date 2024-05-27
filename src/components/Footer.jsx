import React from 'react';

const Footer = () => {
  const footerLinks = ["Privacy Policy", "Terms of Use", "Sales Policy", "Legal", "Site Map"];

  return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="screen-max-width">
        <div>
          <p className="font-semibold text-gray text-xs">
            More ways to shop: {' '}
            <span className="text-blue cursor-pointer hover:underline">
              Find an Apple Store {' '}
            </span>
            or {' '}
            <span className="text-blue cursor-pointer hover:underline">
              Other Retailer
            </span>{' '}
            near you.
          </p>

          <p className="font-semibold text-gray text-xs">
            Or Call 000800-040-1966
          </p>
        </div>

        <div className="bg-neutral-700 my-5 h-[1px] w-full" />

        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <p className="font-semibold text-gray text-xs text-center">Copright &copy; 2024 Apple Inc. All rights reserved.</p>
          <div className="hidden md:flex">
            {footerLinks.map((item, index) => (
              <p className="font-medium text-gray text-xs cursor-pointer transition-all hover:text-white" key={index}>
                {item}{' '}
                {index !== footerLinks.length - 1 && (
                  <span className="mx-2 text-gray"> | </span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;