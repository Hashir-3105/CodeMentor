import React from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/common/Input";
import { useContactUsSubmission } from "@/hooks/useContactUsSubmission";
import Toaster from "@/components/common/Toaster";

function ContactUs() {
  const {
    handleSubmit,
    isSubmitting,
    errors,
    fullName,
    email,
    position,
    message,
    setForm,
    handleInputChange,
  } = useContactUsSubmission();

  return (
    <section className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-12">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        <div className="relative hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-bold">Let’s Get You Started</h2>
            <p className="text-sm text-gray-200 max-w-xs">
              Fill out the form to apply for a test. We’ll get back to you
              shortly.
            </p>
          </div>
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Apply for a <span className="text-blue-600">Test</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                title={"Full Name"}
                value={fullName}
                placeholder={"Enter your full name"}
                onChange={handleInputChange("fullName")}
                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 min-h-[120px]"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-4 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>

          <Toaster />
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
