import { X } from 'lucide-react';
import React from 'react';

const Editor: React.FC = () => {
  return (
    <div className="flex-1 bg-vs-code-dark text-white">
      <div className="p-3 border-b flex justify-start items-center gap-x-4">
        <div className='flex justify-start items-center gap-x-2 bg-[#181818] border-t-blue-500 border-r-[#2D2D2D]'>
        <h2 className="text-md text-white ">index.html</h2>
            <X size={20}/>
        </div>
        <div className='flex justify-start items-center gap-x-2 bg-[#1E1E1E] border-t-blue-500'>
        <h2 className="text-md text-white ">style.css</h2>
            <X size={20}/>
        </div>
      </div>
      <div className='bg-[#181818]'>
      <p>Here is where the code editor will go.</p>
      </div>
      {/* You can add more content or a code editor component here */}
    </div>
  );
};

export default Editor;
