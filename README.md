# Awesome List Duplicate Link Finder

Maintain quality and avoid redundancy! Ensure your Awesome List references unique resources by detecting duplicate links automatically.

## Features

-   **Deep Scan**: Finds every instance of a URL.
-   **Ignore Hashes**: Treat `site.com#a` and `site.com#b` as duplicates (optional).
-   **Query Parameters**: Can strip query params to find true duplicates.

## Installation

```bash
npm install -g awesome-duplicate-finder
```

## Usage

Check file for duplicates:

```bash
awesome-duplicate-finder README.md
```

Strict mode (checks full URL equality including hash/query):

```bash
awesome-duplicate-finder README.md --strict
```

## Contact

Developed for Anunzio International by Anzul Aqeel.
Contact +971545822608 or +971585515742.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---
### 🔗 Part of the "Ultimate Utility Toolkit"
This tool is part of the **[Anunzio International Utility Toolkit](https://github.com/anzulaqeel/ultimate-utility-toolkit)**.
Check out the full collection of **180+ developer tools, scripts, and templates** in the master repository.

Developed for Anunzio International by Anzul Aqeel.
