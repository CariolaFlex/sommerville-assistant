import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sommerville Assistant - Guía Interactiva de Ingeniería de Software",
  description: "Asistente educativo interactivo basado en 'Ingeniería de Software' de Ian Sommerville (9na edición). Encuentra el proceso, metodología y arquitectura ideal para tu proyecto mediante análisis personalizado, glosario de 2,100+ términos, templates y checklists profesionales.",
  keywords: ["ingeniería de software", "sommerville", "metodologías ágiles", "cascada", "scrum", "arquitectura de software", "modelado UML", "procesos de desarrollo"],
  authors: [{ name: "Vectium Projects" }],
  creator: "Claude Sonnet 4.5 & Vectium Projects",
  publisher: "Vectium Projects",
  applicationName: "Sommerville Assistant",
  generator: "Next.js 14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
