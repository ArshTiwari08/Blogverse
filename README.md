# ✍️ BlogVerse — Share Your Stories with the World

**BlogVerse** is a simple blogging platform where you can write, publish and read stories.

## 🌟 Features

- 🔐 Register and login
- 📝 Write and publish blogs with a rich text editor
- 🖼️ Featured image on every post
- 👤 Owner name shown on every post
- 👁️ View count for each post
- 🔎 Search posts by title or author
- 🆕 Newest posts appear first
- ✏️ Edit and delete your own posts
- 📱 Responsive design

## 🛠️ Tech Stack

React, Vite, Tailwind CSS, Redux Toolkit, React Router, Appwrite, TinyMCE

## 🚀 Getting Started

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Megablog_Appwrite
npm install
```

Create a `.env` file:

```env
VITE_APPWRITE_URL=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=articles
VITE_APPWRITE_VIEWS_COLLECTION_ID=your_views_table_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_TINYMCE_API_KEY=your_tinymce_key
```

Then start the app:

```bash
npm run dev
```

## ☁️ Appwrite Setup

- **Posts table `articles`:** title, content, featuredImage, status, userId, ownerName (all strings). Add key indexes on `status` and `userId`.
- **Views table:** postId, userId (strings). Add key indexes on both.
- **Storage bucket:** for the featured images.
- **Platform:** add a Web platform for `localhost`.

## 💡 My Vision

> Every story deserves a space, every idea deserves a voice, and every writer deserves an audience.

---

### 👨‍💻 Developed with ❤️ using React and Appwrite
