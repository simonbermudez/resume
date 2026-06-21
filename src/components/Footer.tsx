'use client';

interface FooterProps {
    visible: boolean;
}

export default function Footer({ visible }: FooterProps) {
    if (!visible) return null;

    return (
        <div
            id="footer-text"
            className="fixed bottom-0 w-full text-center bg-black/10 py-2.5 text-[4vmin] font-mono"
        >
            <a
                target="_blank"
                href="https://www.linkedin.com/in/simonbermudez/"
                rel="noopener noreferrer"
                className="font-bold text-black no-underline hover:underline"
            >
                LinkedIn
            </a>
            <span className="text-black"> | </span>
            <a
                target="_blank"
                href="https://www.github.com/simonbermudez/"
                rel="noopener noreferrer"
                className="font-bold text-black no-underline hover:underline"
            >
                GitHub
            </a>
            <span className="text-black"> | </span>
            <a
                target="_blank"
                href="https://simonbermudez.com/"
                rel="noopener noreferrer"
                className="font-bold text-black no-underline hover:underline"
            >
                Website
            </a>
        </div>
    );
}
