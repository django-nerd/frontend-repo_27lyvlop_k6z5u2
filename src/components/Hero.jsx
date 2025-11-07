import Spline from '@splinetool/react-spline';
import { User } from 'lucide-react';

export default function Hero({ onFakeAuth }) {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden rounded-2xl bg-white/50">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:px-10 md:py-24">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-blue-200">
          <User className="h-4 w-4" />
          Smart Money, Personalized
        </div>
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
          Understand your personal inflation and make smarter money moves
        </h1>
        <p className="max-w-2xl text-lg text-gray-600 md:text-xl">
          Measure how prices affect your lifestyle, analyze investments against that, and get clear guidance to maintain or upgrade your standard of living.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={onFakeAuth}
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2.5 text-white shadow hover:bg-gray-800"
          >
            Continue with Email
          </button>
          <button
            onClick={onFakeAuth}
            className="inline-flex items-center justify-center rounded-lg bg-white/90 px-4 py-2.5 text-gray-900 ring-1 ring-gray-200 backdrop-blur hover:bg-white"
          >
            Sign in with Google
          </button>
          <button
            onClick={onFakeAuth}
            className="inline-flex items-center justify-center rounded-lg bg-white/90 px-4 py-2.5 text-gray-900 ring-1 ring-gray-200 backdrop-blur hover:bg-white"
          >
            Sign in with Apple
          </button>
        </div>
      </div>
    </section>
  );
}
