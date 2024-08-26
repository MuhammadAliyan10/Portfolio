import { Blocks, Copy, GitBranch, PlayIcon, Search } from 'lucide-react';
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-[#181818] border-[#2D2D2D] border-r text-white w-15 h-screen flex flex-col">
      <nav className="flex flex-col mt-4">
        <a href="#" className="p-4 hover:bg-vs-code-gray"><Copy/></a>
        <a href="#" className="p-4 hover:bg-vs-code-gray"><Search/></a>
        <a href="#" className="p-4 hover:bg-vs-code-gray"><PlayIcon/></a>
        <a href="#" className="p-4 hover:bg-vs-code-gray"><GitBranch/></a>
        <a href="#" className="p-4 hover:bg-vs-code-gray"><Blocks/></a>
      </nav>
    </div>
  );
};

export default Sidebar;
