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
    };

    this.levelLabels = {
      igcse: "IGCSE",
      "a-level": "A-Level",
      "as-level": "AS-Level",
      ib: "International Baccalaureate",
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
        // Check if this directory has markdown files
        if (this.hasMarkdownFiles(fullPath)) {
          subjects[item] = {
            label:
              this.subjectLabels[item.toLowerCase()] ||
              this.capitalizeWords(item),
            path: path.relative(this.docsDir, fullPath).replace(/\\/g, "/"),
          };
        }
      }
    }

    return subjects;
  }

  // Check if directory contains markdown files
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

        levelConfig.items.push({
          type: "category",
          label: subjectInfo.label,
          link: {
            type: "generated-index",
            title: `${levelLabel} ${subjectInfo.label}`,
            description: `Complete ${levelLabel} ${subjectInfo.label} notes and resources`,
            slug: `/${subjectInfo.path}`,
          },
          items: [
            {
              type: "autogenerated",
              dirName: subjectInfo.path,
            },
          ],
        });
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
        "\n📝 Your subjects will now appear with proper capitalization in the sidebar!"
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
    console.log(`📝 Added custom label: ${folderName} → ${displayName}`);
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

    case "help":
    default:
      console.log("Usage: node generate-sidebar.js <command>");
      console.log("");
      console.log("Commands:");
      console.log("  generate     - Generate sidebar configuration (default)");
      console.log("  scan         - Scan and display directory structure");
      console.log("  config       - Show current label configuration");
      console.log("  add-subject  - Add custom subject label");
      console.log("  help         - Show this help message");
      console.log("");
      console.log("Examples:");
      console.log("  node generate-sidebar.js generate");
      console.log("  node generate-sidebar.js scan");
      console.log(
        '  node generate-sidebar.js add-subject physics "Advanced Physics"'
      );
      break;
  }
}

// Export for use as module or run as CLI
if (require.main === module) {
  main();
}

module.exports = SidebarGenerator;
