import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/lib/supabaseClient";
import { validations } from "@/lib/utils";
import { useState } from "react";
export function useContactUsSubmission() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    position: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fullName, email, position, message } = form;
  const { user } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    const validateErrors = validations(form);
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }
    console.log("Form Submitting", form);
    setErrors({});
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .insert([
          {
            user_id: user.id,
            full_name: form.fullName,
            email: form.email,
            position: form.position,
            message: form.message,
          },
        ])
        .select();
      if (error) throw error;
      console.log("Saved to Supabase:", data);
      setForm({ fullName: "", email: "", position: "", message: "" });
    } catch (err) {
      console.error("Submission error:", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    handleSubmit,
    isSubmitting,
    errors,
    setErrors,
    fullName,
    email,
    position,
    message,
    form,
    setForm,
  };
}
