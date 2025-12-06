import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <span className="text-white font-bold text-3xl">DS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-600">Docerad SkillHub</h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Empowering Nigerians with practical entrepreneurship skills for a brighter future
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
