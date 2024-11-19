import Editor from '@monaco-editor/react';
import React from 'react';

interface JsonEditorProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange, error }) => {
    const handleEditorChange = (value: string | undefined) => {
        onChange(value || '');
    };

    // Determine the theme based on the current mode
    const editorTheme = document.documentElement.classList.contains('dark') ? 'vs-dark' : 'vs';

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">JSON Schema Editor</h2>
            </div>

            <div className="flex-1 border rounded-md overflow-hidden shadow-lg">
                <Editor
                    height="100%"
                    language="json"
                    value={value}
                    onChange={handleEditorChange}
                    theme={editorTheme} // Set theme based on current mode
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: 'on',
                        scrollBeyondLastLine: false,
                        smoothScrolling: true,
                        cursorSmoothCaretAnimation: true,
                    }}
                />
            </div>

            {error && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                    {error}
                </div>
            )}
        </div>
    );
};