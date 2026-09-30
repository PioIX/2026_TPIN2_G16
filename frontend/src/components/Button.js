export default function Button({ text, funcion }) {
    return(
        <button onClick={funcion}>{text}</button>
    )
}