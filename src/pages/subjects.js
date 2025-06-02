// src/pages/subjects.js
import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./subjects.module.css";

const subjects = {
  igcse: [
    {
      name: "Mathematics",
      description:
        "Master algebra, geometry, statistics, and trigonometry with comprehensive notes and practice problems.",
      topics: ["Algebra", "Geometry", "Statistics", "Trigonometry"],
      difficulty: "Core & Extended",
      link: "/notes/igcse/mathematics/bounds",
      color: "blue",
    },
    {
      name: "Physics",
      description:
        "Explore mechanics, waves, electricity, and modern physics with clear explanations and diagrams.",
      topics: ["Forces", "Waves", "Electricity", "Thermal Physics"],
      difficulty: "Core & Extended",
      link: "/notes/igcse/physics/electromagnetic-induction",
      color: "purple",
    },
    {
      name: "Business Studies",
      description:
        "Understand business concepts, marketing, finance, and operations with real-world examples.",

      topics: [
        "Business Environment",
        "Marketing",
        "Finance",
        "Operations Management",
      ],
      difficulty: "Core & Extended",
      link: "/notes/igcse/business/business-activity",
      color: "green",
    },
    {
      name: "Economics",
      description:
        "Learn economic principles, market structures, and global economics with interactive content.",
      topics: [
        "Microeconomics",
        "Macroeconomics",
        "International Trade",
        "Economic Development",
      ],
      difficulty: "Core & Extended",
      link: "/notes/igcse/economics/the-economic-problem",
      color: "orange",
    },
    // {
    //   name: "Biology",
    //   description:
    //     "Study life processes, genetics, ecology, and human biology with interactive content.",
    //   topics: ["Cell Biology", "Genetics", "Ecology", "Human Biology"],
    //   difficulty: "Core & Extended",
    //   link: "/notes/igcse/biology",
    //   color: "emerald",
    // },
    // {
    //   name: "English Language",
    //   description:
    //     "Develop reading, writing, and communication skills with comprehensive language guides.",
    //   topics: [
    //     "Reading Skills",
    //     "Writing Techniques",
    //     "Grammar",
    //     "Comprehension",
    //   ],
    //   difficulty: "First & Second Language",
    //   link: "/notes/igcse/english",
    //   color: "orange",
    // },
    // {
    //   name: "Geography",
    //   description:
    //     "Explore physical and human geography with maps, case studies, and fieldwork guidance.",
    //   topics: ["Physical Geography", "Human Geography", "Skills & Fieldwork"],
    //   difficulty: "Core",
    //   link: "/notes/igcse/geography",
    //   color: "teal",
    // },
  ],
  aLevel: [
    {
      name: "Mathematics",
      description:
        "Advanced pure mathematics, mechanics, and statistics for university preparation.",
      topics: ["Pure Mathematics", "Mechanics", "Statistics", "Further Pure"],
      difficulty: "AS & A2",
      link: "/notes/a-level/a-level-intro",
      color: "blue",
    },

    // {
    //   name: "Mathematics",
    //   description:
    //     "Advanced pure mathematics, mechanics, and statistics for university preparation.",
    //   topics: ["Pure Mathematics", "Mechanics", "Statistics", "Further Pure"],
    //   difficulty: "AS & A2",
    //   link: "/notes/a-level/mathematics",
    //   color: "blue",
    // },
    // {
    //   name: "Physics",
    //   description:
    //     "In-depth study of advanced physics concepts including quantum mechanics and relativity.",
    //   topics: [
    //     "Advanced Mechanics",
    //     "Fields",
    //     "Quantum Physics",
    //     "Astrophysics",
    //   ],
    //   difficulty: "AS & A2",
    //   link: "/notes/a-level/physics",
    //   color: "purple",
    // },
    // {
    //   name: "Chemistry",
    //   description:
    //     "Advanced organic, inorganic, and physical chemistry with laboratory techniques.",
    //   topics: [
    //     "Organic Chemistry",
    //     "Inorganic Chemistry",
    //     "Physical Chemistry",
    //     "Analysis",
    //   ],
    //   difficulty: "AS & A2",
    //   link: "/notes/a-level/chemistry",
    //   color: "green",
    // },
    // {
    //   name: "Biology",
    //   description:
    //     "Advanced biological concepts including molecular biology and biotechnology.",
    //   topics: [
    //     "Molecular Biology",
    //     "Genetics & Evolution",
    //     "Ecology",
    //     "Biotechnology",
    //   ],
    //   difficulty: "AS & A2",
    //   link: "/notes/a-level/biology",
    //   color: "emerald",
    // },
  ],
};

function SubjectCard({ subject }) {
  return (
    <Link
      to={subject.link}
      className={`${styles.subjectCard} ${styles[subject.color]}`}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.subjectName}>{subject.name}</h3>
        <span className={styles.difficulty}>{subject.difficulty}</span>
      </div>

      <p className={styles.description}>{subject.description}</p>

      <div className={styles.topicsSection}>
        <h4 className={styles.topicsTitle}>Key Topics:</h4>
        <div className={styles.topicsGrid}>
          {subject.topics.map((topic, index) => (
            <span key={index} className={styles.topicTag}>
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.cardFooter}>
        <span>Start Learning →</span>
      </div>
    </Link>
  );
}

export default function SubjectsPage() {
  const { siteConfig } = useDocusaurusContext();
  const [activeTab, setActiveTab] = useState("igcse");

  return (
    <Layout
      title="All Subjects"
      description="Comprehensive IGCSE and A-Level study materials for Cambridge students"
    >
      {/* Main Content */}
      <main className="container margin-vert--lg">
        {/* Tab Navigation */}
        <div className={styles.tabNavigation}>
          <button
            onClick={() => setActiveTab("igcse")}
            className={`${styles.tabButton} ${
              activeTab === "igcse" ? styles.active : ""
            }`}
          >
            IGCSE Subjects
          </button>
          <button
            onClick={() => setActiveTab("aLevel")}
            className={`${styles.tabButton} ${
              activeTab === "aLevel" ? styles.active : ""
            }`}
          >
            A-Level Subjects
          </button>
        </div>

        {/* Subjects Grid */}
        <div className={styles.subjectsGrid}>
          {subjects[activeTab].map((subject, index) => (
            <SubjectCard key={index} subject={subject} />
          ))}
        </div>

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
