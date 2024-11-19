import { AlertCircle } from 'lucide-react';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormField, FormValues } from '../types/form';

interface FormFieldProps {
    field: FormField;
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
}

export const FormFieldComponent: React.FC<FormFieldProps> = ({
    field,
    register,
    errors,
}) => {
    const inputClasses = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 bg-surface border-primary/10 dark:border-accent/20 transition-all duration-200 placeholder-primary/50 dark:bg-gray-800";

    return (
        <div className="space-y-2">
            <label
                htmlFor={field.id}
                className="block text-sm font-medium text-primary dark:text-accent"
            >
                {field.label}
                {field.required && <span className="text-rose ml-1">*</span>}
            </label>

            {field.type === 'textarea' ? (
                <textarea
                    id={field.id}
                    {...register(field.id, {
                        required: field.required,
                        pattern: field.validation
                            ? {
                                value: new RegExp(field.validation.pattern),
                                message: field.validation.message,
                            }
                            : undefined,
                    })}
                    placeholder={field.placeholder}
                    className={`${inputClasses} min-h-[100px] resize-y`}
                />
            ) : field.type === 'select' ? (
                <select
                    id={field.id}
                    {...register(field.id, { required: field.required })}
                    className={inputClasses}
                >
                    <option value="">Select an option</option>
                    {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : field.type === 'radio' ? (
                <div className="space-y-2">
                    {field.options?.map((option) => (
                        <label key={option.value} className="flex items-center space-x-2 cursor-pointer group">
                            <input
                                type="radio"
                                value={option.value}
                                {...register(field.id, { required: field.required })}
                                className="text-accent focus:ring-accent/50 border-primary/20 dark:border-accent/30"
                            />
                            <span className="text-sm text-primary/80 dark:text-accent/80 group-hover:text-primary dark:group-hover:text-accent transition-colors duration-200">
                                {option.label}
                            </span>
                        </label>
                    ))}
                </div>
            ) : (
                <input
                    id={field.id}
                    type={field.type}
                    {...register(field.id, {
                        required: field.required,
                        pattern: field.validation
                            ? {
                                value: new RegExp(field.validation.pattern),
                                message: field.validation.message,
                            }
                            : undefined,
                    })}
                    placeholder={field.placeholder}
                    className={inputClasses}
                />
            )}

            {errors[field.id] && (
                <div className="flex items-center space-x-1 text-rose text-sm animate-fadeIn">
                    <AlertCircle className="w-4 h-4" />
                    <span>
                        {errors[field.id]?.type === 'required'
                            ? 'This field is required'
                            : errors[field.id]?.message}
                    </span>
                </div>
            )}
        </div>
    );
};