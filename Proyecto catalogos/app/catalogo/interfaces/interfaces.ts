// Define el tipo de datos para los ingresos
export type Catalogo = {
    ID: number;
    USER_ID: number;
    CATEGORIA_ID: number;
    NOMBRE: string;
    DESCRIPCION: string;
    IMAGEN: string;
    USUARIO_NOMBRE: string;
    CATEGORIA_NOMBRE: string;
  };

  export type Categoria = {
    ID: number;
    NOMBRE: string;
    DESCRIPCION: string;
    IMAGEN: string;
  };

  export type Usuario = {
    ID: number;
    NOMBRE: string;
    APELLIDO: string;
    USERNAME: string;
    EMAIL: string;
    TIPO_DE_USUARIO: string;
    PASSWORD: string;
    IMAGEN: string;
    TOTALCATALOGOS: number;
    TOTALPRODUCTOS: number;
  };

  export type Producto = {
    ID: number;
    CATALOGO_ID: number;
    NOMBRE: string;
    COLOR: string;
    DESCRIPCION: string;
    IMAGEN: string;
    PRECIO: number;
  };