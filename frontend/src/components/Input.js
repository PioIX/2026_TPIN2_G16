export default function Input({ type, text, change}) {
    const cambio = (e) => {
        if (tipo === "file") {
            change(e.target.files[0]);
        } else {
            change(e.target.value);
        }
    }

    return(
        <div>
            <h3>{text}</h3>
            <input type={type} placeholder={text} onChange={cambio}></input>
        </div>
    )
}