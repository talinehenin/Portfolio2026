import "./globals.css";
import "./design-system.css";
import "./site.css";

export const metadata = {
  title: "Taline Henin",
  description: "Portfolio of Taline Henin, a computer science student at the University of Guelph specializing in AI.",
};

// Apply the saved theme before first paint so the page never flashes the wrong one.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="phosphor"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Jacquard+24&family=VT323&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
