using System.Text.Json.Serialization;
using AuctionService.Core;
using AuctionService.Data;
using AuctionService.Services;
using AuctionService.Services.Implements;
using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore;

// Create builder 
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();
builder.Services.AddDbContext<AuctionDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
// Custom services
builder.Services.AddScoped<IImageService<ImageUploadResult, DeletionResult>, CloudinaryService>();

// Construct application
var app = builder.Build();

// Configure middlewares
app.MapControllers();
// Global Handler Error
app.UseExceptionHandler();

// Seed Database
try { await DbInitializer.InitDatabase(app); }
catch (Exception e) { Console.WriteLine($"[SEED_DATABASE_ERROR] {e.Message}"); }

// Run application
app.Run();