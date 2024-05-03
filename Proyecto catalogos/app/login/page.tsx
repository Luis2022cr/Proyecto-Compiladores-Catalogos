import { Metadata } from "next";
import MostrarLogin from "../catalogo/auth/MostrarLogin";
import Nav from "../diseño/dashboard/nav";

export const metadata: Metadata = {
  title: "ShopSelect - Login",
  description: "pagina de inicio",
};

export default function LoginPage() {
    return (
      <main >
        <div>
        <Nav/>
          <MostrarLogin />
        </div>
      </main>
    );
}