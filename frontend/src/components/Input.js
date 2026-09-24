export default function Input({ type, text, change}) {
    return(
        <div>
            <h3>{text}</h3>
            <input type={type} placeholder={text} onChange={(e) => change(e.target.value)}></input>
        </div>
    )
}