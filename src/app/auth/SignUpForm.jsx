import React from "react";
import { SignUp } from "@clerk/clerk-react";
function SignUpForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <SignUp
          appearance={{
            elements: {
              card: "shadow-xl rounded-lg p-2",
              rootBox: "w-full flex justify-center",
            },
          }}
        />
      </div>
    </div>
  );
}

export default SignUpForm;
