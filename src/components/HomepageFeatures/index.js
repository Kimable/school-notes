import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Simplified & Structured",
    description: <>Complex concepts broken down for easy understanding.</>,
  },
  {
    title: "Exam-Focused Content",
    description: <>Includes key definitions, summaries, and exam tips.</>,
  },
  {
    title: "Regularly Updated",
    description: (
      <>We stay current with syllabus changes and examiner feedback.</>
    ),
  },
];

function Feature({ title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center"></div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h1 className="text--center">✅ Why Choose Our Notes?</h1>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
