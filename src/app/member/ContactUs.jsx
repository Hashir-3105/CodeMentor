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
  const { fullName, email, position, message } = form;
  const { user } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validations(form);
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }
    console.log("Form Submitting", form);

    setErrors({});
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
    }
  };
  const handleInputChange = createInputHandler(setForm, setErrors, errors);
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-100 px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 border-b pb-4 border-gray-200">
          <span className="text-blue-600">Apply</span> for a Test
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-0.5">
            <Input
              title={"Full Name"}
              value={fullName}
              placeholder={"Enter your name"}
              onChange={handleInputChange("fullName")}
              className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm ml-1">{errors.fullName}</p>
            )}
          </div>

          <div className="flex flex-col gap-0.5">
            <Input
              title={"Email"}
              value={email}
              placeholder={"Enter your email address"}
              onChange={handleInputChange("email")}
              className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm ml-1">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <Input
              title={"Position / Test Applying For"}
              value={position}
              placeholder={"React Developer, JS Fundamentals, etc."}
              onChange={handleInputChange("position")}
              className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.position && (
              <p className="text-red-500 text-sm ml-1">{errors.position}</p>
            )}
          </div>
          <Input
            inputType={"textarea"}
            title={"Message (Optional)"}
            name={"message"}
            value={message}
            placeholder={"Write a short note..."}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, message: e.target.value }))
            }
            className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
          />
          <Button
            type="submit"
            onSubmit={(e) => e.preventDefault()}
            className="w-full cursor-pointer mt-4 py-3 text-lg font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Submit Application
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ContactUs;
