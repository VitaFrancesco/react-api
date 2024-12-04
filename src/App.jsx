import { useState, useEffect } from 'react'
import Card from './components/Card';
import AddBlog from './components/AddBlog';
import Footer from './components/Footer';
import axios from 'axios'

function App() {
  const urlPosts = 'http://localhost:3000/posts'
  const urlBase = 'http://localhost:3000'
  const [article, setArticle] = useState([])
  let published = [];

  useEffect(() => {
    axios.get(urlPosts)
      .then((res) => {
        setArticle(res.data.filter((art) => art.published === true));
      }).catch((err) => console.error(err))
  }, [])
  console.log(article)

  function addArticle(newPost) {
    axios.post(urlPosts, newPost).then((res) => {
      setArticle(res.data.filter((art) => art.published === true));
    }).catch((err) => {
      console.error(err.message);
    })
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
          <Card key={post.id} title={post.title} deleteArt={() => deleteArticle(post.id)} content={post.content} image={`${urlBase}${post.image}`} tags={post.tags} />
        ))}
        <AddBlog onSubmit={(post) => addArticle(post)} />
      </main>
      <Footer />
    </>
  )
}

export default App
