export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t bg-gradient-to-b from-brand-lightBlue/10 to-orange-50 dark:from-slate-900 dark:to-slate-900/90">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-heading text-xl">SahilNews</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              A modern news experience—fast, clear, and elegant.
            </p>
            <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              <a href="/about" className="hover:text-base-accent">
                About
              </a>
            </div>
          </div>
          <div>
            <div className="font-semibold">Sections</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>
                <a href="/category/national" className="hover:text-base-accent">
                  National
                </a>
              </li>
              <li>
                <a
                  href="/category/international"
                  className="hover:text-base-accent"
                >
                  International
                </a>
              </li>
              <li>
                <a
                  href="/category/state-news"
                  className="hover:text-base-accent"
                >
                  State News
                </a>
              </li>
              <li>
                <a href="/category/sports" className="hover:text-base-accent">
                  Sports
                </a>
              </li>
              <li>
                <a
                  href="/category/technology"
                  className="hover:text-base-accent"
                >
                  Technology
                </a>
              </li>
              <li>
                <a
                  href="/category/lifestyle"
                  className="hover:text-base-accent"
                >
                  Lifestyle
                </a>
              </li>
              <li>
                <a
                  href="/category/entertainment"
                  className="hover:text-base-accent"
                >
                  Entertainment
                </a>
              </li>
              <li>
                <a href="/category/videos" className="hover:text-base-accent">
                  Videos
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>
                <a href="/contact" className="hover:text-base-accent">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-base-accent">
                  Advertise
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-base-accent">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-base-accent">
                  Terms
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Subscribe</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Monthly digest of our best stories.
            </p>
            <form className="mt-3 flex flex-col sm:flex-row gap-2">
              <input
                aria-label="Email"
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-md border px-3 py-2"
              />
              <button className="w-full sm:w-auto rounded-md bg-base-accent px-4 py-2 text-white hover:opacity-90">
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-sm text-slate-600 dark:text-slate-300 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {year} SahilNews. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-base-accent">
              Privacy
            </a>
            <a href="#" className="hover:text-base-accent">
              Terms
            </a>
            <a href="/contact" className="hover:text-base-accent">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
