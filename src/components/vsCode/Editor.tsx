import { Code, Play, Type, X } from 'lucide-react';
import React from 'react';

function LineNumber() {
    const lineNumbers = Array.from({ length: 28 }, (_, i) => i);
    return (
        <div className="text-xs text-gray-400 flex flex-col border-r border-[#2D2D2D] w-[6rem]">
        {lineNumbers.map((number) => (
          <div className='mb-1' key={number}>{number + 1}</div>
        ))}
      </div>
    );
  }


const Editor: React.FC = () => {
  return (
    <div className="flex-1 bg-[#181818] text-white">
      <div className=" flex justify-between text-sm items-center gap-x-4 bg-[#212121] border-b-[#2D2D2D]">
        <div className='flex p-3.5 justify-start items-center gap-x-2 bg-[#181818] border-t-blue-500'>
            <Type size={16}/>
        <h2 className="text-md text-white ">page.tsx</h2>
            <X size={16}/>
        </div>
        <div>
            <Play className='mx-4' size={16}/>
        </div>
        {/* <div className='flex p-3.5 justify-start items-center gap-x-2 bg-[#1E1E1E] border-t-blue-500'>
        <span>#</span>
        <h2 className="text-md text-white ">style.css</h2>
            <X size={20}/>
        </div> */}
      </div>
      <div className="bg-[#181818] text-white font-mono p-4 flex overflow-scroll h-[64vh]">
      <LineNumber />
      <div className="pl-4">
      <pre className="whitespace-pre-wrap text-sm">
        <code>
          {`import Editor from "@/components/vsCode/Editor";
import StatusBar from "@/components/vsCode/StatusBar";
import Sidebar from "@/components/vsCode/Sidebar";
import FileExplorer from "@/components/vsCode/FileExplorer";
import MacHeader from "@/components/vsCode/MacHeader";

export default function Home() {
  return (
    <div className="w-full h-screen container bg-card flex-col items-center justify-center">
     <div className="text-center my-6">
  <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Hello, I'm Aliyan</h1>
  <h2 className="text-xl font-semibold text-gray-600">I am a Web Developer</h2>
</div>

      <div className="flex flex-col h-[70vh] ">
      <MacHeader />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1">
          <FileExplorer />
          <Editor />
        </div>
      </div>
      <StatusBar />
    </div>
    </div>
  );
}

`}
        </code>
      </pre>
      </div>
    </div>
      </div>


  );
};

export default Editor;
