namespace AuctionService.Entities;

public class Item
{
    public Guid Id { get; set; }
    public string Artist { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Height { get; set; }
    public string Width { get; set; }
    public int Year { get; set; }
    public string Medium { get; set; }
    public string[] ImageUrl { get; set; }
    
    // Navigation properties
    public Auction Auction { get; set; }
    public Guid AuctionId { get; set; }
}