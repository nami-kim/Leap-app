

export default (posts, { topic, text, sortBy, uid }) => {
  return posts.filter((post) => {
    const filterByTopic = post.topic === topic
    const filterByUid = post.uid === uid
    const textMatch =
      post.note.toLowerCase().includes(text.toLowerCase()) ||
      post.title.toLowerCase().includes(text.toLowerCase())

    return filterByUid && filterByTopic && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'new') {
      return a.createdAt < b.createdAt ? -1 : 1;
    } else if (sortBy === 'top') {
      return a.emojis.length < b.emojis.length ? 1 : -1;
    }
  })
}