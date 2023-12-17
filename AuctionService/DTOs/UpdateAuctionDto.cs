namespace AuctionService.DTOs;

public class UpdateAuctionDto
{
    public string? Artist { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public double? Height { get; set; }
    public double? Width { get; set; }
    public string? Medium { get; set; }
    public int? Year { get; set; }
}