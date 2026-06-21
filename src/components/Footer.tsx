'use client';

interface FooterProps {
    visible: boolean;
    darkMode: boolean;
}

export default function Footer({ visible, darkMode }: FooterProps) {
    if (!visible) return null;

    const linkColor = darkMode ? 'text-white' : 'text-black';
    const separatorColor = darkMode ? 'text-white' : 'text-black';
    const bg = darkMode ? 'bg-white/5' : 'bg-black/10';

    return (
        <div
            id="footer-text"
            className={`fixed bottom-0 w-full text-center py-2.5 text-[4vmin] font-mono ${bg}`}
        >
            <a
                target="_blank"
                href="https://www.linkedin.com/in/enricmf/"
                rel="noopener noreferrer"
                className={`font-bold ${linkColor} no-underline hover:underline`}
            >
                LinkedIn
            </a>
            <span className={separatorColor}> | </span>
            <a
                target="_blank"
                href="https://www.github.com/enric1994/"
                rel="noopener noreferrer"
                className={`font-bold ${linkColor} no-underline hover:underline`}
            >
                GitHub
            </a>
            <span className={separatorColor}> | </span>
            <a
                target="_blank"
                href="https://hi.enricmor.eu/"
                rel="noopener noreferrer"
                className={`font-bold ${linkColor} no-underline hover:underline`}
            >
                Website
            </a>
        </div>
    );
}
