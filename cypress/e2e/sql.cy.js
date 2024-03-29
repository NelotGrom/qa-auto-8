describe("connect to test db", () => {
  it("can connect to the db", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE Students (StudentId int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    );
  });

  it("input entries", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentId, FirstName, StudentGroup, City) VALUES
            (1, "Ivan", "01-1991", "Minsk"),
            (2, "Van", "02-1991", "Minsk"),
            (3, "Anna", "03-1991", "Milan"),
            (4, "Maria", "03-1991", "Minsk"),
            (5, "Jozef", "01-1991", "Minsk");`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.eq(5);
    });
  });

  it("add two more students to group", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (FirstName, City, StudentGroup) 
         VALUES 
            ('Kek', 'Gdynia', '02-1991'),
            ('Mateush', 'Hel', '02-1991')`
    );
    cy.task("queryDb", `SELECT * FROM Students WHERE StudentGroup="02-1991"`)
      .then((result) => cy.log(JSON.stringify(result)));
  });

  it("user can select data", () => {
    cy.task(
      "queryDb",
      `SELECT FirstName FROM Students WHERE City="Milan"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result[0].FirstName).to.eq("Anna");
    });
  });

  it("can delete the table", () => {
    cy.task("queryDb", "DROP TABLE Students");
  });
});
