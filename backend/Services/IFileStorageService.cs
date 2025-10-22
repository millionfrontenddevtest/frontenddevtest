namespace Backend.Services
{
    /// <summary>
    /// Servicio para gestionar el almacenamiento de archivos locales
    /// </summary>
    public interface IFileStorageService
    {
        /// <summary>
        /// Guarda un archivo y retorna la ruta relativa
        /// </summary>
        /// <param name="file">Archivo a guardar</param>
        /// <param name="folder">Carpeta de destino (properties/owners)</param>
        /// <returns>Ruta relativa del archivo guardado</returns>
        Task<string> SaveFileAsync(IFormFile file, string folder);

        /// <summary>
        /// Elimina un archivo del sistema
        /// </summary>
        /// <param name="filePath">Ruta relativa del archivo</param>
        Task<bool> DeleteFileAsync(string filePath);

        /// <summary>
        /// Verifica si un archivo existe
        /// </summary>
        /// <param name="filePath">Ruta relativa del archivo</param>
        bool FileExists(string filePath);

        /// <summary>
        /// Obtiene la ruta completa del archivo
        /// </summary>
        /// <param name="filePath">Ruta relativa del archivo</param>
        string GetFullPath(string filePath);
    }
}
