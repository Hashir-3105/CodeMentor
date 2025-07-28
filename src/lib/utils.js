import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const validations = (form) => {
  const newErrors = {};
  if (!form.fullName) newErrors.fullName = "Please enter your full name";
  if (!form.email) newErrors.email = "Please enter your email address";
  else if (!/\S+@\S+\.\S+/.test(form.email))
    newErrors.email = "Email format is invalid";
  if (!form.position)
    newErrors.position = "Please select the position you're applying for";
  return newErrors;
};

export const validationsAdmin = (form) => {
  const newErrors = {};
  if (!form.questionInput || form.questionInput.length === 0)
    newErrors.questionInput = "Please select at least one question.";
  if (!form.timeInput) newErrors.timeInput = "Please select a time.";
  // if (!form.interviewersInput)
  //   newErrors.interviewersInput = "Pick someone to lead the session";
  return newErrors;
};
export const validationsTestCatalog = (form) => {
  const newErrors = {};
  if (!form.intQ) newErrors.intQ = "Input field required";
  if (!form.intCategory) newErrors.intCategory = "Input field required";
  return newErrors;
};

export function createInputHandler(setForm, setErrors, errors) {
  return function handleInputChange(fieldName) {
    return function (e) {
      const { value } = e.target;
      setForm((prev) => ({ ...prev, [fieldName]: value }));

      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }
    };
  };
}
