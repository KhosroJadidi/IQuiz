using Microsoft.EntityFrameworkCore.Migrations;

namespace IQuiz.Migrations
{
    public partial class _1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "QuestionsAndAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Question = table.Column<string>(nullable: false),
                    Answer_1 = table.Column<string>(nullable: false),
                    Answer_2 = table.Column<string>(nullable: false),
                    Answer_3 = table.Column<string>(nullable: false),
                    Answer_4 = table.Column<string>(nullable: false),
                    CorrectAnswer = table.Column<string>(nullable: false),
                    Points = table.Column<int>(nullable: false),
                    ImageUrl = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionsAndAnswers", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuestionsAndAnswers");
        }
    }
}
