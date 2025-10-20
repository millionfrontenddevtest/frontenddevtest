namespace RealStateAPI.DTOs
{
    /// <summary>
    /// Respuesta genérica estandarizada para la API
    /// </summary>
    /// <typeparam name="T">Tipo de datos en la respuesta</typeparam>
    public class ApiResponse<T>
    {
        /// <summary>
        /// Indica si la solicitud fue exitosa
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// Mensaje descriptivo de la respuesta
        /// </summary>
        public string Message { get; set; } = string.Empty;

        /// <summary>
        /// Datos de la respuesta
        /// </summary>
        public T? Data { get; set; }

        /// <summary>
        /// Detalles de errores (si los hay)
        /// </summary>
        public List<string>? Errors { get; set; }

        /// <summary>
        /// Constructor por defecto
        /// </summary>
        public ApiResponse() { }

        /// <summary>
        /// Constructor para respuesta exitosa
        /// </summary>
        public ApiResponse(bool success, string message, T? data = default)
        {
            Success = success;
            Message = message;
            Data = data;
        }

        /// <summary>
        /// Constructor para respuesta con errores
        /// </summary>
        public ApiResponse(bool success, string message, List<string> errors)
        {
            Success = success;
            Message = message;
            Errors = errors;
        }
    }
}
