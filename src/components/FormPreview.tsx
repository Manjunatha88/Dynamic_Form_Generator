import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormSchema, FormValues } from '../types/form';
import { FormFieldComponent } from './FormField';

interface FormPreviewProps {
    schema: FormSchema;
    onSubmit: SubmitHandler<FormValues>;
}

export const FormPreview: React.FC<FormPreviewProps> = ({ schema, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {schema.formTitle}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">{schema.formDescription}</p>
            </div>

            <div className="space-y-4">
                {schema.fields.map((field) => (
                    <FormFieldComponent
                        key={field.id}
                        field={field}
                        register={register}
                        errors={errors}
                    />
                ))}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
};