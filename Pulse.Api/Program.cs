using Microsoft.EntityFrameworkCore;
using Pulse.Api.Data;
using Microsoft.AspNetCore.Builder;
using Pulse.Api.Repositories.Interface;
using Pulse.Api.Repositories.Implementation;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.   
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer(); // Required for Swashbuckle
builder.Services.AddSwaggerGen(); 


// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("PulseConnectionString")
    )
);

builder.Services.AddScoped<ICategoryRepository , CategoryRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); 
    app.UseSwaggerUI(); 
}

app.UseCors(options =>
{
    options.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
});
app.MapControllers();

app.Run();