import React from "react";
import { Button } from "@/components/ui/button";
import Input from "../Input";

function ContactUs() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Apply for a Test
        </h2>
        <form className="space-y-5">
          <Input title={"Full Name"} placeholder={"Enter your name"} />
          <Input title={"Email"} placeholder={"Enter your email address"} />
          <Input
            title={"Position / Test Applying For"}
            placeholder={"React Developer, JS Fundamentals, etc."}
          />
          <Input
            inputType={"textarea"}
            title={"Message (Optional)"}
            name={"message"}
            placeholder={"Write a short note..."}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Submit Application
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ContactUs;
