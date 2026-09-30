"use client"

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return(
    <main>
      <h1>Pio Chat</h1>
      <br></br>
      <h3>¿Cómo prefiere iniciar sesion?</h3>
      <Button text={"Iniciar Sesion"} funcion={router.push("/login")}></Button>
      <Button text={"Registrarse"} funcion={router.push("/registro")}></Button>
    </main>
  )
}