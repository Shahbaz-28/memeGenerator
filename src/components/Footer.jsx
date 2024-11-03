import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa"; // Importing React icons

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-4 sm:flex-row justify-between sm:space-y-0">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              MemeSocial
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 text-center">
              &copy; {new Date().getFullYear()} All rights reserved Shahbaz Khan
            </span>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://x.com/shahbaz_khan28"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter className="h-5 w-5 text-blue-500 hover:text-blue-600 transition" />
            </a>
            <a
              href="https://github.com/Shahbaz-28?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
            >
              <FaGithub className="h-5 w-5 text-gray-700 hover:text-gray-800 transition" />
            </a>
            <a
              href="https://www.linkedin.com/in/shahbaz-khan28/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5 text-blue-700 hover:text-blue-800 transition" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
