import { ArrowLeft, ArrowRight, Columns2, Grid2X2, LayoutPanelLeft, LayoutPanelTop, Search, Table2 } from 'lucide-react';
import React from 'react';

const MacHeader: React.FC = () => {


  return (
    <div className="flex items-center bg-[#181818] h-12 border-b border-[#2D2D2D] rounded-tr-md rounded-tl-md">
      <div className="flex items-center justify-between h-full w-[18.5rem] mx-2">
        <div>
        <button
          className="w-3 h-3 rounded-full bg-red-500 m-1 hover:bg-red-600"
          aria-label="Close"
        />
        <button
          className="w-3 h-3 rounded-full bg-yellow-500 m-1 hover:bg-yellow-600"
          aria-label="Minimize"
        />
        <button
          className="w-3 h-3 rounded-full bg-green-500 m-1 hover:bg-green-600"
          aria-label="Maximize"
        />
      </div>
      <div className='flex justify-center items-center text-[#fff] gap-x-4'>
        <ArrowLeft  className='font-200' size={20} />
        <ArrowRight  size={20} />
      </div>
      </div>

      <div>

      </div>
      <div className="flex-1 text-center text-gray-700 mx-2">
         <div className='w-[35rem] rounded-sm p-1 border-[1px] border-[#323232] bg-[#212121] flex items-center  text-white justify-center gap-x-2'>
        <Search size={18}/>
         <p className='text-[14px] font-400'>
         Search here
        </p>
        </div>
      </div>
      <div className='flex justify-between items-center text-white gap-3 mx-4'>
        <Columns2/>
        <Table2/>
        <Grid2X2/>
        <LayoutPanelLeft/>
      </div>
    </div>
  );
};

export default MacHeader;
