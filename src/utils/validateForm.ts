import { ZodType } from "zod";

const setError = (errors: Record<string, any>, path: string[], message: string) => {
  let current = errors;
  path.forEach((key, index) => {
    if (index === path.length - 1) {
      current[key] = message;
    } else {
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    }
  });
};
export const validateForm = <T>(schema: ZodType<T>, form: T, errors: Record<string, any>) => {
  const result = schema.safeParse(form);
  Object.keys(errors).forEach(key => delete errors[key]);
  
  if (!result.success) {
    result.error.issues.forEach(e => {
      if (e.path.length > 0) {
        setError(errors, e.path as string[], e.message);
      }
    });
    return false;
  }
  
  return true;
};
