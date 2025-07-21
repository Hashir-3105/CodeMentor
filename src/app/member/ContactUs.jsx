import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/common/Input";
import { validations } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";
import { createInputHandler } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
function ContactUs() {
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
  const handleInputChange = createInputHandler(setForm, setErrors, errors);
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-white px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-200 p-10 transition-all duration-300">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-4">
          <span className="text-blue-600">Apply</span> for a Test
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              title={"Full Name"}
              value={fullName}
              placeholder={"Enter your full name"}
              onChange={handleInputChange("fullName")}
              className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <Input
              title={"Email"}
              value={email}
              placeholder={"Enter your email"}
              onChange={handleInputChange("email")}
              className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Input
              title={"Position / Test Applying For"}
              value={position}
              placeholder={"e.g. React Developer"}
              onChange={handleInputChange("position")}
              className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            {errors.position && (
              <p className="text-red-500 text-sm mt-1">{errors.position}</p>
            )}
          </div>

          <div>
            <Input
              inputType={"textarea"}
              title={"Message (Optional)"}
              name={"message"}
              value={message}
              placeholder={"Write a short message..."}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, message: e.target.value }))
              }
              className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 min-h-[120px]"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-4 py-3 text-lg font-semibold rounded-xl transition-all duration-300 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ContactUs;
