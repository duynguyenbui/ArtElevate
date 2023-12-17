// Create builder 
var builder = WebApplication.CreateBuilder(args);

// Ad services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// Configure middlewares
app.MapGet("/", () => "Hello World!");
app.MapControllers();

// Run application
app.Run();