describe("General app tests", () => {
  it("Downloads the comma-separated (CSV) file", () => {
    cy.intercept("/export", (request) => {
      request.reply({
        headers: { "Content-Disposition": "attachment; filename=data_export.csv" },
        fixture: "data_export.csv",
      });
    });

    cy.visit("/");
    cy.get('a[href*="/export"]').click();
    cy.readFile("cypress\\Downloads\\data_export.csv", "utf8")
      .should("exist")
      .then((content) => {
        content.should("have.text", "Angelo Kägi");
      });
  });
});