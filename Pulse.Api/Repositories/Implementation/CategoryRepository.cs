using System;
using Pulse.Api.Data;
using Pulse.Api.Models.Domain;
using Pulse.Api.Repositories.Interface;

namespace Pulse.Api.Repositories.Implementation;

public class CategoryRepository : ICategoryRepository
{

    private readonly ApplicationDbContext dbContext;
    public CategoryRepository(ApplicationDbContext dbContext)
    {
        this.dbContext = dbContext;
    }
    public async Task<Category?> CreateAsync(Category category)
    {
        

        await dbContext.Categories.AddAsync(category);
        await dbContext.SaveChangesAsync();
        return category;
    }
}
