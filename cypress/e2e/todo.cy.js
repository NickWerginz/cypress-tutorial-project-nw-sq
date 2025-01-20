// eslint-disable-next-line no-undef
describe("todo tests", () => {
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    cy.visit("/");
  });

  // eslint-disable-next-line no-undef
  it("should render the todo app", () => {
    // eslint-disable-next-line no-undef
    cy.getDataTest("todo-header").should("exist");
  });

  // eslint-disable-next-line no-undef
  it("should add a todo", () => {
    // eslint-disable-next-line no-undef
    cy.get('[data-set="todo-form"] ').should("exist");
    // eslint-disable-next-line no-undef
    cy.get('[data-set="todo-form"] input[name = "title"]').type(
      "Watch a movie"
    );
    // eslint-disable-next-line no-undef
    cy.get('[data-set = "add-todo-btn"]').should("exist").click();
    // eslint-disable-next-line no-undef
    cy.contains("Watch a movie").should("exist");
  });

  // eslint-disable-next-line no-undef
  it("should mark a todo as completed", () => {
    // eslint-disable-next-line no-undef
    cy.get('[data-set="todo-form"] input[name = "title"]').type(
      "Watch a movie"
    );
    // eslint-disable-next-line no-undef
    cy.get('[data-set = "add-todo-btn"]').should("exist").click();
    // eslint-disable-next-line no-undef
    cy.contains("Watch a movie").should("exist");
    // eslint-disable-next-line no-undef
    cy.get('[data-set="todo-list"] input[type ="checkbox"]')
      .should("exist")
      .should("not.be.checked");
    // you can also use should have class completed to check if the todo is completed
    // eslint-disable-next-line no-undef
    cy.get('[data-set="todo-list"] input[type ="checkbox"]')
      .should("exist")
      .click()
      .should("be.checked");
  });

  // eslint-disable-next-line no-undef
  it("should delete a todo", () => {
    // 1. Ein Todo hinzufügen
    // eslint-disable-next-line no-undef
    cy.get('[data-set="todo-form"] input[name="title"]').type("Watch a movie");
    // eslint-disable-next-line no-undef
    cy.get('[data-set="add-todo-btn"]').click();

    // 2. Sicherstellen, dass das Todo hinzugefügt wurde
    // eslint-disable-next-line no-undef
    cy.contains("Watch a movie").should("exist");

    // 3. Todo löschen
    // eslint-disable-next-line no-undef
    cy.get('[data-set="todo-list"] [data-set="delete-todo-btn"]').click();

    // 4. Sicherstellen, dass das Todo gelöscht wurde
    // eslint-disable-next-line no-undef
    cy.contains("Watch a movie").should("not.exist");
  });
});
