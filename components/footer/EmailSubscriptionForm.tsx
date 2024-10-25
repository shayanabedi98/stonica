"use client";

export default function EmailSubscriptionForm() {
  return (
    <div className="flex min-w-72 flex-col gap-2">
      <label className="max-w-72 text-2xl font-thin">
        Subscribe to Receive Updates &amp; Offers!
      </label>
      <div className="relative mb-6">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
          <svg
            className="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 16"
          >
            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
          </svg>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            id="input-group-1"
            className="dark:placeholder-gray-40 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="joe@email.com"
          />
          <button className="flex items-center justify-center rounded-md bg-color1 px-3 text-sm font-semibold transition lg:hover:bg-color2">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
