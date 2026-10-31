# @BlogVerse

A modern blogging platform where people write, share and discover stories.
Built with **React + Vite**, **Appwrite** (auth, database, storage), **Redux Toolkit**, **Tailwind CSS** and **TinyMCE**.

> Write. Share. Discover.

---

## Features

- **Accounts:** sign up, log in, log out; the session survives a page refresh.
- **Members-only reading:** visitors who are logged out see a "Login to read posts" card.
- **Full CRUD:** write, read, edit and delete your own posts. Only the author sees Edit and Delete.
- **Rich editor:** TinyMCE with headings, lists, links, images and tables.
- **Story cards:** owner name and avatar on top, full cover image, preview text, posted date at the bottom.
- **Newest first:** the latest post always appears at the start of the grid (4 per row on desktop).
- **Views counter:** each logged-in user is counted once per post, with a "Viewed" badge for posts you have opened.
- **Search:** filter the feed by story title or author name.
- **My Posts:** your own stories with Published or Draft badges.
- **Responsive:** works on phones, tablets and desktops.

## Tech stack

| Area | Tool |
|---|---|
| UI | React 18, Vite, Tailwind CSS 3 |
| State | Redux Toolkit |
| Routing | React Router 6 |
| Forms | React Hook Form |
| Backend | Appwrite (Auth, Databases, Storage) |
| Editor | TinyMCE |

## Project structure

```
src/
  Appwrite/      auth.js (login, signup, logout)  config.js (posts, files, views)
  components/    Header, Footer, PostCard, PostForm, RTE, Avatar, Login, Signup ...
  conf/          conf.js (env values)  users.js (owner-name fallback list)
  pages/         Home, Login, Signup, AddPost, EditPost, MyPost, Post
  store/         Redux store and auth slice
scripts/
  backfill-authors.mjs   one-time owner-name fix for old posts
```

## Getting started

```bash
npm install
cp .env.example .env      # then fill in your values
npm run dev
```

Open http://localhost:5173.

### Environment variables

| Variable | What it is |
|---|---|
| `VITE_APPWRITE_URL` | Appwrite endpoint, e.g. `https://sgp.cloud.appwrite.io/v1` |
| `VITE_APPWRITE_PROJECT_ID` | Your project ID |
| `VITE_APPWRITE_DATABASE_ID` | Database that holds the tables below |
| `VITE_APPWRITE_COLLECTION_ID` | ID of the posts table (`articles`) |
| `VITE_APPWRITE_VIEWS_COLLECTION_ID` | ID of the views table (copy it from the Console; it is not always `views`) |
| `VITE_APPWRITE_BUCKET_ID` | Storage bucket for cover images |
| `VITE_TINYMCE_API_KEY` | TinyMCE key |

Restart `npm run dev` after any change to `.env`. Do not commit `.env`. Anything starting with `VITE_` is visible in the browser, so protect keys with domain restrictions, not secrecy.

---

## Appwrite setup (one time)

### 1. Posts table, ID `articles`

| Column | Type | Size | Required |
|---|---|---|---|
| `title` | string | 255 | yes |
| `content` | string | 100000 or more | yes |
| `featuredImage` | string | 255 | yes |
| `status` | string | 255 | yes |
| `userId` | string | 255 | yes |
| `ownerName` | string | 255 | no |

**Indexes (type Key):** `status` and `userId`. "My Posts" and the feed will fail without them.

**Permissions:** Any = Read, Users = Create. Turn on **row/document security** so only the author can update or delete a post.

### 2. Views table

Create a table in the same database with these columns, then copy its ID into `VITE_APPWRITE_VIEWS_COLLECTION_ID`.

| Column | Type | Size | Required |
|---|---|---|---|
| `postId` | string | 255 | yes |
| `userId` | string | 255 | yes |

**Indexes (type Key):** `postId` and `userId`.
**Permissions:** Users = Create, Read. Row security off.

### 3. Storage bucket

Permissions: Any = Read, Users = Create, Update, Delete.

### 4. Platforms and editor

- Console > Overview > Platforms: add a **Web** platform for `localhost` and your live domain.
- TinyMCE dashboard > Approved domains: add `localhost` and your live domain.

---

## Owner names on old posts

New posts save the author's registered name automatically. Posts made before the `ownerName` column existed can be fixed in two ways:

1. **Automatic:** when an author logs in and opens Home or My Posts, their old posts get their name saved.
2. **One-time script for everyone:** create an Appwrite API key with scopes `users.read`, `documents.read`, `documents.write`, then run:

   ```bash
   APPWRITE_API_KEY=your_key npm run backfill-authors            # Mac / Linux
   $env:APPWRITE_API_KEY="your_key"; npm run backfill-authors    # Windows PowerShell
   ```

   Delete the key afterwards.

`src/conf/users.js` also holds a fallback list of user IDs and names, used when a post has no saved name.

## How views work

Opening a post as a logged-in user adds one row to the views table (post ID plus user ID). A user is counted once per post, and an author's visits to their own posts are not counted. The card shows the number of rows for that post. Views are counted from the day the table was created; earlier visits were not recorded.

## Troubleshooting

| Problem | Fix |
|---|---|
| `Unknown attribute` when posting | A column from the table above is missing in `articles`. |
| My Posts is empty or errors | Add the Key index on `userId`. |
| Views stay at 0 | Check the views table ID in `.env`, restart the dev server, check Users = Create, Read, and test with a post written by someone else. Open the browser Console and look for lines starting with `[views]`. |
| CORS or "not allowed" errors | Add a Web platform for your hostname in Appwrite. |
| Editor does not load | Add your domain under TinyMCE Approved domains. |
| Long posts fail to save | Raise the size of `content`. |

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the build |
| `npm run backfill-authors` | One-time owner-name fix |

## Ideas for next

Likes, comments, tags and categories, author profile pages, drafts you can schedule.
