export default function Mensaje({ nombre, texto, color, posicion }) {
    return (
        <div>
            <p style={{ fontWeight: 'bold' }}>{nombre}</p>
            <p style={{ backgroundColor: color, textAlign: posicion, padding: '10px', marginTop: '5px' }}>{texto}</p>
        </div>
    )
}