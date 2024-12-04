import style from './ScrollPage.module.css'

export default function ScrollPage({ totPage, onClick, currentPage }) {
    let pageMover = new Array(totPage).fill(0)

    if (totPage < 7) {
        return <>
            <div className={totPage > 1 ? style.allPages : 'dNone'}>
                {pageMover.map((el, i) => <div key={i} className={currentPage === i ? style.active : style.tag} onClick={() => onClick(i)}>{i + 1}</div>)}
            </div>
        </>
    } else if (currentPage < 3) {
        return <>
            <div className={style.allPages}>
                {pageMover.map((el, i) => <div key={i} className={currentPage === i ?
                    style.active :
                    currentPage + 1 === i || i < 3 || i === 0 ?
                        style.tag :
                        'dNone'} onClick={() => onClick(i)}>{i + 1}</div>)}
                <div>...</div>
                <div className={style.tag} onClick={() => onClick(totPage - 1)}>{totPage}</div>
            </div>
        </>
    } else if (currentPage > totPage - 4) {
        return <>
            <div className={style.allPages}>
                <div className={style.tag} onClick={() => onClick(0)}>{1}</div>
                <div>...</div>
                {pageMover.map((el, i) => <div key={i} className={currentPage === i ?
                    style.active :
                    i > totPage - 4 || currentPage - 1 === i || i === totPage - 1 ?
                        style.tag :
                        'dNone'} onClick={() => onClick(i)}>{i + 1}</div>)}
            </div>
        </>
    } else {
        return <>
            <div className={style.allPages}>
                <div className={style.tag} onClick={() => onClick(0)}>{1}</div>
                <div>...</div>
                {pageMover.map((el, i) => <div key={i} className={currentPage === i ?
                    style.active :
                    currentPage + 1 === i || currentPage - 1 === i ?
                        style.tag :
                        'dNone'} onClick={() => onClick(i)}>{i + 1}</div>)}
                <div>...</div>
                <div className={style.tag} onClick={() => onClick(totPage - 1)}>{totPage}</div>
            </div>
        </>
    }
}