# CodeHub - Run, Design, and Share Code

## 🚀 Overview
CodeHub is a dynamic platform built with **Next.js** and powered by **Convex DB**, where users can:
- Run code in multiple programming languages
- Design stunning web pages using **HTML**, **CSS**, and **JavaScript**
- Post their code snippets
- Explore and interact with others' code

## 🏗️ Tech Stack
- **Frontend:** Next.js
- **Database:** Convex DB
- **Languages Supported:** Multiple programming languages

## 📦 Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/nitin1kum/code-daily.git
   cd code-daily
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure Convex DB:**
   - Sign up at [convex.dev](https://www.convex.dev/)
   - Get your project credentials and add them to `.env.local`:
     ```env
     CONVEX_URL=your_convex_project_url
     ```
4. **Run the App:**
   ```bash
   npm run dev
   npx convex dev
   ```
   Visit `http://localhost:3000` to see it in action.

## ✍️ Features
- 💻 **Code Runner:** Execute code in different languages instantly.
- 🎨 **Web Design Editor:** Create responsive web pages with live preview.
- 📤 **Post Your Code:** Share your code snippets with the community.
- 🔍 **Explore:** Browse, view, and get inspired by others' code.

## 📁 Folder Structure
```
├───app
│   ├───(root)
│   │   ├───_components
│   │   └───_constants
│   ├───api
│   │   └───payment
│   │       ├───create-payment
│   │       └───verify-payment
│   ├───fonts
│   ├───pricing
│   │   ├───_components
│   │   └───_constants
│   ├───profile
│   │   └───_components
│   └───snippets
│       ├───pen
│       │   └───[id]
│       │       └───_components
│       ├───[id]
│       │   └───_components
│       └───_components
├───components
│   └───providers
├───store
└───types
```

## 🛠️ Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Create a Pull Request

## 📜 License
[MIT License](LICENSE)

## 🙌 Acknowledgments
- Built with ❤️ using Next.js & Convex DB

