using AuctionService.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Data;

public class DbInitializer
{
    public static async Task InitDatabase(WebApplication application)
    {
        using var scope = application.Services.CreateScope();
        await SeedData(scope.ServiceProvider.GetRequiredService<AuctionDbContext>());
    }

    private static async Task SeedData(AuctionDbContext context)
    {
        await context.Database.MigrateAsync();

        if (context.Auctions.Any())
        {
            Console.WriteLine("Database in already initialized");
            return;
        }

        var auctions = new List<Auction>
        {
            // 1. Mona Lisa
            new()
            {
                Id = Guid.Parse("afbee524-5972-4075-8800-7d1f9d7b0a0c"),
                Status = Status.Live,
                ReservePrice = 20000,
                Seller = "bob",
                AuctionEnd = DateTime.UtcNow.AddDays(10),
                Item = new Item
                {
                    Artist = "Leonardo da Vinci",
                    Name = "Mona Lisa",
                    Description =
                        "\"Mona Lisa\" by Leonardo da Vinci, known for its enigmatic smile, is showcased at the Louvre Museum in Paris.",
                    Height = "30 inches",
                    Width = "20 inches",
                    Medium = "Oil on canvas",
                    Year = 1506,
                    ImageUrl = new[]
                    {
                        "https://res.cloudinary.com/dsceyl414/image/upload/v1702803770/cmjq2kgom57sn7kwgfhm.jpg",
                        "https://res.cloudinary.com/dsceyl414/image/upload/v1702803770/skjhtwvbcvja0qospmiz.jpg",
                        "https://res.cloudinary.com/dsceyl414/image/upload/v1702803770/qc7na9bue65ftpsuao8m.jpg",
                        "https://res.cloudinary.com/dsceyl414/image/upload/v1702803770/ryetfnym1uqs75fnwqii.jpg"
                    }
                }
            },

            // 2. Starry Night
            new()
            {
                Id = Guid.Parse("c8c3ec17-01bf-49db-82aa-1ef80b833a9f"),
                Status = Status.Live,
                ReservePrice = 30000,
                Seller = "alice",
                AuctionEnd = DateTime.UtcNow.AddDays(15),
                Item = new Item
                {
                    Artist = "Vincent van Gogh",
                    Name = "Starry Night",
                    Description =
                        "\"Starry Night\" by Vincent van Gogh, renowned for its vibrant colors, is a masterpiece in art history.",
                    Height = "24 inches",
                    Width = "36 inches",
                    Medium = "Oil on canvas",
                    Year = 1889,
                    ImageUrl = new[]
                    {
                        "https://res.cloudinary.com/dsceyl414/image/upload/v1702803970/oijo6dqzqo5txf5fbupx.jpg",
                        "https://res.cloudinary.com/dsceyl414/image/upload/v1702803970/rvwwgmmaojkjj2slbt4l.jpg",
                        "https://res.cloudinary.com/dsceyl414/image/upload/v1702803970/lvjjrcstimo7repnptbw.jpg",
                        "https://res.cloudinary.com/dsceyl414/image/upload/v1702803970/t3npkhw8cn0en8jzaarn.jpg"
                    }
                }
            },
            // 3. Guernica
            new()
            {
                Id = Guid.Parse("155225c1-4448-4066-9886-6786536e05ea"),
                Status = Status.Live,
                ReservePrice = 50000,
                Seller = "alice",
                AuctionEnd = DateTime.UtcNow.AddDays(25),
                Item = new Item
                {
                    Artist = "Pablo Picasso",
                    Name = "Guernica",
                    Description =
                        "\"Guernica\" by Pablo Picasso is a powerful anti-war painting depicting the horrors of the Spanish Civil War.",
                    Height = "11 feet",
                    Width = "25.6 feet",
                    Medium = "Oil on canvas",
                    Year = 1937,
                    ImageUrl = new[]
                    {
                        "https://res.cloudinary.com/dsceyl414/image/upload/v1702803915/uciv4jjcyinm2tx8mgyv.jpg",
                        "https://res.cloudinary.com/dsceyl414/image/upload/v1702803914/qv6bsrl917mkxf9beiq3.jpg",
                        "https://res.cloudinary.com/dsceyl414/image/upload/v1702803915/nbkadvjemn2gttyxd5pv.jpg",
                        "https://res.cloudinary.com/dsceyl414/image/upload/v1702803915/kfqovhznmuokhu2s9cnd.jpg"
                    }
                }
            },

            // 4. The Starry Night
            new()
            {
                Id = Guid.Parse("466e4744-4dc5-4987-aae0-b621acfc5e39"),
                Status = Status.Live,
                ReservePrice = 25000,
                Seller = "bob",
                AuctionEnd = DateTime.UtcNow.AddDays(1),
                Item = new Item
                {
                    Artist = "Edvard Munch",
                    Name = "The Scream",
                    Description =
                        "\"The Scream\" by Edvard Munch is an iconic expressionist painting depicting existential angst.",
                    Height = "36 inches",
                    Width = "28 inches",
                    Medium = "Oil on canvas",
                    Year = 1893,
                    ImageUrl = new[]
                    {
                        "https://res.cloudinary.com/dsceyl414/image/upload/v1702804058/ojche6blcx2b4wukdfq8.jpg",
                        "https://res.cloudinary.com/dsceyl414/image/upload/v1702804058/md9ioxhtdtyxb91ez4to.jpg",
                        "https://res.cloudinary.com/dsceyl414/image/upload/v1702804058/imexbowcwxnmfel55gi1.jpg",
                        "https://res.cloudinary.com/dsceyl414/image/upload/v1702804058/kwsct5cltazftanvtvxv.jpg"
                    }
                }
            },
        };

        await context.AddRangeAsync(auctions);
        await context.SaveChangesAsync();
    }
}