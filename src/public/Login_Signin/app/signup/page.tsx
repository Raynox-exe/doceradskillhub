import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Background Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/nigerian-skills-signup.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/80 via-emerald-800/70 to-emerald-900/60" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Start Your
            <br />
            Entrepreneurship Journey
          </h2>
          <p className="text-lg text-orange-100 mb-8 max-w-md">
            Gain practical skills that transform lives. Learn from industry experts and become a skilled professional.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>Expert-led training programs</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>Hands-on practical experience</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>Certificate upon completion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header Image */}
      <div className="lg:hidden relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/nigerian-skills-signup.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/70 to-emerald-800/80" />
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center p-4">
          <h2 className="text-2xl font-bold">Docerad SkillHub</h2>
          <p className="text-orange-100 text-sm mt-1">Start Your Journey Today</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-gradient-to-br from-slate-50 to-orange-50/30">
        <SignupForm />
      </div>
    </div>
  )
}
