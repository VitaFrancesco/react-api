import { useState } from 'react'
import Card from './components/Card';
import AddBlog from './components/AddBlog';
import Footer from './components/Footer';
import { posts } from './data/posts';

function App() {
  const [article, setArticle] = useState(posts)
  let lastId = 5 + 1;

  function addArticle(newPost) {
    setArticle([...article, newPost]);
    console.log(article)
  }

  function deleteArticle(postId) {
    setArticle(article.filter((el) => el.id !== postId));
  }

  let published = article.filter((post) => post.published === true)
  return (
    <>
      <header>
        <h1>Il mio blog</h1>
      </header>
      <main className='container'>
        {published.map((post) => (
          <Card key={post.id} title={post.title} deleteArt={() => deleteArticle(post.id)} content={post.content} image={post.image || '../img/placeholder.jpg'} tags={post.tags} />
        ))}
        <AddBlog onSubmit={(post) => addArticle(post)} />
      </main>
      <Footer />
    </>
  )
}

export default App
