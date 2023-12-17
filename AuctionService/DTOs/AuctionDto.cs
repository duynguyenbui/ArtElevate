namespace AuctionService.DTOs;

public class AuctionDto
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime AuctionEnd { get; set; }
    public string Seller { get; set; }
    public string Winner { get; set; }
    public string Artist { get; set; }
    // Artwork information
    public string Name { get; set; }
    public string Description { get; set; }
    public string Height { get; set; }
    public string Width { get; set; }
    public string Medium { get; set; }
    public int Year { get; set; }
    public string[] ImageUrl { get; set; }
    // Auction information
    public string Status { get; set; }
    public int ReservePrice { get; set; }
    public int? SoldAmount { get; set; }
    public int? CurrentHighBid { get; set; }
}