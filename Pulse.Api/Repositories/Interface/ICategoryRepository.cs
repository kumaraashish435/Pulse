using System;
using Pulse.Api.Models.Domain;

namespace Pulse.Api.Repositories.Interface;

public interface ICategoryRepository
{
    Task<Category?> CreateAsync(Category category);
    Task<IEnumerable<Category>> GetAllAsync();
}
