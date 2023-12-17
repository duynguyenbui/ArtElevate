namespace AuctionService.DTOs;

public class UpdateAuctionDto
{
    public string? Artist { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Height { get; set; }
    public string? Width { get; set; }
    public string? Medium { get; set; }
    public int? Year { get; set; }
}