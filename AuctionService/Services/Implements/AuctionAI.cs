using AuctionService.Data;
using Microsoft.EntityFrameworkCore;
using OpenAI.Net;

namespace AuctionService.Services.Implements;

public class AuctionAI : IAuctionAI
{
    private readonly AuctionDbContext _context;
    private readonly IOpenAIService _openAiService;

    public AuctionAI(AuctionDbContext context, IOpenAIService openAiService)
    {
        _context = context;
        _openAiService = openAiService;
    }

    public async Task<string> GetPredictPriceAuction(Guid auctionId)
    {
        var auction = await _context.Auctions.Include(x => x.Item).SingleOrDefaultAsync(x => x.Id == auctionId);

        if (auction is null) return "Auction not found.";

        var messages = new List<Message>
        {
            Message.Create(ChatRoleType.System, "Welcome to the auction price prediction assistant."),
            Message.Create(ChatRoleType.User, "What do you want to predict the price for?"),
            Message.Create(ChatRoleType.Assistant,
                "Please provide details about the product you want to predict the price for."),
            Message.Create(ChatRoleType.User, "I want to predict the price actual for a auction."),
            Message.Create(ChatRoleType.Assistant, "Great! Please provide information about the auction."),
            Message.Create(ChatRoleType.User, $"This is information about the auction: \n" +
                                              $"- Name: {auction.Item.Name}\n" +
                                              $"- Description: {auction.Item.Description}\n" +
                                              $"- Reserve Price: {auction.ReservePrice}\n" +
                                              $"- Year: {auction.Item.Year}\n" +
                                              $"- Height: {auction.Item.Height}\n" +
                                              $"- Width: {auction.Item.Width}\n" +
                                              $"- Ending Date: {auction.AuctionEnd}\n" +
                                              $"- Auction Artist Id: {auction.Item.Artist}\n" +
                                              $"- Auction Medium Id: {auction.Item.Medium}"),
            Message.Create(ChatRoleType.User, "Give me the predict actual price for this auction?")
        };

        var response = await _openAiService.Chat.Get(messages, o => { o.MaxTokens = 1000; });

        if (response.IsSuccess)
        {
            return response.Result?.Choices[0].Message.Content;
        }

        return response.ErrorMessage;
    }
}