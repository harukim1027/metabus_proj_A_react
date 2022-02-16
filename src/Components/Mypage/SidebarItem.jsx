import React from 'react';
// import style from './style.jsx';

function SidebarItem({ menu }) {
  return (
    <ul className="text-black">
      <li className="block cursor-pointer p-2 hover:bg-blue-300 hover:text-pink-700">
        <i className="w-8 fas fa-search p-2 bg-orange-300 rounded-full mx-2">
          {menu.name}
        </i>
      </li>
    </ul>
  );
}

export default SidebarItem;
