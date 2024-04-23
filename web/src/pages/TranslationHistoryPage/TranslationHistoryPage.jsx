import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Metadata } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'

import TranslationHistoriesCell from 'src/components/TranslationHistoriesCell'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const TranslationHistoryPage = () => {
  return (
    <>
      <Metadata
        title="Translation History"
        description="Translation History Page"
      />
      <Toaster />
      <MainLayout>
        <Link
          to={routes.translationOutput()}
          className="rounded transition ease-in-out; px-4 py-2 text-lg font-bold text-indigo-600 duration-300 hover:text-indigo-900"
        >
          Back to translator tool
        </Link>
        <main className="home-main">
          <div className="home-section-title">Translation History</div>
          <div className="home-section-text">
            Below are your past translations. You can reload them into the
            translator by hitting 'Change', you can copy any code by hitting the
            green clipboard in the code's respective cell, and you can delete a
            single or all of the translations with respective delete buttons.{' '}
          </div>
        </main>
        <div className="rw-scaffold">
          <MetaTags
            title="Translation History"
            description="Translation History page"
          />

          <main className="rw-main mb-4">
            <TranslationHistoriesCell />
            {/* The cell component handles fetching and displaying the translation history records.
            It's configured to work with your schema and will render the data accordingly. */}
          </main>
        </div>
      </MainLayout>
    </>
  )
}

export default TranslationHistoryPage
