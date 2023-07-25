export type FileToAws = "image" | "video";

export interface IAWSRepository {
  uploadImage(file: any): Promise<string>;
}
export interface IAWSService {
  upload(file: any, fileType: FileToAws): Promise<string>;
}

// falta obtener las imagenes de aws (que se busca por imgUrl en la db)
// y agregar el modelo de comentarios con sus respectivos servicios y repositorios.

// Luego empezar con svelte en el front
