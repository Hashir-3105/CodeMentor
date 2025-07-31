import { useState, useEffect } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function SignInForm() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const role = user?.publicMetadata?.role;

  useEffect(() => {
    if (isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    try {
      setLoading(true);
      const result = await signIn.create({
        identifier: email,
        password,
      });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");
      }
    } catch (err) {
      const message = err.errors?.[0]?.message || "Sign in failed";
      setError(message);
    } finally {
      setLoading(false);
    }
    console.log("Debugg Role", role, user);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#d0cece]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#757978] text-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Sign In to Code Mentor
        </h2>
        <div className="mb-4 text-center">
          <p className="font-semibold">Welcome back</p>
          <p className="text-[12px]">
            Don't have an account?{" "}
            <Link className="hover:underline" to={"/Sign-up"}>
              Sign up
            </Link>
          </p>
        </div>
        {error && (
          <div className="mb-4 text-[12px] text-center">
            <span className="text-base text-[#c23414]">Error</span> : {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className={`w-full px-4 py-2 border  ${
              error && email === "" ? "border-[#8b311a]" : "border-[#919595]"
            } rounded focus:outline-none`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className={`w-full px-4 py-2 border  ${
              error && password === "" ? "border-[#8b311a]" : "border-[#919595]"
            } rounded focus:outline-none`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* <div className="flex justify-end mt-2">
                        <Link to={'/reset-password'} className="cursor-pointer text-[12px] text-blue-600 hover:underline">
                            Forget Password?
                        </Link>
                    </div> */}
        </div>

        <button
          type="submit"
          className="w-full bg-[#111617] cursor-pointer flex justify-center items-center text-white py-2 rounded transition"
        >
          {loading ? (
            <div className="flex gap-2 justify-center items-center text-center">
              <Loader className="w-4 h-4 animate-spin text-center" />
              <span>Logging In</span>
            </div>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </div>
  );
}
