"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { User, Mail, Phone, ArrowLeft } from "lucide-react"

export function SignupForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Sign up functionality will be implemented with backend integration.")
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex flex-col items-center group">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-orange-500 rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-orange-200 transition-shadow">
            <span className="text-white font-bold text-2xl">DS</span>
          </div>
          <h1 className="text-2xl font-bold text-emerald-600">Docerad SkillHub</h1>
        </Link>
        <p className="text-gray-500 mt-2">Create your account and start learning</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-xl shadow-orange-100/50 p-6 sm:p-8 border border-orange-100/50">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Field */}
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="+234 800 000 0000"
              />
            </div>
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
              className="w-4 h-4 mt-0.5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <span className="ml-3 text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-emerald-600 hover:underline font-medium">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-emerald-600 hover:underline font-medium">
                Privacy Policy
              </a>
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-orange-500 text-white py-3.5 px-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-orange-600 transition-all shadow-lg shadow-orange-200 hover:shadow-orange-300"
          >
            Proceed to Payment
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-400">or</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
            Login
          </Link>
        </p>
      </div>

      {/* Back to Home */}
      <div className="text-center mt-6">
        <Link
          href="/"
          className="text-gray-500 hover:text-emerald-600 transition-colors inline-flex items-center text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
