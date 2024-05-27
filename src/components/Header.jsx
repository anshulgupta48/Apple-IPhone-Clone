import React from 'react';
import { AppleLogo, SearchIcon, BagIcon } from '../assets/export';

const Header = () => {
  const navLinks = ["Store", "Mac", "iPhone", "Support"];

  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <img src={AppleLogo} alt="Apple-Logo" width={14} height={18} className="cursor-pointer" />

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLinks.map((item, index) => (
            <div className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all" key={index}>
              {item}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img src={SearchIcon} alt="Search-Icon" width={18} height={18} className="cursor-pointer hover:brightness-90" />
          <img src={BagIcon} alt="Bag-Icon" width={18} height={18} className="cursor-pointer hover:brightness-90" />
        </div>
      </nav>
    </header>
  )
}

export default Header;