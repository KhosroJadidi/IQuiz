using Microsoft.EntityFrameworkCore.Migrations;

namespace IQuiz.Migrations
{
    public partial class _2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_QuestionAndAnswers",
                table: "QuestionAndAnswers");

            migrationBuilder.RenameTable(
                name: "QuestionAndAnswers",
                newName: "QuestionsAndAnswers");

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuestionsAndAnswers",
                table: "QuestionsAndAnswers",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_QuestionsAndAnswers",
                table: "QuestionsAndAnswers");

            migrationBuilder.RenameTable(
                name: "QuestionsAndAnswers",
                newName: "QuestionAndAnswers");

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuestionAndAnswers",
                table: "QuestionAndAnswers",
                column: "Id");
        }
    }
}
