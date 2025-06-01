import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import Heading from "@theme/Heading";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="text--center">
          Your go-to resource for free, simplified and structured notes for the
          Cambridge IGCSE and A-Level syllabuses.
        </p>
        <p className="text--center">
          We provide comprehensive notes, exam tips, and resources to help you
          excel in your studies.
        </p>
        <p className="text--center">
          We are actively adding notes, so be sure to check again after a few
          days in case you don't find what you are looking for. Alternatively,
          you can send us an email requesting the notes you need at
          <a href="mailto:info@mayyelites.co.ke" style={{ color: "yellow" }}>
            {" "}
            info@mayyelites.co.ke
          </a>{" "}
          and we will do our best to provide them for you 😊.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/subjects">
            📚 Start Learning Today
          </Link>
        </div>
      </div>
    </header>
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
