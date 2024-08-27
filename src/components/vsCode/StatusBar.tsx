import { Bell, CircleX, GitBranch, RefreshCw, Smile, TriangleAlert } from 'lucide-react';
import React from 'react';

const StatusBar: React.FC = () => {
    return (
        <div className="text-white p-2 border-t border-vs-code-gray flex justify-between w-full bg-[#347FD0] h-6">
            <div className='flex justify-center items-center gap-x-6'>
                <div className='flex justify-center items-center gap-x-1 text-sm '>
                    <GitBranch size={16} />
                    <p>master</p>
                </div>
                <span>
                    <RefreshCw size={16} />
                </span>
                <div className='flex justify-center items-center gap-x-1'>
                    <div className='flex justify-center items-center gap-x-1'>
                        <CircleX size={16} />
                        0
                    </div>
                    <div className='flex justify-center items-center gap-x-1'>
                        <TriangleAlert size={16} />
                        0
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center gap-x-6 text-sm'>
                <div>
                    UTF-8
                </div>
                <div>
                    LF
                </div>
                <div>
                    HTML
                </div>
                <div>
                    Go Live
                </div>
                <div className='flex justify-center items-center gap-x-2'>
                    <Smile size={16}/>
                    <Bell size={16}/>
                </div>

            </div>
        </div>
    );
};

export default StatusBar;
