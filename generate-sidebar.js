const fs = require("fs");
const path = require("path");

class SidebarGenerator {
  constructor(docsDir = "./docs", notesDir = "./notes") {
    this.docsDir = docsDir;
    this.notesDir = notesDir;
    this.subjectLabels = {
      // Subject folder names to proper display names
      mathematics: "Mathematics",
      physics: "Physics",
      chemistry: "Chemistry",
      biology: "Biology",
      business: "Business Studies",
      economics: "Economics",
      "english-literature": "English Literature",
      "english-language": "English Language",
      "computer-science": "Computer Science",
      history: "History",
      geography: "Geography",
      "art-and-design": "Art & Design",
      music: "Music",
      drama: "Drama",
      pe: "Physical Education",
      french: "French",
      spanish: "Spanish",
      german: "German",
      introduction: "Introduction",
      // Add more subjects as needed
      electromagnetism: "Electromagnetism",
    };

    this.levelLabels = {
      igcse: "IGCSE",
      "a-level": "A-Level",
      "as-level": "AS-Level",
      ib: "International Baccalaureate",
    };

    // Topic/subfolder labels for better display names
    this.topicLabels = {
      // Physics topics
      "electricity-and-magnetism": "Electricity and Magnetism",
      "waves-and-optics": "Waves and Optics",
      "thermal-physics": "Thermal Physics",
      "quantum-physics": "Quantum Physics",
      "nuclear-physics": "Nuclear Physics",
      "particle-physics": "Particle Physics",
      "classical-mechanics": "Classical Mechanics",
      "modern-physics": "Modern Physics",

      // Mathematics topics
      "pure-mathematics": "Pure Mathematics",
      "applied-mathematics": "Applied Mathematics",
      "statistics-and-probability": "Statistics and Probability",
      "differential-equations": "Differential Equations",
      "linear-algebra": "Linear Algebra",
      "complex-numbers": "Complex Numbers",

      // Chemistry topics
      "organic-chemistry": "Organic Chemistry",
      "inorganic-chemistry": "Inorganic Chemistry",
      "physical-chemistry": "Physical Chemistry",
      "analytical-chemistry": "Analytical Chemistry",

      // Biology topics
      "cell-biology": "Cell Biology",
      "molecular-biology": "Molecular Biology",
      "human-physiology": "Human Physiology",
      "plant-biology": "Plant Biology",
      "ecology-and-environment": "Ecology and Environment",
      "genetics-and-evolution": "Genetics and Evolution",

      // Computer Science topics
      "data-structures": "Data Structures",
      "algorithms-and-complexity": "Algorithms and Complexity",
      "computer-systems": "Computer Systems",
      "software-engineering": "Software Engineering",
      "databases-and-sql": "Databases and SQL",
      "web-development": "Web Development",
      "artificial-intelligence": "Artificial Intelligence",
      "machine-learning": "Machine Learning",

      // Business topics
      "business-management": "Business Management",
      "marketing-and-sales": "Marketing and Sales",
      "finance-and-accounting": "Finance and Accounting",
      "human-resources": "Human Resources",
      "operations-management": "Operations Management",

      // General topics
      "introduction-and-overview": "Introduction and Overview",
      "exam-preparation": "Exam Preparation",
      "practice-questions": "Practice Questions",
      "past-papers": "Past Papers",
      "revision-notes": "Revision Notes",
    };
  }

  // Scan directory structure to find subjects
  scanDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
      console.log(`⚠️  Directory ${dirPath} does not exist`);
      return {};
    }

    const structure = {};
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith(".")) {
        // Check if this looks like a level directory (igcse, a-level, etc.)
        const subItems = fs.readdirSync(fullPath);
        const hasSubjects = subItems.some((subItem) => {
          const subPath = path.join(fullPath, subItem);
          return (
            fs.statSync(subPath).isDirectory() &&
            Object.keys(this.subjectLabels).includes(subItem.toLowerCase())
          );
        });

        if (hasSubjects) {
          structure[item] = this.scanSubjects(fullPath);
        }
      }
    }

    return structure;
  }

  // Scan subjects within a level directory
  scanSubjects(levelDir) {
    const subjects = {};
    const items = fs.readdirSync(levelDir);

    for (const item of items) {
      const fullPath = path.join(levelDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith(".")) {
        // Check if this directory has markdown files (directly or in subfolders)
        if (this.hasMarkdownFiles(fullPath)) {
          subjects[item] = {
            label:
              this.subjectLabels[item.toLowerCase()] ||
              this.capitalizeWords(item),
            path: path.relative(this.docsDir, fullPath).replace(/\\/g, "/"),
            topics: this.scanTopics(fullPath),
          };
        }
      }
    }

    return subjects;
  }

  // Scan topics/subfolders within a subject directory
  scanTopics(subjectDir) {
    const topics = {};

    try {
      const items = fs.readdirSync(subjectDir);

      for (const item of items) {
        const fullPath = path.join(subjectDir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !item.startsWith(".")) {
          // Check if this subdirectory has markdown files
          if (this.hasMarkdownFiles(fullPath)) {
            topics[item] = {
              label:
                this.topicLabels[item.toLowerCase()] ||
                this.capitalizeWords(item),
              path: path.relative(this.docsDir, fullPath).replace(/\\/g, "/"),
            };
          }
        }
      }
    } catch (error) {
      console.log(
        `⚠️  Could not scan topics in ${subjectDir}: ${error.message}`
      );
    }

    return topics;
  }

  // Get direct markdown files in a directory (excluding subdirectories)
  getDirectFiles(dirPath) {
    const directFiles = [];

    try {
      if (!fs.existsSync(dirPath)) {
        return directFiles;
      }

      const items = fs.readdirSync(dirPath);

      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isFile() && (item.endsWith(".md") || item.endsWith(".mdx"))) {
          directFiles.push(item);
        }
      }
    } catch (error) {
      console.log(
        `⚠️  Could not read direct files in ${dirPath}: ${error.message}`
      );
    }

    return directFiles;
  }
  hasMarkdownFiles(dirPath) {
    try {
      const items = fs.readdirSync(dirPath);
      return items.some((item) => {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        return (
          (stat.isFile() && (item.endsWith(".md") || item.endsWith(".mdx"))) ||
          (stat.isDirectory() && this.hasMarkdownFiles(fullPath))
        );
      });
    } catch (error) {
      return false;
    }
  }

  // Find intro file for a level (like a-level-intro.md)
  findIntroFile(levelDir) {
    const possibleIntroFiles = [
      `${levelDir}-intro`,
      `${levelDir}/intro`,
      `${levelDir}/index`,
      `${levelDir}/${levelDir}-intro`,
    ];

    for (const introPath of possibleIntroFiles) {
      const mdPath = `${introPath}.md`;
      const mdxPath = `${introPath}.mdx`;

      if (
        fs.existsSync(path.join(this.docsDir, mdPath)) ||
        fs.existsSync(path.join(this.notesDir, mdPath))
      ) {
        return introPath;
      }
      if (
        fs.existsSync(path.join(this.docsDir, mdxPath)) ||
        fs.existsSync(path.join(this.notesDir, mdxPath))
      ) {
        return introPath;
      }
    }

    return null;
  }

  // Capitalize words for display
  capitalizeWords(str) {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // Generate sidebar configuration
  generateSidebar() {
    console.log("🔍 Scanning directory structure...\n");

    const structure =
      this.scanDirectory(this.docsDir) || this.scanDirectory(this.notesDir);

    if (Object.keys(structure).length === 0) {
      console.log("❌ No valid directory structure found");
      return null;
    }

    const sidebar = [];

    // Process each level (IGCSE, A-Level, etc.)
    for (const [levelDir, subjects] of Object.entries(structure)) {
      const levelLabel =
        this.levelLabels[levelDir.toLowerCase()] ||
        this.capitalizeWords(levelDir);

      console.log(`📚 Found level: ${levelLabel}`);

      // Skip empty levels (no subjects)
      if (Object.keys(subjects).length === 0) {
        console.log(`  ⚠️  Skipping ${levelLabel} - no subjects found`);
        continue;
      }

      const levelConfig = {
        type: "category",
        label: levelLabel,
        items: [],
      };

      // Check if there's an intro file for this level
      const levelIntroPath = this.findIntroFile(levelDir);
      if (levelIntroPath) {
        levelConfig.link = {
          type: "doc",
          id: levelIntroPath,
        };
      } else {
        // Create a generated index page for the level
        levelConfig.link = {
          type: "generated-index",
          title: levelLabel,
          description: `${levelLabel} notes and resources`,
          slug: `/${levelDir.toLowerCase()}`,
        };
      }

      // Add subjects for this level
      for (const [subjectDir, subjectInfo] of Object.entries(subjects)) {
        console.log(`  📖 Subject: ${subjectInfo.label} (${subjectInfo.path})`);

        const subjectConfig = {
          type: "category",
          label: subjectInfo.label,
          link: {
            type: "generated-index",
            title: `${levelLabel} ${subjectInfo.label}`,
            description: `Complete ${levelLabel} ${subjectInfo.label} notes and resources`,
            slug: `/${subjectInfo.path}`,
          },
          items: [],
        };

        // If there are topics/subfolders, organize them
        if (Object.keys(subjectInfo.topics).length > 0) {
          // Add topics as subcategories
          for (const [topicDir, topicInfo] of Object.entries(
            subjectInfo.topics
          )) {
            console.log(`    📝 Topic: ${topicInfo.label} (${topicInfo.path})`);

            subjectConfig.items.push({
              type: "category",
              label: topicInfo.label,
              link: {
                type: "generated-index",
                title: `${subjectInfo.label} - ${topicInfo.label}`,
                description: `${topicInfo.label} notes and resources for ${levelLabel} ${subjectInfo.label}`,
                slug: `/${topicInfo.path}`,
              },
              items: [
                {
                  type: "autogenerated",
                  dirName: topicInfo.path,
                },
              ],
            });
          }

          // Add any direct files in the subject directory (but exclude the topic folders)
          const directFiles = this.getDirectFiles(
            path.join(this.docsDir, subjectInfo.path)
          );
          if (directFiles.length > 0) {
            // Create individual doc items for direct files
            for (const file of directFiles) {
              const docId = path
                .join(subjectInfo.path, file.replace(/\.(md|mdx)$/, ""))
                .replace(/\\/g, "/");
              const fileName = file.replace(/\.(md|mdx)$/, "");
              subjectConfig.items.push({
                type: "doc",
                id: docId,
                label: this.capitalizeWords(fileName),
              });
            }
          }
        } else {
          // No subfolders, just use autogenerated for the whole subject
          subjectConfig.items.push({
            type: "autogenerated",
            dirName: subjectInfo.path,
          });
        }

        levelConfig.items.push(subjectConfig);
      }

      sidebar.push(levelConfig);
    }

    // If no valid levels found, create a simple autogenerated sidebar
    if (sidebar.length === 0) {
      console.log("📝 Creating simple autogenerated sidebar");
      return {
        tutorialSidebar: [
          {
            type: "autogenerated",
            dirName: ".",
          },
        ],
      };
    }

    return {
      tutorialSidebar: sidebar,
    };
  }

  // Generate and save sidebar file
  generateSidebarFile(outputPath = "./sidebars.js") {
    const sidebarConfig = this.generateSidebar();

    if (!sidebarConfig) {
      console.log("❌ Could not generate sidebar configuration");
      return false;
    }

    const sidebarContent = `// Auto-generated sidebar configuration
// Generated on ${new Date().toISOString()}

const sidebars = ${JSON.stringify(sidebarConfig, null, 2)};

module.exports = sidebars;
`;

    try {
      fs.writeFileSync(outputPath, sidebarContent, "utf8");
      console.log(`\n✅ Sidebar configuration saved to ${outputPath}`);
      console.log(
        "\n📝 Your subjects and topics will now appear with proper capitalization in the sidebar!"
      );
      console.log(
        "💡 The folder structure remains lowercase to avoid broken links."
      );
      return true;
    } catch (error) {
      console.log(`❌ Error saving sidebar: ${error.message}`);
      return false;
    }
  }

  // Add a custom subject label
  addSubjectLabel(folderName, displayName) {
    this.subjectLabels[folderName.toLowerCase()] = displayName;
    console.log(
      `📝 Added custom subject label: ${folderName} → ${displayName}`
    );
  }

  // Add a custom topic label
  addTopicLabel(folderName, displayName) {
    this.topicLabels[folderName.toLowerCase()] = displayName;
    console.log(`📝 Added custom topic label: ${folderName} → ${displayName}`);
  }

  // Show current configuration
  showConfiguration() {
    console.log("📋 Current Subject Labels:");
    console.log("==========================");

    for (const [folder, label] of Object.entries(this.subjectLabels)) {
      console.log(`  ${folder} → ${label}`);
    }

    console.log("\n📋 Current Level Labels:");
    console.log("========================");

    for (const [folder, label] of Object.entries(this.levelLabels)) {
      console.log(`  ${folder} → ${label}`);
    }

    console.log("\n📋 Current Topic Labels:");
    console.log("========================");

    for (const [folder, label] of Object.entries(this.topicLabels)) {
      console.log(`  ${folder} → ${label}`);
    }
  }
}

// CLI Usage
function main() {
  const args = process.argv.slice(2);
  const command = args[0] || "generate";

  const generator = new SidebarGenerator();

  console.log("📁 Docusaurus Sidebar Generator");
  console.log("===============================\n");

  switch (command) {
    case "generate":
      generator.generateSidebarFile();
      break;

    case "scan":
      console.log("🔍 Scanning directory structure...\n");
      const structure =
        generator.scanDirectory("./docs") || generator.scanDirectory("./notes");
      console.log("\nDirectory Structure:");
      console.log(JSON.stringify(structure, null, 2));
      break;

    case "config":
      generator.showConfiguration();
      break;

    case "add-subject":
      if (args.length < 3) {
        console.log(
          "Usage: node generate-sidebar.js add-subject <folder-name> <display-name>"
        );
        console.log(
          'Example: node generate-sidebar.js add-subject computer-science "Computer Science"'
        );
        break;
      }
      generator.addSubjectLabel(args[1], args[2]);
      generator.generateSidebarFile();
      break;

    case "add-topic":
      if (args.length < 3) {
        console.log(
          "Usage: node generate-sidebar.js add-topic <folder-name> <display-name>"
        );
        console.log(
          'Example: node generate-sidebar.js add-topic electricity-and-magnetism "Electricity and Magnetism"'
        );
        break;
      }
      generator.addTopicLabel(args[1], args[2]);
      generator.generateSidebarFile();
      break;

    case "help":
    default:
      console.log("Usage: node generate-sidebar.js <command>");
      console.log("");
      console.log("Commands:");
      console.log("  generate     - Generate sidebar configuration (default)");
      console.log("  scan         - Scan and display directory structure");
      console.log("  config       - Show current label configuration");
      console.log("  add-subject  - Add custom subject label");
      console.log("  add-topic    - Add custom topic/subfolder label");
      console.log("  help         - Show this help message");
      console.log("");
      console.log("Examples:");
      console.log("  node generate-sidebar.js generate");
      console.log("  node generate-sidebar.js scan");
      console.log(
        '  node generate-sidebar.js add-subject physics "Advanced Physics"'
      );
      console.log(
        '  node generate-sidebar.js add-topic quantum-mechanics "Quantum Mechanics"'
      );
      break;
  }
}

// Export for use as module or run as CLI
if (require.main === module) {
  main();
}

module.exports = SidebarGenerator;
