import { useState, useEffect } from 'react'
import Card from './components/Card';
import AddBlog from './components/AddBlog';
import ScrollPage from './components/ScrollPage';
import Footer from './components/Footer';
import axios from 'axios';

function App() {
  const urlPosts = 'http://localhost:3000/posts'
  const urlBase = 'http://localhost:3000'
  const [article, setArticle] = useState([])
  const [newArticle, setNewArticle] = useState(0)
  const [pages, setPages] = useState(1)
  const postForPage = 6;
  const [currentPage, setCurrentPage] = useState(0)

  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('')

  useEffect(() => {
    axios.get(`${urlPosts}/?limit=${postForPage}&skip=${currentPage * postForPage}`)
      .then((res) => {
        if (res.data.posts.length === 0) {
          if (currentPage) {
            setCurrentPage(currentPage - 1)
            setNewArticle(newArticle ? 0 : 1)
          }
        }
        setArticle(res.data.posts.filter((art) => art.published === true));
        if (res.data.length > 1) {
          if (res.data.length % postForPage === 0) {
            setPages(res.data.length / postForPage)
          } else {
            const rest = res.data.length % postForPage;
            const intPage = ((res.data.length - rest) / postForPage) + 1
            setPages(intPage)
          }
          console.log(res.data.length, currentPage)
        }
      }).catch((err) => console.error(err))
  }, [newArticle, currentPage])
  console.log(article)

  function addArticle(newPost) {
    setApiError(false)
    setApiErrorMessage('')
    axios.post(urlPosts, newPost).then((res) => {
      setNewArticle(newArticle ? 0 : 1)
    }).catch((err) => {
      console.error(err);
      setApiError(true)
      setApiErrorMessage(err.response.data.messages)
    })
  }

  function deleteArticle(postId) {
    axios.delete(`${urlPosts}/${postId}`).then(() => {
      console.log(`Eliminato il post con id ${postId}`)
      setNewArticle(newArticle ? 0 : 1)
    }).catch((err) => { console.error(err); })

    setArticle(article.filter((el) => el.id !== postId));
  }

  function changePage(i) {
    setCurrentPage(i)
  }

  return (
    <>
      <header>
        <h1>Il mio blog</h1>
      </header>
      <main className='container'>
        <div className="row blog">
          {article.map((post) => (
            <Card key={post.id} title={post.title} deleteArt={() => deleteArticle(post.id)} content={post.content} image={`${urlBase}${post.image}`} tags={post.tags} />
          ))}
        </div>
        <ScrollPage totPage={pages} onClick={(pag) => changePage(pag)} currentPage={currentPage} />
        <AddBlog onSubmit={(post) => addArticle(post)} />
        <div className={apiError ? 'error' : 'dNone'} >
          <p>{apiErrorMessage}</p>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
