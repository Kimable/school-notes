// src/pages/subjects/mathematics.js
import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

const mathematicsTopics = {
  igcse: [
    {
      name: "Number",
      link: "/notes/igcse/mathematics/number",
      description: "Integers, fractions, decimals, and percentages",
    },
    {
      name: "Algebra",
      link: "/notes/igcse/mathematics/algebra",
      description: "Linear equations, quadratics, and graphs",
    },
    {
      name: "Geometry",
      link: "/notes/igcse/mathematics/geometry",
      description: "Shapes, angles, area, and volume",
    },
    {
      name: "Statistics",
      link: "/notes/igcse/mathematics/statistics",
      description: "Data analysis and probability",
    },
    {
      name: "Trigonometry",
      link: "/notes/igcse/mathematics/trigonometry",
      description: "Sine, cosine, tangent, and applications",
    },
  ],
  aLevel: [
    {
      name: "Pure Mathematics 1",
      link: "/notes/a-level/mathematics/pure1",
      description: "Functions, quadratics, and coordinate geometry",
    },
    {
      name: "Pure Mathematics 2",
      link: "/notes/a-level/mathematics/pure2",
      description: "Logarithms, trigonometry, and sequences",
    },
    {
      name: "Mechanics",
      link: "/notes/a-level/mathematics/mechanics",
      description: "Forces, motion, and projectiles",
    },
    {
      name: "Statistics",
      link: "/notes/a-level/mathematics/statistics",
      description: "Probability distributions and hypothesis testing",
    },
  ],
};

export default function MathematicsSubject() {
  return (
    <Layout
      title="Mathematics - All Levels"
      description="Comprehensive mathematics study materials for IGCSE and A-Level students"
    >
      <div className="container margin-vert--lg">
        <header className="text--center margin-bottom--xl">
          <h1>Mathematics Study Notes</h1>
          <p className="hero__subtitle">
            Master mathematics from IGCSE fundamentals to A-Level advanced
            concepts
          </p>
        </header>

        {/* <div className="row">
          <div className="col col--6">
            <div className="card margin-bottom--lg">
              <div className="card__header">
                <h2>IGCSE Mathematics</h2>
              </div>
              <div className="card__body">
                {mathematicsTopics.igcse.map((topic, index) => (
                  <div key={index} className="margin-bottom--md">
                    <Link
                      to={topic.link}
                      className="button button--outline button--primary button--block"
                    >
                      <strong>{topic.name}</strong>
                      <br />
                      <small>{topic.description}</small>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col col--6">
            <div className="card margin-bottom--lg">
              <div className="card__header">
                <h2>A-Level Mathematics</h2>
              </div>
              <div className="card__body">
                {mathematicsTopics.aLevel.map((topic, index) => (
                  <div key={index} className="margin-bottom--md">
                    <Link
                      to={topic.link}
                      className="button button--outline button--secondary button--block"
                    >
                      <strong>{topic.name}</strong>
                      <br />
                      <small>{topic.description}</small>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> */}

        <div className="text--center margin-top--xl">
          <Link className="button button--primary button--lg" to="/subjects">
            ← Back to All Subjects
          </Link>
        </div>
      </div>
    </Layout>
  );
}
