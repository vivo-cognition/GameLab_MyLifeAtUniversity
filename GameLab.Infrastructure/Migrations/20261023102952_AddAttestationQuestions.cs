using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameLab.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddAttestationQuestions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AttestationSubjectId",
                table: "ScheduleDays",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AttestationQuestions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SubjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    Text = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Options = table.Column<List<string>>(type: "text[]", nullable: false),
                    CorrectOptionIndex = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttestationQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttestationQuestions_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AttestationQuestions_SubjectId",
                table: "AttestationQuestions",
                column: "SubjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AttestationQuestions");

            migrationBuilder.DropColumn(
                name: "AttestationSubjectId",
                table: "ScheduleDays");
        }
    }
}
