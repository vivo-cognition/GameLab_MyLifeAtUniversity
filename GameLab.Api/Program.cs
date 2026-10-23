using GameLab.Core.Interfaces;
using GameLab.Core.Services;
using GameLab.Infrastructure.Data;
using GameLab.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Извлекаем строку подключения из appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Регистрируем контекст базы данных PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString, b => b.MigrationsAssembly("GameLab.Infrastructure")));

// НАСТРОЙКА CORS: разрешаем фронтенду на порту 5173 слать нам запросы
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Разрешаем принимать свойства в любом регистре (и Name, и name)
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        // Сохраняем camelCase для ответов наружу
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });

builder.Services.AddOpenApi();

// Регистрируем репозитории и сервисы в DI-контейнере
builder.Services.AddScoped<IStudentRepository, EfStudentRepository>();
builder.Services.AddScoped<ISubjectRepository, EfSubjectRepository>();
builder.Services.AddScoped<IGameEngineService, GameEngineService>();
builder.Services.AddScoped<IQuestionRepository, EfQuestionRepository>();

// Регистрируем профили AutoMapper
builder.Services.AddAutoMapper(typeof(GameLab.Api.Mappings.MappingProfile));

var app = builder.Build();

// КОНФИГУРАЦИЯ КОНВЕЙЕРА ОБРАБОТКИ HTTP-ЗАПРОСОВ (MIDDLEWARE)
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();           // Генерирует сырой openapi.json
    app.MapScalarApiReference(); // Рисует красивую документацию Scalar по адресу /scalar
}

// АКТИВИРУЕМ CORS: строго до маппинга контроллеров
app.UseCors("AllowFrontend");

/*
app.UseHttpsRedirection();
*/

// Стандартный шаблонный эндпоинт погоды (можно оставить, он не мешает)
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

// Маппим наши игровые контроллеры
app.MapControllers();

// БЛОК ИНИЦИАЛИЗАЦИИ БАЗЫ ДАННЫХ (СИДИНГ ПРЕДМЕТОВ)
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        await DbInitializer.SeedAsync(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Произошла ошибка при первоначальном заполнении базы данных.");
    }
}

app.Run();

// Запись для прогноза погоды
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
