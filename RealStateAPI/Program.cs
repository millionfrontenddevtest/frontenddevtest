using RealStateAPI.Configuration;
using RealStateAPI.Middleware;
using RealStateAPI.Repositories;
using RealStateAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Configuración de logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// Cargar configuración de MongoDB desde appsettings.json
var mongoDbSettings = new MongoDbSettings();
builder.Configuration.GetSection("MongoDbSettings").Bind(mongoDbSettings);
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));

// Registrar servicios de MongoDB
builder.Services.AddSingleton(mongoDbSettings);
builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddScoped<IPropertyRepository, PropertyRepository>();
builder.Services.AddScoped<IPropertyService, PropertyService>();

// Agregar controladores
builder.Services.AddControllers();

// Agregar Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Usar middleware de manejo de excepciones
app.UseMiddleware<ExceptionHandlingMiddleware>();

// Usar CORS
app.UseCors("AllowAll");

// Swagger en development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Real Estate API v1");
        c.RoutePrefix = string.Empty; // Hacer que Swagger esté en la raíz
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Endpoint de salud
app.MapGet("/health", () => new { status = "healthy", timestamp = DateTime.UtcNow })
    .WithName("Health");

app.Run();
