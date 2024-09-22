export default function FooterAnime() {
  return (
    <footer className="m-4 mt-10 rounded-lg border-t-2 bg-background shadow-lg">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse"
          >
            <span className="self-center whitespace-nowrap text-2xl font-semibold text-foreground dark:text-white">
              Solo-HUb
            </span>
          </a>
          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-black dark:text-gray-400 sm:mb-0">
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <span className="block text-sm text-black dark:text-gray-400 sm:text-center">
          © 2024{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Solo_Anime
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
