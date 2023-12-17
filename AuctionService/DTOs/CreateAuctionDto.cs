using System.ComponentModel.DataAnnotations;

namespace AuctionService.DTOs;

public class CreateAuctionDto
{
    [Required]
    public string Artist { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public double Height { get; set; }
    [Required]
    public double Width { get; set; }
    [Required]
    public string Medium { get; set; }
    [Required]
    public int Year { get; set; }
    [Required]
    public string[] ImageUrl { get; set; }
    [Required]
    public int ReservePrice { get; set; }
    [Required]
    public DateTime AuctionEnd { get; set; }
}