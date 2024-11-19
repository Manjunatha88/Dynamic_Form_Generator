import { Code2 } from 'lucide-react';
import React from 'react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
    darkMode: boolean;
    onThemeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, onThemeToggle }) => {
    return (
        <header className="border-b border-primary/10 dark:border-accent/10 bg-surface transition-colors duration-300">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Code2 className="w-6 h-6 text-primary dark:text-accent" />
                    <h1 className="text-xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
                        Dynamic Form Generator by Maddi Sai Manjunatha
                    </h1>
                </div>
                <ThemeToggle darkMode={darkMode} onToggle={onThemeToggle} />
            </div>
        </header>
    );
};