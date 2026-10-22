using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameLab.Core.Entities;

namespace GameLab.Infrastructure.Data;

public static class DbInitializer
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        if (context.Subjects.Any())
        {
            return;
        }

        var defaultSubjects = new List<Subject>
        {
            new Subject("Конструирование программного обеспечения"),
            new Subject("Операционные системы"),
            new Subject("История мировой культуры"),
            new Subject("Численные методы"),
            new Subject("Алгоритмы и структуры данных"),
            new Subject("Безопасность человека и жизнедеятельности"),
            new Subject("Философия"),
            new Subject("Физическая культура")
        };

        await context.Subjects.AddRangeAsync(defaultSubjects);
        await context.SaveChangesAsync();
    }
}
