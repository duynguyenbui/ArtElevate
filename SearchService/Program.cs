using SearchService.Core;
using SearchService.Data;
using SearchService.Services;

var builder = WebApplication.CreateBuilder(args);
// Add service to the container
builder.Services.AddControllers();
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddHttpClient<AuctionServiceHttpClient>();

// Construct application
var app = builder.Build();
app.MapControllers();
app.UseExceptionHandler();

try { await DatabaseInitializer.InitializeDatabase(app); }
catch (Exception e) { Console.WriteLine($"[DATABASE_SEEDING_FAILED] {e.Message}"); }
// Run application
app.Run();