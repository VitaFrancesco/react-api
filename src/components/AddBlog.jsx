import { useState, useEffect } from 'react'
import style from './AddBlog.module.css'

export default function AddBlog({ onSubmit }) {
    const initialPost = {
        title: '',
        content: '',
        image: "",
        tags: [],
        published: true
    }

    const [post, setPost] = useState(initialPost)
    const [rendering, setRendering] = useState(1)


    function articleSubmit(e, f) {
        e.preventDefault();
        if (post.title === '') return
        const newPost = {
            ...post,
        }
        setPost(initialPost)
        f(newPost);
    }

    function onChange(e) {

        const elem = e.target;
        let value;
        if (elem.type === 'checkbox') {
            value = elem.checked;
        } if (elem.type === 'radio') {
            value = JSON.parse(elem.value);
        } else {
            value = elem.value;
        }

        setPost({
            ...post,
            [elem.name]: value
        })
        console.log(post)
    }

    function manageTags(tag) {
        setPost({
            ...post,
            tags: post.tags.includes(tag)
                ? post.tags.filter(t => t !== tag)
                : [...post.tags, tag]
        });
    }

    // useEffect(() => {
    //     rendering ? setRendering(0) :
    //         alert(`Stai creando un post ${post.published ? 'publico' : 'privato'}`)
    // }, [post.published])


    return (
        <div className='container'>
            <form className='form' onSubmit={(event) => articleSubmit(event, onSubmit)}>
                <input type="text" name='title' onChange={(e) => onChange(e)} value={post.title} placeholder={`Titolo dell'articolo`} />
                <select name="image" value={post.image} onChange={(e) => onChange(e)}>
                    <option value="">Nessuna immagine</option>
                    <option value="/img/post2.jpg">Koeniggseg</option>
                    <option value="/img/post4.jpg">Panorama</option>
                    <option value="/img/post3.jpg">Romani</option>
                </select>
                <label htmlFor="select-image">Seleziona l'immagine</label>
                <textarea name='content' className={style.textarea} placeholder='Scrivi il contenuto del post qui...' onChange={(e) => onChange(e)} value={post.content} ></textarea>
                <div className={style.dFlex}>
                    <div className={style.tags}>
                        <div>
                            <input type="checkbox" id='html' checked={post.tags.includes('html')} name='html' onChange={(e) => manageTags(e.target.name)} />
                            <label htmlFor="html">html</label>
                        </div>
                        <div>
                            <input type="checkbox" id='css' checked={post.tags.includes('css')} name='css' onChange={(e) => manageTags(e.target.name)} />
                            <label htmlFor="css">css</label>
                        </div>
                        <div>
                            <input type="checkbox" id='js' checked={post.tags.includes('js')} name='js' onChange={(e) => manageTags(e.target.name)} />
                            <label htmlFor="js">js</label>
                        </div>
                        <div>
                            <input type="checkbox" id='php' checked={post.tags.includes('php')} name='php' onChange={(e) => manageTags(e.target.name)} />
                            <label htmlFor="php">php</label>
                        </div>
                    </div>
                    <div>
                        <input type="radio" id="published-true" name="published" value={true} checked={post.published} onChange={(e) => onChange(e)} />
                        <label htmlFor="published-true">Pubblico</label>
                    </div>
                    <div>
                        <input type="radio" id="published-false" name="published" value={false} checked={!post.published} onChange={(e) => onChange(e)} />
                        <label htmlFor="published-false">Privato</label>
                    </div>
                    <button type='submit'>Aggiungi</button>
                </div>
            </form>
        </div>
    )
}