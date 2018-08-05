

export default (posts, { topic, text, sortBy, uid }) => {
  return posts.filter((post) => {
    const textMatch =
      post.note.toLowerCase().includes(text.toLowerCase()) ||
      post.title.toLowerCase().includes(text.toLowerCase())
    
    const filterByTopic = topic === '' ? post : post.topic === topic
    const filterByUid = uid === '' ? post: post.uid === uid
    
    return textMatch && filterByTopic && filterByUid
  }).sort((a, b) => {
    if (sortBy === 'new') {
      return a.createdAt < b.createdAt ? -1 : 1;
    } else if (sortBy === 'top') {
      return a.emojis.length < b.emojis.length ? 1 : -1;
    }
  })
}

