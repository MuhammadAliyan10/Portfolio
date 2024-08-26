import { ChevronRight, Ellipsis } from 'lucide-react';
import React from 'react';

// Sample file structure (you can dynamically generate this based on your data)
const files = [
  { name: 'src', type: 'folder', children: [
    { name: 'components', type: 'folder', children: [
      { name: 'Sidebar.tsx', type: 'file' },
      { name: 'Editor.tsx', type: 'file' },
    ]},
    { name: 'pages', type: 'folder', children: [
      { name: 'index.tsx', type: 'file' },
      { name: '_app.tsx', type: 'file' },
    ]},
  ]},
  { name: 'styles', type: 'folder', children: [
    { name: 'globals.css', type: 'file' },
  ]},
];

const FileExplorer: React.FC = () => {
  const renderFileTree = (items: any[], level: number = 0) => (
    <ul className={`pl-${level * 4}`}>
      {items.map((item, index) => (
        <li key={index} className={` ${item.type === 'folder' ? '' : ''}`}>
          {item.type === 'folder' ? (
            <>
            <div className='flex start items-center'>
              <ChevronRight size={10}/>
              <span className="text-sm cursor-pointer hover:bg-vs-code-gray px-1 py-1 block">{item.name}</span>
            </div>
              {renderFileTree(item.children, level + 1)}
            </>
          ) : (
            <span className="cursor-pointer text-sm hover:bg-vs-code-gray px-2 ms-4 py-1 block">{item.name}</span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="bg-vs-code-dark text-white w-64 overflow-y-auto border-r border-[#2D2D2D]">
      <div className="p-3  border-b border-vs-code-gray flex justify-between items-center">
        <h2 className="text-md text-white">Explorer</h2>
        <Ellipsis/>
      </div>
      <div className="p-4">
        {renderFileTree(files)}
      </div>
    </div>
  );
};

export default FileExplorer;
