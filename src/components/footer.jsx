import Image from 'next/image';
import linkedinIcon from '@assets/icons/linkedin.svg';
import githubIcon from '@assets/icons/github.svg';
import twitterIcon from '@assets/icons/twitter.svg';

export default function Footer() {
  return (
    <footer className="w-full p-2">
      <ul className="flex gap-2 w-fit m-auto">
        <li>
          <a href="https://www.davidbasto.dev" target="_blank" rel="noopener noreferrer" className="hover:underline text-emerald-500">
            David Basto
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/david-basto/" target="_blank" rel="noopener noreferrer">
            <Image src={linkedinIcon} width={24} height={24} alt="linkedin" />
          </a>
        </li>
        <li>
          <a href="https://github.com/david-fb" target="_blank" rel="noopener noreferrer">
            <Image src={githubIcon} width={24} height={24} alt="github" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/DavidB_M1" target="_blank" rel="noopener noreferrer">
            <Image src={twitterIcon} width={24} height={24} alt="twitter" />
          </a>
        </li>
      </ul>
    </footer>
  );
}
