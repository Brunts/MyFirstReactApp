using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.AspNetCore.Cors;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:3000")  // React
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();  // Use AddSwaggerGen to register Swagger

var app = builder.Build();

// Ensure CORS is applied before other middleware like routing or authorization
app.UseCors("AllowFrontend");  // CORS should come before routing

// Use HTTPS redirection
app.UseHttpsRedirection();

app.UseAuthorization();  // Authorization is only required if you're using it

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();  // Map controllers to endpoints

app.Run();
