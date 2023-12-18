using System.Text.Json;
using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.Services;

namespace SearchService.Data;

public static class DatabaseInitializer
{
    public static async Task InitializeDatabase(WebApplication application)
    {
        await DB.InitAsync("SearchDb",
            MongoClientSettings
                .FromConnectionString(application.Configuration.GetConnectionString("MongoDbConnections")));
        await DB.Index<Item>()
            .Key(x => x.Artist, KeyType.Text)
            .Key(x => x.Name, KeyType.Text)
            .Key(x => x.Medium, KeyType.Text)
            .CreateAsync();

        using var scope = application.Services.CreateScope();
        Console.WriteLine("[NO_DATA]:::Will attempt to seed some data");
        var httpClient = scope.ServiceProvider.GetRequiredService<AuctionServiceHttpClient>();
        var items = await httpClient.GetItemsForSearchDb();
        Console.Write("LOG:::" + items.Count + " return from auction-svc");
        if (items.Count > 0) await DB.SaveAsync(items);
    }
}