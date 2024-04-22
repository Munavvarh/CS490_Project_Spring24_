import { MetaTags } from '@redwoodjs/web'
import { Metadata } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'

import TranslationHistoriesCell from 'src/components/TranslationHistoriesCell'

const TranslationHistoryPage = () => {
  return (
    <>
      <Metadata
        title="Translation History"
        description="Translation History Page"
      />
      <Toaster />
      <div className="rw-scaffold">
        <MetaTags
          title="Translation History"
          description="Translation History page"
        />

        <main className="rw-main">
          <TranslationHistoriesCell />
          {/* The cell component handles fetching and displaying the translation history records.
            It's configured to work with your schema and will render the data accordingly. */}
        </main>
      </div>
    </>
  )
}

export default TranslationHistoryPage
