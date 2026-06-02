"use client";

import supabase from "@/services/supabase";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Auth() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const redirect = searchParams.get("redirect") || "/";

  const [isSignUp, setIsSignUp] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return; // prevent double submit
    setLoading(true);
    setError("");

    try {
      let result;

      if (isSignUp) {
        result = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullname,
            },
          },
        });
      } else {
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      const { error } = result;

      if (error) {
        setError(error.message);
        return;
      }

      // small delay helps Supabase cookie sync in some cases
      setTimeout(() => {
        router.push(redirect);
        router.refresh(); // important for SSR session sync
      }, 100);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl">
      <h1 className="text-2xl font-bold mb-2">
        {isSignUp ? "Create account" : "Welcome back"}
      </h1>

      <p
        className="text-sm text-blue-600 cursor-pointer mb-6"
        onClick={() => {
          setIsSignUp(!isSignUp);
          setError("");
        }}
      >
        {isSignUp ? "Already have an account? Sign in" : "No account? Sign up"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <input
            type="text"
            placeholder="Full name"
            className="w-full border p-2 rounded"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>
        )}

        <button
          disabled={loading}
          className={`w-full py-2 rounded text-white transition ${
            loading ? "bg-gray-500" : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? "Please wait..." : isSignUp ? "Sign up" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
