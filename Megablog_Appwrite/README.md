# BlogVerse (Megablog_Appwrite)

    npm install
    npm run dev

## Appwrite setup (one time)
Collection `articles` needs these attributes (all required strings):
title (255), content (100000+), featuredImage (255), status (20), userId (255).

Collection > Settings > Permissions: Any = Read, Users = Create; enable "Document security".
Storage bucket > Permissions: Any = Read, Users = Create/Update/Delete.
Console > Overview > Platforms: add a Web platform for `localhost` (and your deploy domain).
TinyMCE dashboard > Approved domains: add `localhost`.

## Show owner names on old posts (run once)
Appwrite Console > Overview > API Keys > create a key with scopes `users.read`, `documents.read`, `documents.write`, then:

    npm install
    APPWRITE_API_KEY=your_key npm run backfill-authors

Delete the key afterwards. New posts save the owner name automatically.

## Views setup
Create a collection with ID `views` (same database): required strings `postId` (255) and `userId` (255);
Indexes: key on `postId` and key on `userId`; Permissions: Users = Create, Read.
