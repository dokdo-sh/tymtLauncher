# TYMT Launcher

The TYMT Launcher is an Multi platform online game laucher. Provides serveral blockchain network wallets.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


## Getting Started

### Prerequisites

Need to have installed before they can use your project.

- <a href="https://nodejs.org/en/download/">Node.js (16.14)</a>
- yarn
  ```
  npm install --global yarn
  ```
- Rust
- Microsoft Visual Studio C++ Build Tools
- Tauri
### Installation

1. Clone the repository:

  ```bash
  git clone https://github.com/armansw/tymtlauncher.git
  ```

2. Install packages
  ```
  npm install
  ```
3. Build web code
  ```
  npm run build
  ```
4. Build Application
  ```
  yarn tauri build
  ```
5. Run application in dev mode
  ```
  yarn run start
  yarn tauri dev
  ```
Built path of the application 
```
  /src-tauri/target/release
```
