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

    try {
      let response;

      if (isSignUp) {
        response = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullname,
            },
          },
        });
      } else {
        response = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      const { error } = response;

      if (error) throw error;

      router.push(redirect);
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  }
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl">
      <h1 className="text-2xl font-bold mb-2">
        {isSignUp ? "Create account" : "Welcome back"}
      </h1>

      <p
        className="text-sm text-blue-600 cursor-pointer mb-6"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? "Already have an account? Sign in" : "No account? Sign up"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp ? (
          <input
            type="text"
            placeholder="Fullname"
            className="w-full border p-2 rounded"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        ) : (
          ""
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

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Please wait..." : isSignUp ? "Sign up" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
