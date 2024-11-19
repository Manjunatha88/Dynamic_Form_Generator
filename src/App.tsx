import { useCallback, useEffect, useState } from 'react';
import { FormPreview } from './components/FormPreview';
import { Header } from './components/Header';
import { JsonEditor } from './components/JsonEditor';
import { FormSchema, FormValues } from './types/form';

const defaultSchema: FormSchema = {
  formTitle: "Project Requirements Survey",
  formDescription: "Please fill out this survey about your project needs",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Enter your full name"
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "you@example.com",
      validation: {
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        message: "Please enter a valid email address"
      }
    },
    {
      id: "companySize",
      type: "select",
      label: "Company Size",
      required: true,
      options: [
        { value: "1-50", label: "1-50 employees" },
        { value: "51-200", label: "51-200 employees" },
        { value: "201-1000", label: "201-1000 employees" },
        { value: "1000+", label: "1000+ employees" }
      ]
    },
    {
      id: "industry",
      type: "radio",
      label: "Industry",
      required: true,
      options: [
        { value: "tech", label: "Technology" },
        { value: "healthcare", label: "Healthcare" },
        { value: "finance", label: "Finance" },
        { value: "retail", label: "Retail" },
        { value: "other", label: "Other" }
      ]
    },
    {
      id: "timeline",
      type: "select",
      label: "Project Timeline",
      required: true,
      options: [
        { value: "immediate", label: "Immediate (within 1 month)" },
        { value: "short", label: "Short-term (1-3 months)" },
        { value: "medium", label: "Medium-term (3-6 months)" },
        { value: "long", label: "Long-term (6+ months)" }
      ]
    },
    {
      id: "comments",
      type: "textarea",
      label: "Additional Comments",
      required: false,
      placeholder: "Any other details you'd like to share..."
    }
  ]
};

const App = () => {
  const [darkMode, setDarkMode] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches || localStorage.getItem('theme') === 'dark'
  );

  const [jsonValue, setJsonValue] = useState(JSON.stringify(defaultSchema, null, 2));
  const [schema, setSchema] = useState<FormSchema>(defaultSchema);
  const [error, setError] = useState<string | undefined>();

  // Handle JSON change and parsing
  const handleJsonChange = useCallback((value:string) => {
    setJsonValue(value);
    try {
      const parsed = JSON.parse(value);
      setSchema(parsed);
      setError(undefined);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  // Handle form submission
  const handleSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
    alert('Form submitted successfully! Check console for details.');
  };

  // Toggle dark mode and persist in local storage
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Update class on documentElement
    document.documentElement.classList.toggle('dark', newDarkMode);

    // Save preference to local storage
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  // Effect to apply initial theme based on user preference
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-background text-text transition-colors duration-300">
        <Header darkMode={darkMode} onThemeToggle={toggleDarkMode} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-[800px]">
              <JsonEditor
                value={jsonValue}
                onChange={handleJsonChange}
                error={error}
              />
            </div>
            <div className="bg-surface p-8 rounded-lg shadow-luxury transition-all duration-300">
              {!error && <FormPreview schema={schema} onSubmit={handleSubmit} />}
              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-400 text-sm">
                  Error parsing JSON schema:
                  <span className="font-semibold">{error}</span>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;