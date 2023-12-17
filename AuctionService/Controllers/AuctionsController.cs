using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/auctions")]
public class AuctionsController(AuctionDbContext dbContext, IMapper mapper) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions()
    {
        var auctions = await dbContext.Auctions
            .Include(x => x.Item)
            .OrderBy(x => x.Item.Name)
            .ToListAsync();

        return mapper.Map<List<AuctionDto>>(auctions);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
    {
        var auction = await dbContext.Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);
        if (auction is null) return NotFound();
        return mapper.Map<AuctionDto>(auction);
    }

    [HttpPost]
    public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto createAuctionDto)
    {
        var auction = mapper.Map<Auction>(createAuctionDto);
        // TODO: Add current user as seller
        auction.Seller = "test";
        await dbContext.Auctions.AddAsync(auction);
        var result = await dbContext.SaveChangesAsync() > 0;
        return !result
            ? BadRequest("Couldn't create auction")
            : CreatedAtAction(nameof(GetAuctionById),
                new { id = auction.Id }, mapper.Map<AuctionDto>(auction));
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDto updateAuctionDto)
    {
        var auction = await dbContext.Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);
        if (auction == null) return NotFound();
        // TODO: Check seller equal to username
        
        auction.Item.Artist = updateAuctionDto.Artist ?? auction.Item.Artist;
        auction.Item.Name = updateAuctionDto.Name ?? auction.Item.Name;
        auction.Item.Description = updateAuctionDto.Description ?? auction.Item.Description;
        auction.Item.Height = updateAuctionDto.Height ?? auction.Item.Height;
        auction.Item.Width = updateAuctionDto.Width ?? auction.Item.Width;
        auction.Item.Medium = updateAuctionDto.Medium ?? auction.Item.Medium;
        auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;

        var result = await dbContext.SaveChangesAsync() > 0;

        return result ? Ok() : BadRequest("Something went wrong when saving changes in database");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAuction(Guid id)
    {
        var auction = await dbContext.Auctions.FindAsync(id);
        if (auction is null) return NotFound();

        dbContext.Auctions.Remove(auction);
        var result = await dbContext.SaveChangesAsync() > 0;
        return result ? Ok() : BadRequest("Couldn't delete auction");
    }
}