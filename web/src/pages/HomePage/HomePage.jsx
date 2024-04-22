// web/src/pages/HomePage/HomePage.js

import React from 'react'

import { Metadata } from '@redwoodjs/web'

import FeedbackAverageScoreCell from 'src/components/FeedbackAverageScoreCell'
import UserFeedbackListCell from 'src/components/UserFeedbackListCell'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home Page" />

      <MainLayout>
        <div>
          <header className="home-header">
            <h1 className="home-header-title">SyntaxSwitch</h1>
            <p className="home-header-subtitle">
              The best code translator tool website
            </p>
          </header>
          <main className="home-main">
            <section id="overview" className="home-section">
              <h2 className="home-section-title">Overview:</h2>
              <p className="home-section-text">
                SyntaxSwitch is a cutting-edge code translation tool designed to
                bridge the gap between different programming languages
                seamlessly. Leveraging the powerful GPT-3 API, it assists
                developers by converting code snippets, functions from one
                language to another with high accuracy. Whether you're dealing
                with legacy code, integrating with codebases in different
                languages, or simply curious to see how your code would look in
                another syntax, SyntaxSwitch makes the process intuitive and
                error-free. With our tool, you can ensure code correctness and
                save countless hours of manual translation.
              </p>
            </section>
            <section id="quick-start" className="home-section">
              <h2 className="home-section-title">Quick Start:</h2>
              <div className="home-section-text">
                <p>
                  Getting started with SyntaxSwitch is simple and
                  straightforward. Here’s how you can begin translating your
                  code in just a few clicks:
                </p>
                <br />
                <ol className="list-inside list-decimal">
                  <li>
                    <strong>Access the Tool</strong>: Click on the 'Translator
                    Tool' button located in the navigation bar to access the
                    main translation interface.
                  </li>
                  <li>
                    <strong>Select Languages</strong>: Use the dropdown menus to
                    choose the source language of your code and the target
                    language to which you want it converted.
                  </li>
                  <li>
                    <strong>Paste Your Code</strong>: In the code submission
                    box, paste the code you wish to translate.
                  </li>
                  <li>
                    <strong>Translate</strong>: Hit the 'Submit' button and
                    watch as SyntaxSwitch translates your code efficiently.
                  </li>
                  <li>
                    <strong>Review and Use</strong>: The translated code will
                    appear in the output box. Review the translation, make any
                    tweaks if necessary, and use it as needed in your projects.
                  </li>
                  <li>
                    <strong>API Status</strong>: Check the current status of the
                    GPT-3 API directly from our 'API Status' button to ensure
                    the translation service is online.
                  </li>
                  <li>
                    <strong>Documentation</strong>: Access comprehensive guides
                    and tutorials via the 'Documentation' button to help you
                    make the most of the tool.
                  </li>
                  <li>
                    <strong>Login/Signup</strong>: For enhanced features and
                    personalized experience, click on 'Sign In' to access your
                    account or create a new one if you haven’t registered yet.
                  </li>
                  <li>
                    <strong>Feedback</strong>: Your input is invaluable to us.
                    The 'Feedback' button on the navigation bar is your direct
                    line to our development team. Whether you've encountered a
                    bug, have suggestions for new features, or want to leave
                    general comments, we're all ears. We strive to consider all
                    user suggestions and work diligently to enhance your
                    experience.
                  </li>
                </ol>
              </div>
            </section>
            <section id="feedbacks" className="home-section">
              <h2 className="home-section-title">The people have spoken!</h2>
              <div className="flex">
                <div className="home-section-text">
                  Below are some real recent reviews from our users. Our current
                  average rating out of five is:
                </div>
                <div className="mb-4 ml-4">
                  <FeedbackAverageScoreCell />
                </div>
              </div>
              <UserFeedbackListCell minimal={true} />
            </section>
          </main>
        </div>
      </MainLayout>
    </>
  )
}

export default HomePage
