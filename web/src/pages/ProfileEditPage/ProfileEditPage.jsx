import React from 'react'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const ProfileEditPage = () => {
  return (
    <MainLayout>
      <main className="rw-main mx-auto flex min-h-screen w-full flex-col items-center justify-center px-6 py-1 py-8 md:h-screen md:w-2/3 lg:py-0">
        <div className="p-2 md:p-4">
          <div className="rw-main mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
            <img
              src="/logo.png"
              alt="Syntax Switch Logo"
              className="logo-image "
            />
            <div className="rw-scaffold rw-login-container shadow dark:border p-9 mx-auto grid w-full max-w-2xl rounded-lg bg-white">
              <div className="mb-6 flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                <div
                  className="flex h-40 w-40 items-center justify-center rounded-full bg-blue-100 object-cover p-1 text-indigo-800 shadow-lg"
                  alt="Bordered avatar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex flex-col space-y-5 sm:ml-8">
                  <div>
                    <div>Username</div>
                    <div>Email</div>
                  </div>
                  <button
                    type="button"
                    className="py-3.5 px-7 focus:outline-none border focus:ring-4 focus:ring-indigo-200 rounded-lg border-indigo-200 bg-white text-base font-medium text-indigo-900 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 "
                  >
                    Reset Password
                  </button>
                </div>
              </div>
              <h2 className="mt-6 text-2xl font-bold sm:text-xl">
                Edit Profile
              </h2>
              <hr />
              <div className="sm:mt-14 mt-8 items-center">
                {/* username field */}
                <div className="mb-2 sm:mb-6">
                  <label
                    for="username"
                    className="mb-2 block text-sm font-medium text-indigo-900"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="bg-indigo-50 border focus:ring-indigo-500 p-2.5 block w-full rounded-lg border-indigo-300 text-sm text-indigo-900 focus:border-indigo-500"
                    placeholder="your username"
                  />
                </div>
                {/* email */}
                <div className="mb-2 sm:mb-6">
                  <label
                    for="email"
                    className="mb-2 block text-sm font-medium text-indigo-900"
                  >
                    Email
                  </label>
                  <input
                    id="profession"
                    type="text"
                    className="bg-indigo-50 border focus:ring-indigo-500 p-2.5 block w-full rounded-lg border-indigo-300 text-sm text-indigo-900 focus:border-indigo-500"
                    placeholder="your email"
                  />
                </div>
              </div>

              {/* save & delete button */}
              <div class="mt-7 flex w-full justify-between">
                <button class="rounded-lg border-none bg-red-500 px-4 py-2 text-white hover:bg-blue-800 hover:shadow-inner dark:bg-red-600 dark:hover:bg-red-700">
                  Delete Account
                </button>
                <button class="focus:ring-4 focus:outline-none  focus:ring-blue-300 py-2.5 dark:focus:ring-blue-800 w-full rounded-lg bg-blue-500 px-5 text-center text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 sm:w-auto">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  )
}
export default ProfileEditPage
