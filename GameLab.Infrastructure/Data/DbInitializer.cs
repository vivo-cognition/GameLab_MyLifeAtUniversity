using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameLab.Core.Entities;

namespace GameLab.Infrastructure.Data;

public static class DbInitializer
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        if (!context.Subjects.Any())
        {
            var defaultSubjects = new List<Subject>
            {
                new Subject("Конструирование программного обеспечения"),
                new Subject("Операционные системы"),
                new Subject("История мировой культуры"),
                new Subject("Численные методы"),
                new Subject("Алгоритмы и структуры данных"),
                new Subject("Безопасность жизнедеятельности человека"),
                new Subject("Философия"),
                new Subject("Физическая культура")
            };

            await context.Subjects.AddRangeAsync(defaultSubjects);
            await context.SaveChangesAsync();
        }

        if (!context.AttestationQuestions.Any())
        {
            var kpo = context.Subjects.FirstOrDefault(s => s.Title == "Конструирование программного обеспечения");
            var os = context.Subjects.FirstOrDefault(s => s.Title == "Операционные системы");
            var culture = context.Subjects.FirstOrDefault(s => s.Title == "История мировой культуры");
            var numerics = context.Subjects.FirstOrDefault(s => s.Title == "Численные методы");
            var algorithms = context.Subjects.FirstOrDefault(s => s.Title == "Алгоритмы и структуры данных");
            var bzhd = context.Subjects.FirstOrDefault(s => s.Title == "Безопасность жизнедеятельности человека");
            var philosophy = context.Subjects.FirstOrDefault(s => s.Title == "Философия");
            var sport = context.Subjects.FirstOrDefault(s => s.Title == "Физическая культура");

            var questions = new List<AttestationQuestion>();

            if (kpo != null)
            {
                questions.Add(new AttestationQuestion(
                    kpo.Id,
                    "Какой паттерн проектирования гарантирует, что у класса есть только один экземпляр, и предоставляет к нему глобальную точку доступа?",
                    new List<string> { "Фабричный метод (Factory Method)", "Одиночка (Singleton)", "Наблюдатель (Observer)", "Стратегия (Strategy)" },
                    1
                ));

                questions.Add(new AttestationQuestion(
                    kpo.Id,
                    "Что означает буква 'S' в аббревиатуре принципов SOLID?",
                    new List<string> { "Принцип единственной ответственности (Single Responsibility)", "Принцип разделения интерфейса (Interface Segregation)", "Принцип инверсии зависимостей (Dependency Inversion)", "Принцип открытости/закрытости (Open/Closed)" },
                    0
                ));
            }

            if (os != null)
            {
                questions.Add(new AttestationQuestion(
                    os.Id,
                    "Что такое взаимная блокировка (Deadlock) в операционных системах?",
                    new List<string> { "Ситуация, когда процесс завершается аварийно из-за нехватки памяти", "Состояние, при котором два или более процессов не могут продолжать выполнение, так как каждый ждет ресурс, занятый другим", "Отказ аппаратного обеспечения компьютера", "Плановое завершение работы ядра ОС" },
                    1
                ));

                questions.Add(new AttestationQuestion(
                    os.Id,
                    "Какая подсистема ОС отвечает за перевод виртуальных адресов памяти процессов в физические адреса ОЗУ?",
                    new List<string> { "Диспетчер задач", "Драйвер файловой системы", "Диспетчер памяти (MMU / Paging)", "Сетевой стек" },
                    2
                ));
            }

            if (culture != null)
            {
                questions.Add(new AttestationQuestion(
                    culture.Id,
                    "Какая эпоха в истории культуры характеризуется возрождением интереса к античному наследию, гуманизмом и антропоцентризмом?",
                    new List<string> { "Средневековье", "Просвещение", "Ренессанс (Возрождение)", "Модернизм" },
                    2
                ));

                questions.Add(new AttestationQuestion(
                    culture.Id,
                    "Кто является автором знаменитой фрески 'Тайная вечеря' и картины 'Мона Лиза'?",
                    new List<string> { "Микеланджело Буонарроти", "Рафаэль Санти", "Рембрандт ван Рейн", "Леонардо да Винчи" },
                    3
                ));
            }

            if (numerics != null)
            {
                questions.Add(new AttestationQuestion(
                    numerics.Id,
                    "Для решения какого типа задач применяется метод Ньютона (метод касательных)?",
                    new List<string> { "Для численного нахождения корней нелинейных уравнений", "Для вычисления определенных интегралов", "Для аппроксимации экспериментальных данных сплайнами", "Для генерации случайных чисел" },
                    0
                ));

                questions.Add(new AttestationQuestion(
                    numerics.Id,
                    "Какое из следующих понятий напрямую относится к методам численного интегрирования функций?",
                    new List<string> { "Метод Гаусса-Зейделя", "Формула Симпсона (метод парабол)", "Схема Горнера", "Метод рунге-Кутты" },
                    1
                ));
            }

            if (algorithms != null)
            {
                questions.Add(new AttestationQuestion(
                    algorithms.Id,
                    "Какова средняя временная сложность быстрой сортировки (QuickSort)?",
                    new List<string> { "O(n)", "O(n^2)", "O(n log n)", "O(1)" },
                    2
                ));

                questions.Add(new AttestationQuestion(
                    algorithms.Id,
                    "По какому принципу работает структура данных 'Очередь' (Queue)?",
                    new List<string> { "LIFO (Last In, First Out)", "FIFO (First In, First Out)", "Случайный доступ (Random Access)", "По приоритету ключа" },
                    1
                ));
            }

            // --- Безопасность жизнедеятельности человека ---
            if (bzhd != null)
            {
                questions.Add(new AttestationQuestion(
                    bzhd.Id,
                    "Какое действие является первоочередным при обнаружении возгорания в помещении?",
                    new List<string> { "Открыть все окна для проветривания", "Вызвать пожарную охрану и начать эвакуацию", "Попытаться спасти личные тяжелые вещи", "Спрятаться в закрытом шкафу" },
                    1
                ));

                questions.Add(new AttestationQuestion(
                    bzhd.Id,
                    "Что относится к опасным факторам техногенного характера?",
                    new List<string> { "Землетрясения и наводнения", "Аварии на химических и радиационных объектах", "Эпидемии гриппа", "Солнечное затмение" },
                    1
                ));
            }

            if (philosophy != null)
            {
                questions.Add(new AttestationQuestion(
                    philosophy.Id,
                    "Что является основным вопросом философии согласно классической традиции?",
                    new List<string> { "Отношение мышления к бытию", "Строение атома", "Скорость света", "Развитие капитализма" },
                    0
                ));

                questions.Add(new AttestationQuestion(
                    philosophy.Id,
                    "Кто автор категорического императива?",
                    new List<string> { "Аристотель", "Иммануил Кант", "Фридрих Ницше", "Платон" },
                    1
                ));
            }

            if (sport != null)
            {
                questions.Add(new AttestationQuestion(
                    sport.Id,
                    "Что такое 'гиподинамия' и к каким последствиям она приводит?",
                    new List<string> { "Избыточная мышечная масса, приводящая к росту силы", "Ослабление мышечной деятельности организма в результате малоподвижного образа жизни", "Состояние повышенного артериального давления во время бега", "Максимальная скорость насыщения крови кислородом" },
                    1
                ));

                questions.Add(new AttestationQuestion(
                    sport.Id,
                    "Какая из физических нагрузок относится к преимущественно аэробным (кардио)?",
                    new List<string> { "Длительный бег в умеренном темпе", "Жим штанги лежа на 1 повторение", "Прыжок в высоту с разбега", "Подтягивание на перекладине с максимальным весом" },
                    0
                ));
            }

            if (questions.Any())
            {
                context.AttestationQuestions.AddRange(questions);
                context.SaveChanges();
            }
        }
    }
}
