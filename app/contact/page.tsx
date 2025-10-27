import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ContactForm } from '@/components/ContactForm'

export const metadata = {
  title: 'Contact • FlashNews',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <section className="bg-gradient-to-r from-sky-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container py-10">
          <h1 className="font-heading text-4xl">Get in touch</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl">
            Questions, feedback, or partnership ideas? Reach out—we read every
            message.
          </p>
        </div>
      </section>
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />
      <main className="container py-10 grid gap-10 lg:grid-cols-12">
        <section className="lg:col-span-8">
          <h1 className="font-heading text-3xl">Contact us</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            We'd love to hear from you—send us a message.
          </p>
          <div className="mt-6 max-w-xl">
            <ContactForm />
          </div>
          <div className="mt-10">
            <h2 className="font-heading text-2xl">Our location</h2>
            <div className="mt-3 overflow-hidden rounded-xl border bg-white/70 shadow-card dark:border-slate-700 dark:bg-slate-900/60">
              <iframe
                title="FlashNews HQ"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508399!2d144.95373631550425!3d-37.81627974201571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ5JzAwLjYiUyAxNDTCsDU3JzE5LjQiRQ!5e0!3m2!1sen!2sus!4v1614099000000!5m2!1sen!2sus"
                width="100%"
                height="380"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
        <aside className="lg:col-span-4">
          <div className="rounded-xl border bg-white/70 p-6 shadow-card backdrop-blur dark:border-slate-700 dark:bg-slate-900/60">
            <h2 className="font-semibold">Editorial</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              news@FlashNews.dev
            </p>
            <h2 className="mt-6 font-semibold">Partnerships</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              partners@FlashNews.dev
            </p>
            <h2 className="mt-6 font-semibold">Address</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              FlashNews Media, 123 Ocean Ave, Web City
            </p>
          </div>
        </aside>
      </main>
      <Footer />
    </>
  )
}
