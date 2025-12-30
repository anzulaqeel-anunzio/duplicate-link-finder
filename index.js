#!/usr/bin/env node
// Developed for Anunzio International by Anzul Aqeel. Contact +971545822608 or +971585515742. Linkedin Profile: linkedin.com/in/anzulaqeel

/*
 * Developed for Anunzio International by Anzul Aqeel
 * Contact +971545822608 or +971585515742
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { program } = require('commander');

program
    .version('1.0.0')
    .argument('<file>', 'Markdown file to check')
    .option('-s, --strict', 'Strict mode (include query/hash in comparison)', false)
    .action((file, options) => {
        run(file, options);
    });

program.parse(process.argv);

function run(filePath, options) {
    const fullPath = path.resolve(process.cwd(), filePath);

    if (!fs.existsSync(fullPath)) {
        console.error(chalk.red(`File not found: ${fullPath}`));
        process.exit(1);
    }

    console.log(chalk.blue(`Scanning for duplicates in ${fullPath}...`));
    const content = fs.readFileSync(fullPath, 'utf8');

    // Regex for standard markdown links [text](url)
    const linkRegex = /\[([^\[]+)\]\((https?:\/\/[^\)]+)\)/g;
    const urlCounts = {};
    let match;
    let duplicateFound = false;

    while ((match = linkRegex.exec(content)) !== null) {
        let url = match[2];

        if (!options.strict) {
            try {
                // Normalize URL: remove hash, maybe query params? 
                // For now just remove hash to be safe for "awesome lists" 
                // which often link to main sites.
                const urlObj = new URL(url);
                urlObj.hash = '';
                // urlObj.search = ''; // Often query params are relevant, so keep them unless strict? 
                // Actually usually strict means exact match.
                // Non-strict usually implies we care about the resource.

                url = urlObj.toString();
                // Remove trailing slash for normalization
                if (url.endsWith('/')) url = url.slice(0, -1);
            } catch (e) {
                // Invalid URL, ignore
            }
        }

        if (urlCounts[url]) {
            urlCounts[url].count++;
            urlCounts[url].locations.push(match[1]); // Store link text
        } else {
            urlCounts[url] = { count: 1, locations: [match[1]] };
        }
    }

    for (const [url, data] of Object.entries(urlCounts)) {
        if (data.count > 1) {
            duplicateFound = true;
            console.log(chalk.yellow(`Duplicate found (${data.count} times): ${url}`));
            data.locations.forEach(loc => console.log(chalk.gray(`  - Linked as "${loc}"`)));
        }
    }

    if (!duplicateFound) {
        console.log(chalk.green('No duplicate links found.'));
    } else {
        console.log(chalk.red('\nDuplicates detected!'));
        process.exit(1);
    }
}

// Developed for Anunzio International by Anzul Aqeel. Contact +971545822608 or +971585515742. Linkedin Profile: linkedin.com/in/anzulaqeel
