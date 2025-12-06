import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Background Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/nigerian-skills-login.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-emerald-800/70 to-orange-900/60" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Master Skills.
            <br />
            Build Your Future.
          </h2>
          <p className="text-lg text-emerald-100 mb-8 max-w-md">
            Join thousands of Nigerians acquiring practical skills in barbing, baking, fashion design, welding, cooking
            and more.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-sm">
            {["Barbing", "Baking", "Fashion", "Welding", "Cooking", "Tailoring"].map((skill) => (
              <div
                key={skill}
                className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center text-sm font-medium"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Header Image */}
      <div className="lg:hidden relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/nigerian-skills-login.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/70 to-emerald-800/80" />
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center p-4">
          <h2 className="text-2xl font-bold">Docerad SkillHub</h2>
          <p className="text-emerald-100 text-sm mt-1">Empowering Nigerian Entrepreneurs</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-gradient-to-br from-slate-50 to-emerald-50/30">
        <LoginForm />
      </div>
    </div>
  )
}
