
import { Catalogo, Categoria, Producto, Usuario } from "@/app/catalogo/interfaces/interfaces";
import { executeQuery } from "./conexionFirebird";
import { auth } from "@/auth";

// obtener datos de catalogos normal
export async function fetchCatalogo() {
  const query = `SELECT 
  CATALOGOS.ID,
  CATALOGOS.USER_ID,
    CATALOGOS.CATEGORIA_ID,
    CATALOGOS.NOMBRE,
    CATALOGOS.DESCRIPCION,
    CATALOGOS.IMAGEN,
    USUARIOS.NOMBRE AS USUARIO_NOMBRE,
    CATEGORIAS.NOMBRE AS CATEGORIA_NOMBRE
    FROM 
    CATALOGOS
    JOIN 
    USUARIOS ON CATALOGOS.USER_ID = USUARIOS.ID
    JOIN 
    CATEGORIAS ON CATALOGOS.CATEGORIA_ID = CATEGORIAS.ID;
    
    `;

  try {
    const data = await executeQuery<Catalogo>(query, []);
    return data;
  } catch (error) {
    console.error('Error al obtener los datos de catalogos:', error);
    throw Error('Failed to fetch catalogos data.');
  }
}

/* 
export async function fetch..() {
  const query = `
  `;
  
  try {
    const data = await executeQuery<Catalogo>(query, []);
    return data;
  } catch (error) {
    console.error('Error al obtener los datos de ingresos:', error);
    throw Error('Failed to fetch catalogos data.');
  }
}
*/

//Mostrar Catagorias
export async function fetchCategorias() {
  const query = `SELECT * FROM Categorias`;

  try {
    const data = await executeQuery<Categoria>(query, []);
    return data;
  } catch (error) {
    console.error('Error al obtener los datos de categorias:', error);
    throw Error('Failed to fetch categorias data.');
  }
}


//Mostrar catalogos por CATEGORIA_ID
export async function fetchCatalogoCatId(CATEGORIA_ID: number) {
  console.log("categoiraID:", CATEGORIA_ID)
  const query = `SELECT 
    CATALOGOS.ID,
    CATALOGOS.USER_ID ,
    CATALOGOS.CATEGORIA_ID ,
    CATALOGOS.NOMBRE,
    CATALOGOS.DESCRIPCION,
    CATALOGOS.IMAGEN,
    USUARIOS.NOMBRE AS USUARIO_NOMBRE,
    CATEGORIAS.NOMBRE AS CATEGORIA_NOMBRE
    FROM 
    CATALOGOS
    JOIN 
    USUARIOS ON CATALOGOS.USER_ID = USUARIOS.ID
    JOIN 
    CATEGORIAS ON CATALOGOS.CATEGORIA_ID = CATEGORIAS.ID
    WHERE
    CATALOGOS.CATEGORIA_ID = ${CATEGORIA_ID};
  `;

  try {
    const data = await executeQuery<Catalogo>(query, []);
    return data;
  } catch (error) {
    console.error('Error al obtener los datos de categorias:', error);
    throw Error('Failed to fetch catalogos x categoriaID data.');
  }
}

//Mostrar catalogos por CATALOGO_ID
export async function fetchCatalogoCatalogoId(CATALOGO_ID: number): Promise<Catalogo | undefined> {
  
  console.log("catalogoID:", CATALOGO_ID)
  const query = `SELECT 
    CATALOGOS.ID,
    CATALOGOS.USER_ID ,
    CATALOGOS.CATEGORIA_ID ,
    CATALOGOS.NOMBRE,
    CATALOGOS.DESCRIPCION,
    CATALOGOS.IMAGEN,
    USUARIOS.NOMBRE AS USUARIO_NOMBRE,
    CATEGORIAS.NOMBRE AS CATEGORIA_NOMBRE
    FROM 
    CATALOGOS
    JOIN 
    USUARIOS ON CATALOGOS.USER_ID = USUARIOS.ID
    JOIN 
    CATEGORIAS ON CATALOGOS.CATEGORIA_ID = CATEGORIAS.ID
    WHERE
    CATALOGOS.ID = ${CATALOGO_ID};
  `;

  try {
    const data = await executeQuery<Catalogo>(query, []);
    // Si hay algún resultado, devuelve el primer elemento del array, si no, devuelve undefined
    return data.length > 0 ? data[0] : undefined;
  } catch (error) {
    console.error('Error al obtener los datos de categorias:', error);
    throw Error('Failed to fetch catalogos x categoriaID data.');
  }
}


//Mostrar catalgos por User_ID
export async function fetchCatalogoPorUserId() {
  const session = await auth()
  const id = typeof session?.user?.image === 'string' ? parseInt(session?.user?.image, 10) : NaN;

  const query = `
    SELECT 
      CATALOGOS.ID,
      CATALOGOS.USER_ID,
      CATALOGOS.CATEGORIA_ID,
      CATALOGOS.NOMBRE,
      CATALOGOS.DESCRIPCION,
      CATALOGOS.IMAGEN,
      USUARIOS.NOMBRE AS USUARIO_NOMBRE,
      CATEGORIAS.NOMBRE AS CATEGORIA_NOMBRE
    FROM 
      CATALOGOS
    JOIN 
      USUARIOS ON CATALOGOS.USER_ID = USUARIOS.ID
    JOIN 
      CATEGORIAS ON CATALOGOS.CATEGORIA_ID = CATEGORIAS.ID
    WHERE
      CATALOGOS.USER_ID = ${id};
  `;

  try {
    const data = await executeQuery<Catalogo>(query, []);
    return data;
  } catch (error) {
    console.error('Error al obtener los datos de catálogos:', error);
    throw Error('Failed to fetch catalogos by userID data.');
  }
}

//OBTENER LOS PRODUCTOS POR CATALOGO_ID

export async function fetchProductos(CATALOGO_ID: number) {
  const query = `SELECT * FROM Productos WHERE CATALOGO_ID = ${CATALOGO_ID}`;

  try {
    const data = await executeQuery<Producto>(query, []);
    return data;
  } catch (error) {
    console.error('Error al obtener los datos de productos:', error);
    throw Error('Failed to fetch productos data.');
  }
}

//obtener producto por id
export async function fetchProductoId(id: number): Promise<Producto | undefined> {
  const query = `SELECT * FROM Productos WHERE ID = ${id}`;

  try {
    const data = await executeQuery<Producto>(query, []);
    return data.length > 0 ? data[0] : undefined;
  } catch (error) {
    console.error('Error al obtener los datos de productos:', error);
    throw Error('Failed to fetch productos data.');
  }
}


//OBTENER USUARIOS
export async function fetchUsuarios() {
  const query = `SELECT * FROM Usuarios`;

  try {
    const data = await executeQuery<Usuario>(query, []);
    return data;
  } catch (error) {
    console.error('Error al obtener los datos de usuarios:', error);
    throw Error('Failed to fetch Usuarios data.');
  }
}

//OBTENER USUARIO POR ID (PERFIL DEL USUARIO LOGEADO)
export async function fetchUsuarioPorId() {
  const session = await auth()
  const id = typeof session?.user?.image === 'string' ? parseInt(session?.user?.image, 10) : NaN;

  const query = `
      SELECT U.ID, U.NOMBRE, U.APELLIDO, U.EMAIL, U.USERNAME, U.TIPO_DE_USUARIO, U.IMAGEN, 
      COUNT(DISTINCT C.ID) AS TOTALCATALOGOS,
      COUNT(P.ID) AS TOTALPRODUCTOS
    FROM USUARIOS U
    LEFT JOIN CATALOGOS C ON U.ID = C.USER_ID
    LEFT JOIN PRODUCTOS P ON C.ID = P.CATALOGO_ID
    WHERE U.ID = ${id}
    GROUP BY U.ID, U.NOMBRE, U.APELLIDO, U.EMAIL, U.USERNAME, U.TIPO_DE_USUARIO, U.IMAGEN;
  `;

  try {
    const data = await executeQuery<Usuario>(query, []);
    return data[0];
  } catch (error) {
    console.error('Error al obtener el usuario por ID:', error);
    throw Error('Failed to fetch Usuario by ID.');
  }
}
