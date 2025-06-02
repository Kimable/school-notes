import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import Heading from "@theme/Heading";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const stats = [
    { value: "30+", label: "Study Notes" },
    { value: "100+", label: "Students Helped" },
    { value: "96%", label: "Success Rate" },
    { value: "4.9/5", label: "Student Rating" },
  ];
  return (
    <>
      {/* Hero Section */}
      <header className={styles.heroSection}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            Master Your{" "}
            <span className={styles.highlight}>Cambridge Exams</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Comprehensive study notes, practice questions, and exam strategies
            for IGCSE and A-Level success
          </p>

          <p style={{ fontSize: "1rem" }} className={styles.heroSubtitle}>
            PLEASE NOTE: We are actively adding notes, so be sure to check again
            after a few days in case you don't find what you are looking for.
            Alternatively, you can send us an email requesting the notes you
            need at
            <a href="mailto:info@mayyelites.co.ke" style={{ color: "yellow" }}>
              {" "}
              info@mayyelites.co.ke
            </a>{" "}
            and we will do our best to provide them for you 😊.
          </p>

          {/* Stats */}
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "2rem" }} className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/subjects"
            >
              📚 Start Learning Today
            </Link>
          </div>
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
      <main style={{ margin: "2rem 0" }}>
        <HomepageFeatures />
        {/* Call to Action */}
        <section className={styles.ctaSection}>
          <h2>Ready to Excel in Your Studies?</h2>
          <p>
            Join thousands of students who have improved their grades with our
            comprehensive study materials.
          </p>
          <div className={styles.ctaButtons}>
            <Link
              className="button button--primary button--lg"
              to="/notes/igcse/igcse-intro"
            >
              Browse All Notes
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/exam-tips"
            >
              Exam Strategies
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
