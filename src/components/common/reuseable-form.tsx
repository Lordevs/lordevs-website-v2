import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { type FieldValues, type Resolver, useForm } from "react-hook-form";
import { z, ZodType } from "zod";

// ShadCN form components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Field configuration interface
export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "radio" | "tel" | "select" | "file";
  placeholder?: string;
  options?: FieldOption[];
  accept?: string;
}

// Props for the reusable form
interface ReusableFormProps<T extends ZodType<any, any, any>> {
  schema: T;
  fields: FieldConfig[];
  onSubmit: (values: z.infer<T>) => void | Promise<void>;
  submitLabel?: string;
  disabled?: boolean;
  resetOnSuccess?: boolean;
  defaultValues?: Partial<z.infer<T>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ReusableForm<T extends ZodType<any, any, any>>({
  schema,
  fields,
  onSubmit,
  submitLabel = "Submit",
  disabled = false,
  resetOnSuccess = false,
  defaultValues,
}: ReusableFormProps<T>) {
  // Create default values for all fields to prevent controlled/uncontrolled issues
  const getDefaultValues = (): Partial<z.infer<T>> => {
    const defaults: Record<string, string> = {};
    fields.forEach((field) => {
      if (field.type === "radio" && field.options) {
        defaults[field.name] = "";
      } else if (field.type === "select" && field.options) {
        defaults[field.name] = "";
      } else {
        defaults[field.name] = "";
      }
    });
    return { ...defaults, ...defaultValues } as Partial<z.infer<T>>;
  };

  const form = useForm<z.infer<T> & FieldValues>({
    resolver: zodResolver(schema) as unknown as Resolver<
      z.infer<T> & FieldValues
    >,
    mode: "onBlur",
    defaultValues: getDefaultValues() as z.infer<T> & FieldValues,
  });

  const handleSubmit = async (values: z.infer<T>) => {
    try {
      await onSubmit(values);
      if (resetOnSuccess) {
        form.reset(getDefaultValues() as z.infer<T> & FieldValues);
      }
    } catch (error) {
      // Let the parent component handle the error
      throw error;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            name={field.name as any}
            render={({ field: controller }) => (
              <FormItem>
                <FormLabel className="mb-2 text-gray-200">
                  {field.label}
                </FormLabel>
                <FormControl>
                  {field.type === "textarea" ? (
                    <Textarea
                      placeholder={field.placeholder}
                      {...controller}
                      className="w-full resize-none rounded-lg border border-gray-700 bg-[#FFFFFF0F] px-4 py-3 text-white placeholder-gray-500"
                    />
                  ) : field.type === "radio" && field.options ? (
                    <RadioGroup
                      onValueChange={controller.onChange}
                      value={controller.value}
                      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {field.options.map((opt) => (
                        <FormItem
                          key={opt.value}
                          className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={opt.value}
                            id={opt.value}
                            className="text-[#00b2ff]"
                          />
                          <FormLabel
                            htmlFor={opt.value}
                            className="text-[#D3D3D3]">
                            {opt.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  ) : field.type === "select" && field.options ? (
                    <Select
                      onValueChange={controller.onChange}
                      value={controller.value}>
                      <SelectTrigger className="w-full rounded-lg border border-gray-700 bg-[#FFFFFF0F] px-4 py-3 text-white placeholder-gray-500">
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent className="bg-black text-white">
                        {field.options.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === "file" ? (
                    <div className="relative">
                      <label
                        htmlFor={field.name}
                        className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-700 bg-[#FFFFFF0F] px-4 py-8 transition hover:border-blue-500 hover:bg-[#FFFFFF1A]">
                        {controller.value ? (
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-sm font-medium text-white break-all">
                              {controller.value.name}
                            </span>
                            <span className="text-xs text-green-400">
                              (File selected)
                            </span>
                          </div>
                        ) : (
                          <>
                            <span className="text-sm font-light text-[#FFFFFFB2]">
                              Upload Resume
                            </span>
                            <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-xl border border-[#949191] bg-[#FFFFFF0F]">
                              <Upload className="h-5 w-5 text-[#949191]" />
                            </div>
                          </>
                        )}
                      </label>
                      <input
                        id={field.name}
                        type="file"
                        accept={field.accept}
                        onChange={(e) =>
                          controller.onChange(e.target.files?.[0])
                        }
                        className="absolute inset-0 h-full w-full cursor-pointer rounded-lg opacity-0"
                      />
                    </div>
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      {...controller}
                      className="w-full rounded-lg border border-gray-700 bg-[#FFFFFF0F] px-4 py-3 text-white placeholder-gray-500"
                    />
                  )}
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        ))}
        <Button
          type="submit"
          variant="gradient"
          className="mt-4 w-full py-4 text-base font-medium md:py-6 md:text-xl"
          disabled={disabled}>
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
}
