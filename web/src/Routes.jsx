// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'

const Routes = () => {
return (
    <Router useAuth={useAuth}>
      <Route path="/translation-history" page={TranslationHistoryPage} name="translationHistory" />
      <Route path="/documentation" page={DocumentationPage} name="documentation" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/Feedback" page={UserFeedbackInputPage} name="userFeedbackInput" />
      <Route path="/Feedback-out" page={UserFeedbackOutputPage} name="userFeedbackOutput" />
      <Route path="/translation-output" page={TranslationOutputPage} name="translationOutput" />
      <Route path="/home" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
