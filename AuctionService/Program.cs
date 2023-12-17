using AuctionService.ErrorHandler;
using AuctionService.Data;
using Microsoft.EntityFrameworkCore;

// Create builder 
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();
builder.Services.AddDbContext<AuctionDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Construct application
var app = builder.Build();

// Configure middlewares
app.MapGet("/", () => "Hello World!");
app.MapControllers();
// Global Handler Error
app.UseExceptionHandler();

// Seed Database
try { await DbInitializer.InitDatabase(app); }
catch (Exception e) { Console.WriteLine($"[SEED_DATABASE_ERROR] {e.Message}"); }

// Run application
app.Run();
