export default function Button({ text, funcion }) {
    return(
        <>
            {funcion ? (
                <button onClick={funcion}>{text}</button>
            ) : (
                <button>{text}</button>
            )}
        </>
    )
}