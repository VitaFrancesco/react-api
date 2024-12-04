import style from './Card.module.css';
// import ReactDOM from 'react-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Card(props) {
    return (
        <div className={style.card}>
            <div className={style.cardImg}>
                <img src={props.image ? props.image : '../img/placeholder.jpg'} alt="#" />
            </div>
            <div className={style.cardBody}>
                <h2>{props.title}</h2>
                <div className={style.tags}>
                    {
                        props.tags.map((tag, i) => <div key={i} className={style[tag]}>{tag}</div>)
                    }
                </div>
                <p>{props.content}</p>
                <button>Leggi di più</button>
            </div>
            <div className={style.delete} onClick={props.deleteArt}>
                {/* <FontAwesomeIcon icon="fa-solid fa-trash" /> */}
                -
            </div>
        </div>
    );
};