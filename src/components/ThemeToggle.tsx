import { Moon, Sun } from 'lucide-react';
import React from 'react';

interface ThemeToggleProps {
   darkMode:boolean;
   onToggle():void;
}

export const ThemeToggle :React.FC<ThemeToggleProps> = ({darkMode,onToggle}) => {

   return (
       <button 
           onClick={onToggle} 
           className='p-[8px] rounded-full hover:bg-gray-[100] 
           dark:hover:bg-gray-[800] transition-all duration-[200ms] transform hover:[scale(1.05)]'
           aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
       >
           {darkMode ? (
               <Sun className='w-[20px] h-[20px] text-yellow-[400]' />
           ) : (
               <Moon className='w-[20px] h-[20px] text-blue-[600]' />
           )}
       </button>
   );
};