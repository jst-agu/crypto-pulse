'use client';

import Link from 'next/link';
import { FaTwitter, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
      <p className="mb-4">
        © {new Date().getFullYear()} Crypto Pulse - Agu | Built with 💙 for crypto lovers.
      </p>

      <div className="flex justify-center gap-5 text-xl">
        <Link
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition"
        >
          <FaTwitter />
        </Link>

        <Link
          href="https://linkedin.com/in/agu-bdev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition"
        >
          <FaLinkedin />
        </Link>

        <Link
          href="https://wa.me/+2347051149394"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-500 transition"
        >
          <FaWhatsapp />
        </Link>

        <Link
          href="https://instagram.com/jst_agu"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 transition"
        >
          <FaInstagram />
        </Link>
      </div>
    </footer>
  );
}
