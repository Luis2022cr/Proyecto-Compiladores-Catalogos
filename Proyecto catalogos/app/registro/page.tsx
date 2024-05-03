
import CrearUsuario from "../catalogo/auth/crearUsuario";
import Nav from "../diseño/dashboard/nav";


export default async function RegistroPage() {
    return(      
        <div>
            <Nav />
            <CrearUsuario />
        </div>
    )   
}