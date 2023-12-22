using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AuctionService.RequestHelpers;
using AuctionService.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using CloudinaryDotNet.Actions;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/auctions")]
public class AuctionsController
(
    AuctionDbContext dbContext,
    IMapper mapper,
    IImageService<ImageUploadResult, DeletionResult> imageService,
    IPublishEndpoint publishEndpoint
) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions(string? date)
    {
        var query = dbContext.Auctions
            .OrderBy(x => x.Item.Artist).AsQueryable();
        if (!string.IsNullOrEmpty(date))
            query = query.Where(x => x.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
        return await query.ProjectTo<AuctionDto>(mapper.ConfigurationProvider).ToListAsync();
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

    [Authorize]
    [HttpPost]
    public async Task<ActionResult> CreateAuction([FromForm] CreateAuctionDto createAuctionDto)
    {
        var auction = mapper.Map<Auction>(createAuctionDto);
        auction.Seller = User.Identity?.Name;

        List<string> imageUrls = new List<string>();
        if (createAuctionDto.Files is not null)
        {
            foreach (var formFile in createAuctionDto.Files)
            {
                var imageUploadResult = await imageService.AddImageAsync(formFile);
                imageUrls.Add(imageUploadResult.SecureUrl.ToString());
            }
        }
        auction.Item.ImageUrl = imageUrls;
        await dbContext.Auctions.AddAsync(auction);

        var newAuction = mapper.Map<AuctionDto>(auction);

        // RabbitMQ
        await publishEndpoint.Publish(mapper.Map<AuctionCreated>(newAuction));

        var result = await dbContext.SaveChangesAsync() > 0;

        if (!result) return BadRequest();
        
        return CreatedAtAction(nameof(GetAuctionById), new { auction.Id }, newAuction);
    }

    [HttpPatch("{id}")]
    [Authorize]
    public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDto updateAuctionDto)
    {
        var auction = await dbContext.Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (auction is null) return NotFound();

        if (!auction.Seller.Equals(User.Identity?.Name))
            return Forbid();

        // Map if exist attributes update
        auction.Item.Artist = updateAuctionDto.Artist ?? auction.Item.Artist;
        auction.Item.Name = updateAuctionDto.Name ?? auction.Item.Name;
        auction.Item.Description = updateAuctionDto.Description ?? auction.Item.Description;
        auction.Item.Width = updateAuctionDto.Width ?? auction.Item.Width;
        auction.Item.Height = updateAuctionDto.Height ?? auction.Item.Height;
        auction.Item.Medium = updateAuctionDto.Medium ?? auction.Item.Medium;
        auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;
        auction.ReservePrice = updateAuctionDto.ReservePrice ?? auction.ReservePrice;
        auction.AuctionEnd = updateAuctionDto.AuctionEnd ?? auction.AuctionEnd;
        // RabbitMQ
        await publishEndpoint.Publish(mapper.Map<AuctionUpdated>(auction));

        var result = await dbContext.SaveChangesAsync() > 0;
        return result ? Ok() : BadRequest("Couldn't save changes update");
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult> DeleteAuction(Guid id)
    {
        var auction = await dbContext.Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);
        
        if (auction is null) return NotFound();

        if (!auction.Seller.Equals(User.Identity.Name)) return Forbid();
        foreach (var imageUrl in auction.Item?.ImageUrl)
        {
            await imageService.DeleteImageAsync(Utils.GetPublicIdFromCloudinaryUrl(imageUrl));
        }

        dbContext.Auctions.Remove(auction);

        await publishEndpoint.Publish<AuctionDeleted>(new { Id = auction.Id.ToString() });

        var result = await dbContext.SaveChangesAsync() > 0;
        return result ? Ok() : BadRequest("Couldn't delete auction");
    }
}