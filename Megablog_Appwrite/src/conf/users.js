// Names from Appwrite Console > Auth > Users (User ID -> name).
// Used when a post has no saved ownerName yet. Add a line for any other user you want covered.
export const knownUsers = {
  '6ab4f6c20008bd18b600': 'Manoj Thakur',
  '6ab4a4bb001ab908e32f': 'Vishva',
  '6aad32d70016c196325f': 'HC Varma',
  '6aad2ea40004d2cc978d': 'Prof. Firoza Mirza',
  '6aaa418a0001b50d1315': 'Pratik',
  '6aaa3dab001ed52f13cc': 'Aditya',
  '6aaa36770018b4fce856': 'Ankush',
}

// Owner name for a post: saved ownerName first, then the Auth list above.
export const getOwnerName = (post) =>
  post?.ownerName || knownUsers[post?.userId] || 'BlogVerse writer'
