"use client"
import { ChevronRight, ChevronDown, Ellipsis } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import './style.css';

// Sample file structure (you can dynamically generate this based on your data)
const files = [
    {
        name: 'next', type: 'folder', children: [
          { name: 'cache', type: 'folder', children: [
              { name: 'index.js', type: 'file' },
              { name: 'manifest.json', type: 'file' },
            ]
          },
          { name: 'server', type: 'folder', children: [
              { name: 'pages', type: 'folder', children: [
                  { name: 'app.tsx', type: 'file' },
                  { name: 'index.html', type: 'file' },
                ]
              },
              { name: 'middleware.js', type: 'file' },
            ]
          },
          { name: 'static', type: 'folder', children: [
              { name: 'js', type: 'folder', children: [
                  { name: 'bundle.js', type: 'file' },
                ]
              },
              { name: 'css', type: 'folder', children: [
                  { name: 'styles.css', type: 'file' },
                ]
              },
            ]
          },
          { name: 'types', type: 'folder', children: [
              { name: 'index.d.ts', type: 'file' },
            ]
          },
          { name: 'trace', type: 'folder', children: [
              { name: 'trace.json', type: 'file' },
            ]
          },
          { name: '_app.tsx', type: 'file' },
        ]
    },
    {
        name: 'src', type: 'folder', children: [
          {
            name: 'components', type: 'folder', children: [
              { name: 'Sidebar.tsx', type: 'file' },
              { name: 'Editor.tsx', type: 'file' },
            ]
          },
          {
            name: 'app', type: 'folder', children: [
                { name: 'global.css', type: 'file' },
                { name: 'favicon.ico', type: 'file' },
                { name: 'layout.tsx', type: 'file' },
              { name: 'page.tsx', type: 'file' },  // Active file
            ]
          },
        ]
    },
    {
        name: 'styles', type: 'folder', children: [
          { name: 'globals.css', type: 'file' },
        ]
    },
];

const FileExplorer: React.FC = () => {
    const [openFolders, setOpenFolders] = useState<string[]>(['src', 'app']);

  const [activeFile, setActiveFile] = useState<string>('page.tsx');

  const toggleFolder = (name: string) => {
    setOpenFolders(prev =>
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const renderFileTree = (items: any[], level: number = 0) => (
    <ul className={`pl-${level * 4}`}>
      {items.map((item, index) => (
        <li key={index}>
          {item.type === 'folder' ? (
            <>
              <div
                className='flex start items-center cursor-pointer'
                onClick={() => toggleFolder(item.name)}
              >
                {openFolders.includes(item.name) ? (
                  <ChevronDown size={10} />
                ) : (
                  <ChevronRight size={10} />
                )}
                <span className="text-sm hover:bg-vs-code-gray px-1 py-1 block">
                  {item.name}
                </span>
              </div>
              <div
                className={`file-tree ${openFolders.includes(item.name) ? 'open' : ''}`}
              >
                {renderFileTree(item.children, level + 1)}
              </div>
            </>
          ) : (
            <span
              className={`cursor-pointer text-sm hover:bg-vs-code-gray px-2 ms-4 py-1 block ${
                item.name === activeFile ? 'bg-vs-code-gray' : ''
              }`}
              onClick={() => setActiveFile(item.name)}
            >
              {item.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="bg-vs-code-dark text-white w-64 overflow-y-auto border-r border-[#2D2D2D]">
      <div className="p-3 border-b border-vs-code-gray flex justify-between items-center">
        <h2 className="text-md text-white">Explorer</h2>
        <Ellipsis />
      </div>
      <div className="p-4">
        {renderFileTree(files)}
      </div>
    </div>
  );
};

export default FileExplorer;
