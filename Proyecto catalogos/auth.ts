import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { Usuario } from './app/catalogo/interfaces/interfaces';
import { executeQuery } from './app/database/conexionFirebird';
 
async function getUser(email: string): Promise<Usuario | undefined> {
  const query = 'SELECT * FROM USUARIOS WHERE EMAIL = ?';
  
  try {
    console.log('Consultando la base de datos para obtener el usuario con el correo electrónico:', email);
      const data = await executeQuery<Usuario>(query, [email]);
      console.log('Datos del usuario obtenidos de la base de datos:', data);
      
      return data[0];
      
  } catch (error) {
      console.error('Error al obtener los datos de usuarios:', error);
      throw Error('Error al obtener datos de Usuarios.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.PASSWORD);

          if (passwordsMatch) {
            // Return a User object with required properties
            return {
              id: String(user.ID),
              name: `${user.NOMBRE} ${user.APELLIDO}`,
              email: user.EMAIL,
              image: String(user.ID),
              tipo_usuario: user.ID,
              // Add any other required properties
            } as User;
          }
        }
        
        return null;
        
      },
    }),
  ],
});


