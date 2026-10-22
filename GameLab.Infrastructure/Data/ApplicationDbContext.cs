using Microsoft.EntityFrameworkCore;
using GameLab.Core.Entities;

namespace GameLab.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<Student> Students => Set<Student>();
    public DbSet<Subject> Subjects => Set<Subject>();
    public DbSet<StudentSubjectPerformance> SubjectPerformances => Set<StudentSubjectPerformance>();
    public DbSet<ScheduleDay> ScheduleDays => Set<ScheduleDay>();
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Specialization).IsRequired().HasMaxLength(150);
            entity.Property(e => e.Balance).HasPrecision(18, 2);
            entity.Property(e => e.MonthlyIncome).HasPrecision(18, 2);

            entity.HasMany(e => e.Subscriptions)
                  .WithOne()
                  .HasForeignKey(p => p.StudentId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasMany(e => e.ActiveSchedule)
                 .WithOne()
                 .HasForeignKey(e => e.StudentId)
                 .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Subject>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(100);
        });

        modelBuilder.Entity<StudentSubjectPerformance>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.HasOne(e => e.Subject)
                  .WithMany()
                  .HasForeignKey(e => e.SubjectId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<ScheduleDay>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.SubjectIds)
                  .HasColumnType("uuid[]");
        });
    }
}
