import { useState, useEffect } from 'react'
import Card from './components/Card';
import AddBlog from './components/AddBlog';
import Footer from './components/Footer';
import axios from 'axios'

function App() {
  const urlBase = 'http://localhost:3000/posts'
  const [article, setArticle] = useState([])
  let published = [];

  useEffect(() => {
    axios.get(urlBase)
      .then((res) => {
        setArticle(res.data.filter((art) => art.published === true));
      }).catch((err) => console.error(err))
  }, [])
  console.log(article)

  function addArticle(newPost) {
    setArticle([...article, newPost]);
    console.log(article)
  }

  function deleteArticle(postId) {
    setArticle(article.filter((el) => el.id !== postId));
  }

  return (
    <>
      <header>
        <h1>Il mio blog</h1>
      </header>
      <main className='container'>
        {article.map((post) => (
          <Card key={post.id} title={post.title} deleteArt={() => deleteArticle(post.id)} content={post.content} image={post.image || '../img/placeholder.jpg'} tags={post.tags} />
        ))}
        <AddBlog onSubmit={(post) => addArticle(post)} />
      </main>
      <Footer />
    </>
  )
}

export default App
