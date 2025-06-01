// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Mayy Elites Notes",
  tagline: "Master IGCSE & A-Level Exams with Confidence",
  favicon: "img/favicon/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://notes.mayyelites.co.ke",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          breadcrumbs: false,
          routeBasePath: "notes", // Change from default 'docs' to 'notes'
          // Please change this to your repo.
        },
        theme: {
          customCss: ["./src/css/custom.css"],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/logo-compressed.png",
      navbar: {
        title: "Mayy Elites Notes",
        logo: {
          alt: "Mayy Elites Logo",
          src: "img/logo-compressed.png",
        },
        items: [
          {
            to: "/subjects",
            label: "Subjects",
            position: "left",
          },
          {
            type: "doc",
            docId: "igcse/igcse-intro",
            position: "left",
            label: "IGCSE Notes",
          },
          // {
          //   type: "doc",
          //   docId: "a-level/intro",
          //   position: "left",
          //   label: "A-Level",
          // },
          // ... other items

          {
            to: "https://blog.mayyelites.co.ke",
            label: "Blog",
            position: "left",
          },
          {
            to: "https://mayyelites.co.ke/contact",
            label: "Contact Us",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "IGCSE Notes",
            items: [
              {
                label: "Mathematics",
                to: "/notes/igcse/mathematics/bounds",
              },
              {
                label: "Physics",
                to: "/notes/igcse/physics/electromagnetic-induction",
              },
              {
                label: "Business Studies",
                to: "/notes/igcse/business/business-activity",
              },
              {
                label: "Economics",
                to: "/notes/igcse/economics/the-economic-problem",
              },
            ],
          },
          {
            title: "Important Links",
            items: [
              {
                label: "About Mayy Elites",
                to: "https://mayyelites.co.ke/about",
              },
              {
                label: "Subjects",
                to: "/subjects",
              },
              {
                label: "Contact Us",
                to: "https://mayyelites.co.ke/contact",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "https://blog.mayyelites.co.ke",
              },
              {
                label: "Curious About Homeschooling?",
                to: "https://blog.mayyelites.co.ke",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Mayy Elites Notes.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
