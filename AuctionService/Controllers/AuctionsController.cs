using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AuctionService.RequestHelpers;
using AuctionService.Services;
using AutoMapper;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/auctions")]
public class AuctionsController(
    AuctionDbContext dbContext,
    IMapper mapper,
    IImageService<ImageUploadResult, DeletionResult> imageService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions()
    {
        var auctions = await dbContext.Auctions
            .Include(x => x.Item)
            .OrderBy(x => x.Item.Name)
            .ToListAsync();

        return Ok(mapper.Map<List<AuctionDto>>(auctions));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
    {
        var auction = await dbContext.Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);
        if (auction is null) return NotFound();
        return Ok(mapper.Map<AuctionDto>(auction));
    }

    [HttpPost]
    public async Task<ActionResult> CreateAuction(CreateAuctionDto createAuctionDto)
    {
        var auction = mapper.Map<Auction>(createAuctionDto);
        List<string> imageUrls = new List<string>();
        foreach (var formFile in createAuctionDto.Files)
        {
            var imageUploadResult = await imageService.AddImageAsync(formFile);
            imageUrls.Add(imageUploadResult.SecureUrl.ToString());
        }

        auction.Item.ImageUrl = imageUrls;
        await dbContext.Auctions.AddAsync(auction);
        await dbContext.SaveChangesAsync();
        return Ok(mapper.Map<AuctionDto>(auction));
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDto updateAuctionDto)
    {
        var auction = await dbContext.Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);
        
        // Map if exist attributes update
        auction.Item.Artist = updateAuctionDto.Artist ?? auction.Item.Artist;
        auction.Item.Name = updateAuctionDto.Name ?? auction.Item.Name;
        auction.Item.Description = updateAuctionDto.Description ?? auction.Item.Description;
        auction.Item.Width = updateAuctionDto.Width ?? auction.Item.Width;
        auction.Item.Height = updateAuctionDto.Height ?? auction.Item.Height;
        auction.Item.Medium = updateAuctionDto.Medium ?? auction.Item.Medium;
        auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;
        
        var result  = await dbContext.SaveChangesAsync() > 0;
        return result ? Ok() : BadRequest("Couldn't save changes update");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAuction(Guid id)
    {
        var auction = await dbContext.Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (auction is null) return NotFound();
        foreach (var imageUrl in auction.Item?.ImageUrl)
        {
            await imageService.DeleteImageAsync(Utils.GetPublicIdFromCloudinaryUrl(imageUrl));
        }

        dbContext.Auctions.Remove(auction);
        var result = await dbContext.SaveChangesAsync() > 0;
        return result ? Ok() : BadRequest("Couldn't delete auction");
    }
}