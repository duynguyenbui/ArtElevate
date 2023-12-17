using AuctionService.Data;
using Microsoft.EntityFrameworkCore;

// Create builder 
var builder = WebApplication.CreateBuilder(args);

// Ad services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AuctionDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure middlewares
app.MapGet("/", () => "Hello World!");
app.MapControllers();

// Seed Database
try
{
    await DbInitializer.InitDatabase(app);
}
catch (Exception e)
{
    Console.WriteLine($"[SEED_DATABASE_ERROR] {e.Message}");
}

// Run application
app.Run();