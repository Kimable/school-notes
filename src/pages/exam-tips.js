import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import Heading from "@theme/Heading";
import styles from "./index.module.css";

const tips = [
  {
    title: "🧠 1. Understand the Exam Format",
    points: [
      "Know your syllabus and stick to it.",
      "Understand the paper structure and question types.",
    ],
  },
  {
    title: "📝 2. Master Past Papers",
    points: [
      "Practice with past papers under timed conditions.",
      "Review mark schemes and examiner reports.",
    ],
  },
  {
    title: "🗂️ 3. Create a Realistic Study Schedule",
    points: [
      "Break your syllabus into weekly goals.",
      "Balance subjects and include breaks.",
    ],
  },
  {
    title: "🎯 4. Use Active Revision Techniques",
    points: [
      "Summarize using mind maps and flashcards.",
      "Teach someone else — it helps reinforce learning.",
      "Use spaced repetition to retain key concepts.",
    ],
  },
  {
    title: "⏰ 5. Practice Time Management",
    points: [
      "Time yourself when doing past papers.",
      "Stick to question time limits during practice.",
      "Simulate full exam sessions to build stamina.",
    ],
  },
  {
    title: "🧩 6. Focus on High-Impact Topics",
    points: [
      "Identify frequently tested and high-mark topics.",
      "Master the basics — they’re often tested in creative ways.",
    ],
  },
  {
    title: "😌 7. Take Care of Your Well-being",
    points: [
      "Sleep well and eat brain-friendly foods.",
      "Take regular breaks to avoid burnout.",
    ],
  },
  {
    title: "🧘 8. Build Exam Confidence",
    points: [
      "Use positive affirmations and calming techniques.",
      "Mistakes are part of learning — don't stress.",
    ],
  },
  {
    title: "📚 9. Get Help When You Need It",
    points: [
      "Ask your Mayy Elites tutor for clarification.",
      "Join group sessions and use reliable study resources.",
    ],
  },
  {
    title: "🎯 10. Stay Exam-Ready",
    points: [
      "Prepare your materials the night before.",
      "Arrive early and stay calm — no last-minute cramming.",
      "Read questions carefully and plan your answers.",
    ],
  },
];

function HomepageHeader() {
  return (
    <>
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className={styles.heroTitle}>
            📘 Exam Tips and Strategies
          </Heading>
          <p className={styles.heroSubtitle}>
            Success in exams goes beyond just studying hard — it’s about
            studying smart. Whether you're preparing for your IGCSEs or
            A-Levels, these tried-and-tested tips will help you stay focused,
            organized, and confident throughout your revision journey.
          </p>
        </div>
      </header>
    </>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main className="container margin-vert--lg">
        <div className="row">
          {tips.map((tip, index) => (
            <div key={index} className="col col--6 margin-bottom--lg">
              <div className={clsx("card", "shadow--md")}>
                <div className="card__header">
                  <h3>{tip.title}</h3>
                </div>
                <div className="card__body">
                  <ul>
                    {tip.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="margin-top--l text--center">
          <h3 className="text--success">✨ Final Thought</h3>
          <p>
            Exams are just one part of your academic journey — with discipline,
            the right mindset, and smart strategies, you can excel and unlock
            your full potential. At{" "}
            <strong className="text--primary">Mayy Elites</strong>, we’re here
            to guide you every step of the way!
          </p>

          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/subjects"
            >
              📚 Browse our notes
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
