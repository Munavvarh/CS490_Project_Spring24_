import { Metadata } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'

import ContactForm from 'src/components/ContactForm/'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const ContactUsPage = () => {
  return (
    <>
      <Metadata title="Contact Us" description="Contact Us page" />

      <Toaster />
      <MainLayout>
        <div className="max-w-7xl container mx-auto px-4">
          <h2 className="home-section-title mt-4">Contact Us</h2>
          <p className="home-section-text">
            Use this form to contact us with your thoughts about SyntaxSwitch,
            any issues you want addressed, or anything on your mind at all.
            Spill all below! :)
          </p>
          <div className="mb-8">
            <ContactForm />
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default ContactUsPage
