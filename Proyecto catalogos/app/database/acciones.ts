'use server'
import { auth, signIn } from '../../auth';
import { executeQuery } from './conexionFirebird';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
const cloudinary = require('cloudinary').v2;
import * as nodemailer from 'nodemailer';

//configuracionn de Cloudunary para el manejo de imagenes
cloudinary.config({
  cloud_name: 'dxc3qadsk',
  api_key: '783854393448399',
  api_secret: 'DP-nz6IpqPZatXMgnsivon0Rj2k'
});

//AUTENTICACION LOG IN

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }
    throw error;
  }
}

//REGISTRO DE USUARIOS

export default async function CrearRegistro(formData: FormData) {
  const NOMBRE = formData.get('NOMBRE')?.toString();
  const APELLIDO = formData.get('APELLIDO')?.toString();
  const USERNAME = formData.get('USERNAME')?.toString();
  const EMAIL = formData.get('EMAIL')?.toString();
  const PASSWORD = formData.get('PASSWORD')?.toString();

  const file = formData.get('IMAGEN') as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  console.log('imagen subida: ', file)

  const imageUrl = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      tags: ['catalogos'],
      upload_preset: 'ml_default'
    }, function (error: any, result: any) {
      if (error) {
        reject(error);
        return;
      }
      // Si la carga es exitosa, se obtiene la URL de la imagen desde el resultado
      const imageUrl = result.secure_url;
      console.log('imagen cloud: ', imageUrl)
      resolve(imageUrl);
    })
      .end(buffer);
  });

  if (!imageUrl) {
    return {
      message: 'Failed to upload image to Cloudinary.',
    };
  }

  // Validar que todos los campos necesarios estén presentes
  if (!NOMBRE || !APELLIDO || !USERNAME || !EMAIL || !PASSWORD || !file) {
    console.error('Alguno de los campos requeridos no está presente en el formulario');
    return { error: 'Alguno de los campos requeridos no está presente en el formulario' };
  }

  try {
    // Verificar si el correo electrónico ya está registrado
    const existingUser = await getUserByEmail(EMAIL);
    if (existingUser) {
      console.error('El correo electrónico ya está registrado');
      return { error: 'El correo electrónico ya está registrado' };
    }

    // Hashear la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);

    // Insertar el nuevo usuario en la base de datos
    const query = `
      INSERT INTO USUARIOS (NOMBRE, APELLIDO, USERNAME, EMAIL, PASSWORD, TIPO_DE_USUARIO, IMAGEN)
      VALUES (?, ?, ?, ?, ?, 'cliente', ?);
    `;
    await executeQuery(query, [NOMBRE, APELLIDO, USERNAME, EMAIL, hashedPassword, imageUrl]);

    console.log('Usuario creado correctamente.');
  } catch (error) {
    console.error('Error en la creación de usuario:', error);
    return { error: 'Error en la creación de usuario. Por favor, inténtelo de nuevo más tarde.' };
  }

  revalidatePath('/login');
  redirect('/login');
}


// CREAR CATALOGO
export async function crearCatalogo(formData: FormData) {
  const NOMBRE = formData.get('NOMBRE');
  const DESCRIPCION = formData.get('DESCRIPCION');
  const CATEGORIAID = formData.get('CATEGORIA_ID');

  // Subir la imagen a Cloudinary
  const file = formData.get('IMAGEN') as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  console.log('imagen subida: ', file)

  const imageUrl = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      tags: ['catalogos'],
      upload_preset: 'ml_default'
    }, function (error: any, result: any) {
      if (error) {
        reject(error);
        return;
      }
      // Si la carga es exitosa, se obtiene la URL de la imagen desde el resultado
      const imageUrl = result.secure_url;
      console.log('imagen cloud: ', imageUrl)
      resolve(imageUrl);
    })
      .end(buffer);
  });

  if (!imageUrl) {
    return {
      message: 'Failed to upload image to Cloudinary.',
    };
  }
  
  if (!NOMBRE || !DESCRIPCION || !CATEGORIAID || !file) {
    console.error('Alguno de los campos requeridos no está presente en el formulario');
    return { error: 'Alguno de los campos requeridos no está presente en el formulario' };
  }
  
  // Insertar los datos en la base de datos
  const session = await auth();
  const userID = session?.user?.image;

  const query = `
    INSERT INTO CATALOGOS (USER_ID, CATEGORIA_ID, NOMBRE, DESCRIPCION, IMAGEN, FECHA_CREACION)
    VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP);
  `;

  try {
    await executeQuery(query, [userID, CATEGORIAID, NOMBRE, DESCRIPCION, imageUrl]);
    console.log('Catálogo creado correctamente.');
  } catch (error) {
    console.error('Error en la creación del catálogo:', error);
    return { error: 'Error en la creación del catálogo.' };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}


// BORRAR CATALOGOS
export async function borrarCatalogo(id: number) {
  const deleteProductsQuery = `
  DELETE FROM PRODUCTOS WHERE catalogo_id = ${id}
  `;
  const deleteCatalogQuery = `
  DELETE FROM CATALOGOS WHERE id = ${id}
  `;
  try {
    // Eliminar productos asociados al catálogo
    await executeQuery(deleteProductsQuery, []);

    // Eliminar el catálogo
    await executeQuery(deleteCatalogQuery, []);

    revalidatePath('/dashboard');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}


//UPDATE CATALOGOS
export async function actualizarCatalogoCatalogo(id: number, formData: FormData) {

  const NOMBRE = formData.get('NOMBRE');
  const DESCRIPCION = formData.get('DESCRIPCION');
  const CATEGORIAID = formData.get('CATEGORIA_ID');

  // Subir la imagen a Cloudinary
  const file = formData.get('IMAGEN') as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  console.log('imagen subida: ', file)

  const imageUrl = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      tags: ['catalogos'],
      upload_preset: 'ml_default'
    }, function (error: any, result: any) {
      if (error) {
        reject(error);
        return;
      }
      // Si la carga es exitosa, se obtiene la URL de la imagen desde el resultado
      const imageUrl = result.secure_url;
      console.log('imagen cloud: ', imageUrl)
      resolve(imageUrl);
    })
      .end(buffer);
  });

  if (!imageUrl) {
    return {
      message: 'Failed to upload image to Cloudinary.',
    };
  }
  
  if (!NOMBRE || !DESCRIPCION || !CATEGORIAID || !file) {
    console.error('Alguno de los campos requeridos no está presente en el formulario');
    return { error: 'Alguno de los campos requeridos no está presente en el formulario' };
  }

  const session = await auth()
  const userID = typeof session?.user?.image === 'string' ? parseInt(session?.user?.image, 10) : NaN;

  const query = `
      UPDATE CATALOGOS
      SET USER_ID= ?, CATEGORIA_ID= ?, NOMBRE= ?, DESCRIPCION= ?, IMAGEN= ?, FECHA_CREACION= CURRENT_TIMESTAMP
      WHERE ID=${id};
    `;

  try {
    await executeQuery(query, [userID, CATEGORIAID , NOMBRE, DESCRIPCION,  imageUrl]);

  } catch (error) {
    return {
      message: 'Database Error: Failed to Create catalogo.',
    };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}


// CREAR PRODUCTO


export async function crearProducto(catalogoId: number, formData: FormData){
  
  const NOMBRE = formData.get('NOMBRE');
  const DESCRIPCION = formData.get('DESCRIPCION');
  const PRECIO = formData.get('PRECIO');
  const COLOR = formData.get('COLOR');

   // Subir la imagen a Cloudinary
  const file = formData.get('IMAGEN') as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const imageUrl = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      tags: ['productos'],
      upload_preset: 'ml_default'
    }, function (error: any, result: any) {
      if (error) {
        reject(error);
        return;
      }
      const imageUrl = result.secure_url;
      resolve(imageUrl);
    })
      .end(buffer);
  });

  if (!imageUrl) {
    return {
      message: 'Failed to upload image to Cloudinary.',
    };
  }

  if (!NOMBRE || !DESCRIPCION || !PRECIO || !COLOR || !file) {
    console.error('Alguno de los campos requeridos no está presente en el formulario');
    return { error: 'Alguno de los campos requeridos no está presente en el formulario' };
  }


  const query = `
  INSERT INTO PRODUCTOS ( CATALOGO_ID, NOMBRE, DESCRIPCION, IMAGEN, PRECIO, COLOR)
  VALUES ( ?, ?, ?, ?, ?, ?);
  `;

  try {
    console.log('datos de producto: ', catalogoId, NOMBRE, DESCRIPCION, imageUrl, PRECIO, COLOR)
    await executeQuery(query, [catalogoId, NOMBRE, DESCRIPCION, imageUrl, PRECIO, COLOR]);

  } catch (error) {
    return {
      message: 'Database Error: Failed to Create product.',
    };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}


// BORRAR Prouductos
export async function borrarProducto(id: number) {
  const deleteProductoQuery = `
  DELETE FROM PRODUCTOS WHERE ID = ${id}
  `;
  try {
    // Eliminar productos asociados al catálogo
    await executeQuery(deleteProductoQuery, []);

    revalidatePath('/dashboard');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}


//UPDATE Productos
export async function actualizarProducto(id: number, formData: FormData) {

  const NOMBRE = formData.get('NOMBRE');
  const DESCRIPCION = formData.get('DESCRIPCION');
  const PRECIO = formData.get('PRECIO');
  const COLOR = formData.get('COLOR');

   // Subir la imagen a Cloudinary
  const file = formData.get('IMAGEN') as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const imageUrl = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      tags: ['productos'],
      upload_preset: 'ml_default'
    }, function (error: any, result: any) {
      if (error) {
        reject(error);
        return;
      }
      const imageUrl = result.secure_url;
      resolve(imageUrl);
    })
      .end(buffer);
  });

  if (!imageUrl) {
    return {
      message: 'Failed to upload image to Cloudinary.',
    };
  }

  if (!NOMBRE || !DESCRIPCION || !PRECIO || !COLOR || !file) {
    console.error('Alguno de los campos requeridos no está presente en el formulario');
    return { error: 'Alguno de los campos requeridos no está presente en el formulario' };
  }

  const query = `
      UPDATE PRODUCTOS
      SET NOMBRE= ?, DESCRIPCION= ?, IMAGEN= ?, PRECIO= ?, COLOR= ?
      WHERE ID=${id};
    `;

  try {
    await executeQuery(query, [NOMBRE, DESCRIPCION, imageUrl, PRECIO, COLOR]);

  } catch (error) {
    return {
      message: 'Database Error: Failed to actualizar producto.',
    };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}



/// RECUPERAR CONTRASEñA ///

// Función para obtener un usuario por correo electrónico
async function getUserByEmail(email: string) {
  const query = 'SELECT * FROM Usuarios WHERE EMAIL = ?';
  const result = await executeQuery(query, [email]);
  return result.length ? result[0] : null;
}

// Función para generar un token único
function generateToken() {
  return Math.random().toString(36).substr(2); // Ejemplo simple, puedes usar librerías como `uuid` para generar tokens más seguros
}

// Función para guardar el token en la base de datos
async function saveTokenInDatabase(email: string, token: string) {
  const query = 'UPDATE Usuarios SET reset_token = ? WHERE EMAIL = ?';
  await executeQuery(query, [token, email]);
}

interface QueryResult {
  RESET_TOKEN: string;
}

async function getTokenFromDatabase(email: string) {
  try {
    const query = 'SELECT RESET_TOKEN FROM USUARIOS WHERE EMAIL = ?';

    const queryResult: QueryResult[] = await executeQuery(query, [email]);

    if (queryResult.length > 0) {
      return queryResult[0].RESET_TOKEN; // Devolver el token encontrado
    } else {
      throw new Error('Correo electrónico no encontrado en la base de datos');
    }
  } catch (error) {
    throw new Error('Error al obtener el token de la base de datos: ' + (error as Error).message);

  }
}


// Función para actualizar la contraseña del usuario en la base de datos
async function updateUserPassword(email: string, newPassword: string) {
  try {
    // Hash de la nueva contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const query = 'UPDATE USUARIOS SET PASSWORD = ? WHERE EMAIL = ?';
    await executeQuery(query, [hashedPassword, email]);
  } catch (error) {
    throw new Error('Error al actualizar la contraseña en la base de datos: ' + (error as Error).message);
  }
}

async function sendPasswordResetEmail(email: string, token: string) {
  // Configurar el transportador de correo electrónico
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'josecon2731@gmail.com',
      pass: 'hiobvqrxgitbldjj'
    }
  });

  // Configurar el contenido del correo electrónico
  let mailOptions = {
    from: 'josecon2731@gmail.com',
    to: email,
    subject: 'Restablecimiento de contraseña',
    text: `Esta intentado restablecer su contraseña, este es el token de recuperacion= ${token} .por seguridad no lo comparta con nadie`
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });

}

// Ruta para recuperar contraseña
export async function recuperarPassword(formData: FormData) {
  console.log('data: ', formData)
  const emailField = formData.get('EMAIL');

  if (emailField === null) {
    console.error('El campo de correo electrónico no está presente en el formulario');
    return { error: 'El campo de correo electrónico no está presente en el formulario' };
  }

  const email = emailField.toString();

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      console.error('El correo electrónico no está registrado');
      return { error: 'El correo electrónico no está registrado' };
    }

    const token = generateToken(); // Genera un token único para la solicitud de recuperación de contraseña
    await saveTokenInDatabase(email, token); // Guarda el token en la base de datos 

    // Envía un correo electrónico al usuario con un enlace que contiene el token de recuperación de contraseña
    await sendPasswordResetEmail(email, token);

  } catch (error) {
    console.error('Error en la solicitud de recuperación de contraseña:', error);
    return { error: 'Error en la solicitud de recuperación de contraseña' };
  }

  revalidatePath('/resetPass/reset');
  redirect('/resetPass/reset');
}

// Ruta para restablecer la contraseña
export async function resetearPassword(formData: FormData) {
  console.log('datos: ', formData)
  const emailField = formData.get('EMAIL');
  const tokenField = formData.get('TOKEN');
  const passwordField = formData.get('PASSWORD');

  if (emailField === null || tokenField === null || passwordField === null) {
    // Manejar el caso en que algún campo esté ausente en el formulario
    console.error('Alguno de los campos requeridos no está presente en el formulario');
    return { error: 'Alguno de los campos requeridos no está presente en el formulario' };
  }

  const email = emailField.toString();
  const token = tokenField.toString();
  const newPassword = passwordField.toString();

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      console.error('El correo electrónico no está registrado');
      return { error: 'El correo electrónico no está registrado' };
    }

    const tokenFromDatabase = await getTokenFromDatabase(email);

    if (token !== tokenFromDatabase) {
      console.error('El token proporcionado no es válido');
      return { error: 'El token proporcionado no es válido' };
    }

    // Actualizar la contraseña del usuario en la base de datos
    await updateUserPassword(email, newPassword);

    console.log('Contraseña actualizada correctamente.');
  } catch (error) {
    console.error('Error en el restablecimiento de contraseña:', error);
    return { error: 'Error en el restablecimiento de contraseña, revise su correo o token y vuelva a intentarlo.' };
  }

  revalidatePath('/login');
  redirect('/login');
}
