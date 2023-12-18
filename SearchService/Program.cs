using System.Net;
using Polly;
using Polly.Extensions.Http;
using SearchService.Core;
using SearchService.Data;
using SearchService.Services;

var builder = WebApplication.CreateBuilder(args);
// Add service to the container
builder.Services.AddControllers();
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddHttpClient<AuctionServiceHttpClient>()
    .AddPolicyHandler(GetPolicy());

// Construct application
var app = builder.Build();
app.MapControllers();
app.UseExceptionHandler();

app.Lifetime.ApplicationStarted.Register(async () =>
{
    try { await DatabaseInitializer.InitializeDatabase(app); }
    catch (Exception e) { Console.WriteLine($"[DATABASE_SEEDING_FAILED] {e.Message}"); }
});


// Run application
app.Run();

static IAsyncPolicy<HttpResponseMessage> GetPolicy()
    => HttpPolicyExtensions
        .HandleTransientHttpError()
        .OrResult(msg => msg.StatusCode == HttpStatusCode.NotFound)
        .WaitAndRetryForeverAsync(_ => TimeSpan.FromSeconds(3));