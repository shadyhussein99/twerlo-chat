import { useForm } from "react-hook-form";
import type {
  UseFormReturn,
  SubmitHandler,
  DefaultValues,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type * as yup from "yup";

type FormConfig<T extends yup.AnyObjectSchema> = {
  validationSchema: T;
  defaultValues?: DefaultValues<yup.InferType<T>>;
  onSubmit: SubmitHandler<yup.InferType<T>>;
};

type FormHandler<T extends yup.AnyObjectSchema> = {
  form: UseFormReturn<yup.InferType<T>>;
  handleSubmit: () => void;
  resetForm: () => void;
  isSubmitting: boolean;
};

export const useAppForm = <T extends yup.AnyObjectSchema>({
  validationSchema,
  defaultValues,
  onSubmit,
}: FormConfig<T>): FormHandler<T> => {
  const form = useForm<yup.InferType<T>>({
    defaultValues,
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const handleFormSubmit = handleSubmit(onSubmit);

  const resetForm = () => {
    reset(defaultValues);
  };

  return {
    form,
    handleSubmit: handleFormSubmit,
    resetForm,
    isSubmitting,
  };
};
